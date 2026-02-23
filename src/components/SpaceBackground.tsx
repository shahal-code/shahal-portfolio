import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
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

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(isDark ? 0x000000 : 0xf8fafc, 0.001);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const particlesCount = 8000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        const colorPalette = isDark
            ? [new THREE.Color(0x8B5CF6), new THREE.Color(0x0ea5e9), new THREE.Color(0xffffff)]
            : [new THREE.Color(0x6D28D9), new THREE.Color(0x0284c7), new THREE.Color(0x334155)];

        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2000;
            positions[i + 1] = (Math.random() - 0.5) * 2000;
            positions[i + 2] = (Math.random() - 0.5) * 2000;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;

            // Increase star size slightly
            sizes[i / 3] = Math.random() * 3 + 1.0;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                opacityBoost: { value: isDark ? 0.8 : 1.2 }
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

        let scrollY = 0;
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
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

            targetX = mouseX * 0.1;
            targetY = mouseY * 0.1;

            particles.rotation.y += 0.0005;
            particles.rotation.x += 0.0002;

            // --- Scroll 3D Effects ---
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const scrollPercent = scrollY / maxScroll;

            // Twisting warp effect (particles rotate on Z axis)
            const targetRotationZ = scrollPercent * Math.PI; // 180 degree overall twist
            particles.rotation.z += (targetRotationZ - particles.rotation.z) * 0.05;

            // Fly-through effect (Camera moves forward on Z axis, enabled on mobile too)
            const targetZ = 400 - (scrollPercent * 800); // 800 units deep dive
            camera.position.z += (targetZ - camera.position.z) * 0.05;

            // Parallax on mouse move (desktop only)
            if (!isMobile) {
                camera.position.x += (targetX - camera.position.x) * 0.02;
                camera.position.y += (-targetY - camera.position.y) * 0.02;
            }

            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!mountRef.current) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
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
