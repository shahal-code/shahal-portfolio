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

        // --- 1. Basic Setup (Optimized) ---
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Cap DPR at 1.0 for maximum performance
        const dpr = 1.0;

        const scene = new THREE.Scene();
        const backgroundColor = isDark ? 0x000000 : 0xf1f5f9;
        scene.background = new THREE.Color(backgroundColor);

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({
            alpha: false,
            antialias: false, // Turned off for speed
            powerPreference: "high-performance",
            stencil: false,
            depth: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(dpr);
        mountRef.current.appendChild(renderer.domElement);

        // --- 2. Starfield (Optimized Particle Count) ---
        const particlesCount = isMobile ? 300 : 1000; // Significantly reduced
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        const colorPalette = isDark
            ? [new THREE.Color(0xffffff), new THREE.Color(0x0ea5e9), new THREE.Color(0xffffff)]
            : [new THREE.Color(0x8B5CF6), new THREE.Color(0x6366f1), new THREE.Color(0x4f46e5)];

        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 1200;
            positions[i + 1] = (Math.random() - 0.5) * 1200;
            positions[i + 2] = (Math.random() - 0.5) * 1000;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;

            sizes[i / 3] = isDark ? (Math.random() * 2.0 + 0.5) : (Math.random() * 2.5 + 1.0);
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    vec2 xy = gl_PointCoord.xy - vec2(0.5);
                    float ll = length(xy);
                    if (ll > 0.5) discard;
                    float alpha = (0.5 - ll) * 2.0;
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            vertexColors: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // --- 3. Interaction & Animation ---
        let animationFrameId: number;
        let clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            
            // Skip rendering if a theme transition is in progress to maximize smoothness
            if (document.documentElement.classList.contains('is-transitioning-theme')) return;

            const elapsedTime = clock.getElapsedTime();

            material.uniforms.time.value = elapsedTime;
            particles.rotation.y = elapsedTime * 0.05;
            particles.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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
            className={`fixed inset-0 z-[-1] pointer-events-none ${isDark ? 'bg-black' : 'bg-slate-50'}`}
        />
    );
};

export default SpaceBackground;
