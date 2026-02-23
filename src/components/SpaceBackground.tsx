import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { useIsMobile } from '@/hooks/use-mobile';

const SpaceBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const checkTheme = () => document.documentElement.classList.contains('dark');
        setIsDark(checkTheme());

        const observer = new MutationObserver(() => {
            setIsDark(checkTheme());
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- PERFORMANCE OPTIMIZATION: Dimensions & DPR ---
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Cap DPR at 1.5. Screens higher than this (like Mac Retina at 2.0) waste immense GPU power
        // for post-processing with zero visual benefit.
        const dpr = Math.min(window.devicePixelRatio, 1.5);

        // --- 1. Basic Setup ---
        const scene = new THREE.Scene();
        const backgroundColor = isDark ? 0x030014 : 0xf1f5f9;
        scene.background = new THREE.Color(backgroundColor);

        // Light mode fog: soft slate-100 color
        scene.fog = new THREE.FogExp2(backgroundColor, isDark ? 0.002 : 0.0025);

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);

        // --- PERFORMANCE OPTIMIZATION: Renderer Flags ---
        const renderer = new THREE.WebGLRenderer({
            alpha: false, // Setting background explicitly in scene, no need for alpha
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(dpr);
        renderer.setClearColor(backgroundColor);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = isDark ? 1.2 : 1.0;
        mountRef.current.appendChild(renderer.domElement);

        // --- 2. Post-Processing (Bloom) ---
        const renderScene = new RenderPass(scene, camera);

        // --- PERFORMANCE OPTIMIZATION: Bloom Resolution ---
        // Render bloom at Half-Resolution. Bloom is inherently blurry, so scaling it up 
        // later is virtually indistinguishable but saves 4x pixel processing.
        const bloomResolution = new THREE.Vector2(width / 2, height / 2);

        const bloomPass = new UnrealBloomPass(
            bloomResolution,
            isDark ? 1.5 : 0.25, // Reduce bloom strength drastically in light mode
            isDark ? 0.4 : 0.2, // Tighter radius in light mode
            isDark ? 0.85 : 0.98 // Higher threshold in light mode to only bloom brightest spots
        );

        const composer = new EffectComposer(renderer);
        // Force composer to render at screen size, but internal passes use lower res
        composer.setSize(width, height);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // --- 3. Camera Path (CatmullRomCurve3) ---
        const pathPoints = [
            new THREE.Vector3(0, 0, 400),
            new THREE.Vector3(150, 50, 100),
            new THREE.Vector3(-100, -80, -200),
            new THREE.Vector3(80, 120, -500),
            new THREE.Vector3(-50, -50, -800),
            new THREE.Vector3(0, 0, -1100)
        ];
        // Mirror path for light mode for slight variation, or keep same
        const curve = new THREE.CatmullRomCurve3(pathPoints);

        // --- 4. Starfield ---
        // --- PERFORMANCE OPTIMIZATION: Particle Counts ---
        // Reduced from 8000/3000 to 5000/2000. Visual density is maintained by slightly larger sizes.
        const particlesCount = isMobile ? 2000 : 5000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        const colorPalette = isDark
            ? [new THREE.Color(0x8B5CF6), new THREE.Color(0x0ea5e9), new THREE.Color(0xffffff), new THREE.Color(0xec4899)] // Purple, Blue, White, Pink
            : [new THREE.Color(0x8B5CF6), new THREE.Color(0x6366f1), new THREE.Color(0x4f46e5), new THREE.Color(0xec4899)]; // Deeper shades for light mode visibility

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Spread particles across the general path volume
            positions[i] = (Math.random() - 0.5) * 1500;
            positions[i + 1] = (Math.random() - 0.5) * 1500;
            positions[i + 2] = 600 - Math.random() * 2500; // From +600 to -1900

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

            if (isDark) {
                // Intensify colors slightly for bloom
                colors[i] = color.r * 1.5;
                colors[i + 1] = color.g * 1.5;
                colors[i + 2] = color.b * 1.5;
            } else {
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }

            sizes[i / 3] = isDark ? (Math.random() * 2.5 + 0.5) : (Math.random() * 3.0 + 1.0); // Slightly larger in light mode
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                opacityBoost: { value: isDark ? 0.9 : 0.6 }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                uniform float opacityBoost;
                void main() {
                    vec2 xy = gl_PointCoord.xy - vec2(0.5);
                    float ll = length(xy);
                    if (ll > 0.5) discard;
                    float alpha = (0.5 - ll) * 2.0;
                    alpha = pow(alpha, 1.5);
                    gl_FragColor = vec4(vColor, alpha * opacityBoost);
                }
            `,
            transparent: true,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
            depthWrite: false, // critical for performance
            vertexColors: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // --- 5. Floating Shards (Igloo.inc style tech/crystal objects) ---
        const shards: THREE.Mesh[] = [];
        // --- PERFORMANCE OPTIMIZATION: Shard Counts ---
        // Reduced from 40/15 to 25/10.
        const shardCount = isMobile ? 10 : 25;

        const shardGeometries = [
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(1, 0),
            new THREE.TetrahedronGeometry(1, 0)
        ];

        const shardMaterial = new THREE.MeshStandardMaterial({
            color: isDark ? 0x8B5CF6 : 0x7c3aed, // Violet
            emissive: isDark ? 0x5b21b6 : 0x4f46e5, // Deeper violet emission
            emissiveIntensity: isDark ? 0.6 : 0.2, // Lower intensity in light mode
            wireframe: true,
            transparent: true,
            opacity: isDark ? 0.6 : 0.4, // Less opaque in light mode
            roughness: 0.2,
            metalness: 0.8
        });

        const solidShardMaterial = new THREE.MeshPhysicalMaterial({
            color: isDark ? 0xa78bfa : 0x818cf8, // Lighter violet in dark, base violet in light
            emissive: isDark ? 0x4c1d95 : 0x4338ca, // Deepest violet emission
            emissiveIntensity: isDark ? 0.3 : 0.15,
            transmission: 0.95,
            opacity: 1,
            metalness: isDark ? 0.1 : 0.3,
            roughness: 0.05,
            ior: 1.5,
            thickness: 5.0,
        });

        for (let i = 0; i < shardCount; i++) {
            const isWireframe = Math.random() > 0.5;
            const geo = shardGeometries[Math.floor(Math.random() * shardGeometries.length)];
            const mat = isWireframe ? shardMaterial : solidShardMaterial;

            const mesh = new THREE.Mesh(geo, mat);

            // Distribute along the curve path
            const t = Math.random();
            const pointOnCurve = curve.getPointAt(t);

            // Offset from the exact path so we don't crash into them
            const offsetDist = 30 + Math.random() * 80;
            const theta = Math.random() * Math.PI * 2;

            mesh.position.set(
                pointOnCurve.x + Math.cos(theta) * offsetDist,
                pointOnCurve.y + Math.sin(theta) * offsetDist,
                pointOnCurve.z + (Math.random() - 0.5) * 100
            );

            const scale = 5 + Math.random() * 15;
            mesh.scale.set(scale, scale, scale);

            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Store random rotation speed in userData
            mesh.userData = {
                rotSpeedX: (Math.random() - 0.5) * 0.02,
                rotSpeedY: (Math.random() - 0.5) * 0.02,
                rotSpeedZ: (Math.random() - 0.5) * 0.02,
            };

            shards.push(mesh);
            scene.add(mesh);
        }

        // Add some lights for the solid materials
        const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.5 : 0.8);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(isDark ? 0xff00ff : 0x8b5cf6, isDark ? 2 : 1.5, 300);
        scene.add(pointLight);

        // --- 6. Interaction & Render Loop ---
        let scrollY = 0;
        let mouseX = 0;
        let mouseY = 0;
        let currentLookAtXY = new THREE.Vector2(0, 0);

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event: MouseEvent) => {
            // Normalized from -1 to 1
            mouseX = (event.clientX - windowHalfX) / windowHalfX;
            mouseY = (event.clientY - windowHalfY) / windowHalfY;
        };

        const onScroll = () => {
            scrollY = window.scrollY;
        };

        if (!isMobile) {
            document.addEventListener('mousemove', onDocumentMouseMove);
        }
        window.addEventListener('scroll', onScroll, { passive: true });

        let animationFrameId: number;
        let clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            material.uniforms.time.value = elapsedTime;

            // Slowly rotate entire particle field for gentle ambient movement
            particles.rotation.y = elapsedTime * 0.02;

            // Animate shards
            shards.forEach(shard => {
                shard.rotation.x += shard.userData.rotSpeedX;
                shard.rotation.y += shard.userData.rotSpeedY;
                shard.rotation.z += shard.userData.rotSpeedZ;

                // Float shards gently up and down
                shard.position.y += Math.sin(elapsedTime * 2 + shard.position.x) * 0.05;
            });

            // --- Scroll 3D Effects ---
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            // Clamp scrollPercent between 0.01 and 0.99 to avoid exact curve boundaries
            const scrollPercent = Math.max(0.001, Math.min(0.999, scrollY / maxScroll));

            // Move camera along curve
            const camPos = curve.getPointAt(scrollPercent);
            camera.position.lerp(camPos, 0.1); // Smooth transition 

            // Move light attached to camera
            pointLight.position.copy(camera.position);

            // Determine where the camera should look (tangent of the curve)
            const lookAtTarget = curve.getPointAt(Math.min(1.0, scrollPercent + 0.05));

            // --- Parallax Mouse Look-At Offsets ---
            if (!isMobile) {
                // target lookAt offsets based on mouse
                const intensity = 80;
                const targetOffsetX = mouseX * intensity;
                const targetOffsetY = -mouseY * intensity;

                // Lerp current look values to target for smooth mouse movement
                currentLookAtXY.x += (targetOffsetX - currentLookAtXY.x) * 0.05;
                currentLookAtXY.y += (targetOffsetY - currentLookAtXY.y) * 0.05;

                lookAtTarget.x += currentLookAtXY.x;
                lookAtTarget.y += currentLookAtXY.y;
            }

            camera.lookAt(lookAtTarget);

            // Use composer instead of renderer for Bloom post-processing
            composer.render();
        };

        animate();

        const handleResize = () => {
            if (!mountRef.current) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            composer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            // Update bloom pass resolution if needed
            bloomPass.resolution.set(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', onScroll);
            if (!isMobile) {
                document.removeEventListener('mousemove', onDocumentMouseMove);
            }
            cancelAnimationFrame(animationFrameId);
            mountRef.current?.removeChild(renderer.domElement);

            geometry.dispose();
            material.dispose();

            shards.forEach(s => {
                s.geometry.dispose();
                if (Array.isArray(s.material)) {
                    s.material.forEach(m => m.dispose());
                } else {
                    s.material.dispose();
                }
            });

            renderer.dispose();
        };
    }, [isMobile, isDark]);

    return (
        <div
            ref={mountRef}
            className={`fixed inset-0 z-[-1] pointer-events-none transition-colors duration-700 ${isDark ? 'bg-[#030014]' : 'bg-slate-50'}`}
        />
    );
};

export default SpaceBackground;
