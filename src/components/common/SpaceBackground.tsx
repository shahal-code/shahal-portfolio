import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/useMobile';
import { useLowPerformanceMode } from '@/hooks/usePerformanceMode';

const SpaceBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();
    const isLowPerformance = useLowPerformanceMode();

    const [isDark, setIsDark] = useState(true);

    // --------------------------------------------------
    // THEME DETECTION
    // --------------------------------------------------

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(
                document.documentElement.classList.contains('dark')
            );
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    // --------------------------------------------------
    // THREE.JS BACKGROUND
    // --------------------------------------------------

    useEffect(() => {
        if (isLowPerformance) return;

        const mountElement = mountRef.current;
        if (!mountElement) return;

        let animationFrameId: number | null = null;
        let lastFrameTime = 0;

        let isVisible = true;

        // FPS control
        const TARGET_FPS = isMobile ? 24 : 30;
        const FRAME_INTERVAL = 1000 / TARGET_FPS;

        // Rendering quality
        const pixelRatio = isMobile ? 0.85 : 1;

        // --------------------------------------------------
        // SCENE SETUP
        // --------------------------------------------------

        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();

        scene.background = new THREE.Color(
            isDark ? 0x000000 : 0xf1f5f9
        );

        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );

        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({
            alpha: false,
            antialias: false,
            powerPreference: 'low-power',
            stencil: false,
            depth: false,
        });

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, pixelRatio)
        );

        renderer.setSize(width, height);

        mountElement.appendChild(renderer.domElement);

        // --------------------------------------------------
        // STARFIELD
        // --------------------------------------------------

        const particlesCount = isMobile ? 120 : 450;

        const geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        const colorPalette = isDark
            ? [
                new THREE.Color(0xffffff),
                new THREE.Color(0x0ea5e9),
                new THREE.Color(0xffffff),
            ]
            : [
                new THREE.Color(0x8B5CF6),
                new THREE.Color(0x6366f1),
                new THREE.Color(0x4f46e5),
            ];

        for (let i = 0; i < particlesCount; i++) {
            const index = i * 3;

            positions[index] = (Math.random() - 0.5) * 1200;
            positions[index + 1] = (Math.random() - 0.5) * 1200;
            positions[index + 2] = (Math.random() - 0.5) * 1000;

            const color =
                colorPalette[
                    Math.floor(Math.random() * colorPalette.length)
                ];

            colors[index] = color.r;
            colors[index + 1] = color.g;
            colors[index + 2] = color.b;

            sizes[i] = isDark
                ? Math.random() * 2 + 0.5
                : Math.random() * 2.5 + 1;
        }

        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        );

        geometry.setAttribute(
            'color',
            new THREE.BufferAttribute(colors, 3)
        );

        geometry.setAttribute(
            'size',
            new THREE.BufferAttribute(sizes, 1)
        );

        const material = new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                varying vec3 vColor;

                void main() {
                    vColor = color;

                    vec4 mvPosition =
                        modelViewMatrix * vec4(position, 1.0);

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
            vertexColors: true,
        });

        const particles = new THREE.Points(geometry, material);

        scene.add(particles);

        // --------------------------------------------------
        // ANIMATION
        // --------------------------------------------------

        const startTime = performance.now();

        const animate = (time: number) => {
            if (!isVisible) return;

            animationFrameId = requestAnimationFrame(animate);

            // Limit rendering FPS
            if (time - lastFrameTime < FRAME_INTERVAL) return;

            lastFrameTime = time;

            const elapsedTime = (time - startTime) / 1000;

            particles.rotation.y = elapsedTime * 0.04;

            particles.rotation.x =
                Math.sin(elapsedTime * 0.15) * 0.08;

            renderer.render(scene, camera);
        };

        // --------------------------------------------------
        // PAUSE / RESUME
        // --------------------------------------------------

        const syncAnimation = () => {
            const shouldPause =
                document.hidden ||
                document.documentElement.classList.contains(
                    'is-transitioning-theme'
                );

            if (shouldPause && animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }

            if (!shouldPause && animationFrameId === null) {
                lastFrameTime = 0;
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        // --------------------------------------------------
        // VISIBILITY OBSERVER
        // --------------------------------------------------

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                syncAnimation();
            }
        );

        intersectionObserver.observe(mountElement);

        // --------------------------------------------------
        // THEME TRANSITION OBSERVER
        // --------------------------------------------------

        const transitionObserver = new MutationObserver(() => {
            syncAnimation();
        });

        transitionObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        document.addEventListener(
            'visibilitychange',
            syncAnimation
        );

        // --------------------------------------------------
        // RESIZE
        // --------------------------------------------------

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Start animation
        syncAnimation();

        // --------------------------------------------------
        // CLEANUP
        // --------------------------------------------------

        return () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }

            window.removeEventListener('resize', handleResize);

            document.removeEventListener(
                'visibilitychange',
                syncAnimation
            );

            intersectionObserver.disconnect();
            transitionObserver.disconnect();

            scene.remove(particles);

            geometry.dispose();
            material.dispose();

            renderer.dispose();
            renderer.forceContextLoss();

            if (renderer.domElement.parentElement === mountElement) {
                mountElement.removeChild(renderer.domElement);
            }
        };

    }, [isMobile, isDark, isLowPerformance]);

    // --------------------------------------------------
    // LOW PERFORMANCE FALLBACK
    // --------------------------------------------------

    if (isLowPerformance) {
        return (
            <div
                className="fixed inset-0 z-[-1] pointer-events-none bg-black"
                style={{ contain: 'strict' }}
            />
        );
    }

    return (
        <div
            ref={mountRef}
            className={`fixed inset-0 z-[-1] pointer-events-none ${
                isDark ? 'bg-black' : 'bg-slate-50'
            }`}
            style={{
                contain: 'strict',
                transform: 'translateZ(0)',
            }}
        />
    );
};

export default SpaceBackground;