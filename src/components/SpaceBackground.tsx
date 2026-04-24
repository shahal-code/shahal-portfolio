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
        // Cap DPR at 1.2 to save massive GPU power.
        const dpr = Math.min(window.devicePixelRatio, 1.2);

        // --- 1. Basic Setup ---
        const scene = new THREE.Scene();
        const backgroundColor = isDark ? 0x030014 : 0xf1f5f9;
        scene.background = new THREE.Color(backgroundColor);

        // Light mode fog: soft slate-100 color
        scene.fog = new THREE.FogExp2(backgroundColor, isDark ? 0.002 : 0.0025);

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);

        // --- PERFORMANCE OPTIMIZATION: Renderer Flags ---
        const renderer = new THREE.WebGLRenderer({
            alpha: false,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            precision: "mediump"
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
        // Render bloom at Quarter-Resolution.
        const bloomResolution = new THREE.Vector2(width / 4, height / 4);

        const bloomPass = new UnrealBloomPass(
            bloomResolution,
            isDark ? 1.2 : 0.2,
            isDark ? 0.4 : 0.2,
            isDark ? 0.9 : 0.99
        );

        const composer = new EffectComposer(renderer);
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
        const curve = new THREE.CatmullRomCurve3(pathPoints);

        // --- 4. Starfield ---
        // --- PERFORMANCE OPTIMIZATION: Particle Counts ---
        const particlesCount = isMobile ? 400 : 3000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        const colorPalette = isDark
            ? [new THREE.Color(0x8B5CF6), new THREE.Color(0x0ea5e9), new THREE.Color(0xffffff), new THREE.Color(0xec4899)]
            : [new THREE.Color(0x8B5CF6), new THREE.Color(0x6366f1), new THREE.Color(0x4f46e5), new THREE.Color(0xec4899)];

        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 1500;
            positions[i + 1] = (Math.random() - 0.5) * 1500;
            positions[i + 2] = 600 - Math.random() * 2500;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

            if (isDark) {
                colors[i] = color.r * 1.5;
                colors[i + 1] = color.g * 1.5;
                colors[i + 2] = color.b * 1.5;
            } else {
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }

            sizes[i / 3] = isDark ? (Math.random() * 2.5 + 0.5) : (Math.random() * 3.0 + 1.0);
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
            depthWrite: false,
            vertexColors: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // --- 5. Floating Shards ---
        const shards: THREE.Mesh[] = [];
        const shardCount = isMobile ? 0 : 15;

        const shardGeometries = [
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(1, 0),
            new THREE.TetrahedronGeometry(1, 0)
        ];

        const shardMaterial = new THREE.MeshStandardMaterial({
            color: isDark ? 0x8B5CF6 : 0x7c3aed,
            emissive: isDark ? 0x5b21b6 : 0x4f46e5,
            emissiveIntensity: isDark ? 0.6 : 0.2,
            wireframe: true,
            transparent: true,
            opacity: isDark ? 0.6 : 0.4,
            roughness: 0.5,
            metalness: 0.5
        });

        const solidShardMaterial = new THREE.MeshStandardMaterial({
            color: isDark ? 0xa78bfa : 0x818cf8,
            emissive: isDark ? 0x4c1d95 : 0x4338ca,
            emissiveIntensity: isDark ? 0.3 : 0.15,
            transparent: true,
            opacity: 0.8,
            metalness: 0.8,
            roughness: 0.2,
        });

        for (let i = 0; i < shardCount; i++) {
            const isWireframe = Math.random() > 0.5;
            const geo = shardGeometries[Math.floor(Math.random() * shardGeometries.length)];
            const mat = isWireframe ? shardMaterial : solidShardMaterial;

            const mesh = new THREE.Mesh(geo, mat);

            const t = Math.random();
            const pointOnCurve = curve.getPointAt(t);

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

            mesh.userData = {
                rotSpeedX: (Math.random() - 0.5) * 0.02,
                rotSpeedY: (Math.random() - 0.5) * 0.02,
                rotSpeedZ: (Math.random() - 0.5) * 0.02,
            };

            shards.push(mesh);
            scene.add(mesh);
        }

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
            particles.rotation.y = elapsedTime * 0.02;

            shards.forEach(shard => {
                shard.rotation.x += shard.userData.rotSpeedX;
                shard.rotation.y += shard.userData.rotSpeedY;
                shard.rotation.z += shard.userData.rotSpeedZ;
                shard.position.y += Math.sin(elapsedTime * 2 + shard.position.x) * 0.05;
            });

            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const scrollPercent = Math.max(0.001, Math.min(0.999, scrollY / maxScroll));

            const camPos = curve.getPointAt(scrollPercent);
            camera.position.lerp(camPos, 0.1);
            pointLight.position.copy(camera.position);

            const lookAtTarget = curve.getPointAt(Math.min(1.0, scrollPercent + 0.05));

            if (!isMobile) {
                const intensity = 80;
                const targetOffsetX = mouseX * intensity;
                const targetOffsetY = -mouseY * intensity;

                currentLookAtXY.x += (targetOffsetX - currentLookAtXY.x) * 0.05;
                currentLookAtXY.y += (targetOffsetY - currentLookAtXY.y) * 0.05;

                lookAtTarget.x += currentLookAtXY.x;
                lookAtTarget.y += currentLookAtXY.y;
            }

            camera.lookAt(lookAtTarget);
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
            bloomPass.resolution.set(width / 4, height / 4);
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

            // Dispose post-processing
            composer.passes.forEach(pass => {
                if (pass instanceof UnrealBloomPass) {
                    pass.dispose();
                }
            });

            renderer.dispose();
            renderer.forceContextLoss();
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
