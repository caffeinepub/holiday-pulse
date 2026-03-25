import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function OceanWaves() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(30, 30, 120, 120);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const waveZ =
        Math.sin(x * 0.5 + t * 1.2) * 0.35 +
        Math.sin(y * 0.4 + t * 0.9) * 0.3 +
        Math.sin((x + y) * 0.3 + t * 0.7) * 0.2 +
        Math.sin(x * 0.8 - t * 1.5) * 0.15;
      positions.setZ(i, waveZ);
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -1, 0]}>
      <primitive object={geometry} />
      <meshStandardMaterial
        color="#1BBAB3"
        wireframe={false}
        side={THREE.DoubleSide}
        roughness={0.1}
        metalness={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function FloatingBubbles() {
  const bubblesRef = useRef<THREE.Group>(null);
  const bubbleData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      x: (Math.random() - 0.5) * 24,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 12 - 2,
      speed: 0.3 + Math.random() * 0.8,
      size: 0.04 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
      key: i,
    }));
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((child, i) => {
        const d = bubbleData[i];
        child.position.y = d.y + Math.sin(t * d.speed + d.phase) * 1.2;
      });
    }
  });

  return (
    <group ref={bubblesRef}>
      {bubbleData.map((b) => (
        <mesh key={b.key} position={[b.x, b.y, b.z]}>
          <sphereGeometry args={[b.size, 8, 8]} />
          <meshStandardMaterial
            color="#CFEFEA"
            transparent
            opacity={0.6}
            roughness={0}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene({ onExploreClick }: { onExploreClick: () => void }) {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 3, 10], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
          style={{
            background:
              "linear-gradient(to bottom, #0A3D62 0%, #1B7A8C 40%, #2FA7A0 70%, #CFEFEA 100%)",
          }}
          onCreated={({ scene }) => {
            scene.fog = new THREE.Fog("#1B7A8C", 15, 40);
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.2}
            color="#FFFFFF"
          />
          <pointLight position={[-5, 5, 0]} intensity={0.8} color="#A8E0D9" />
          <Stars
            radius={100}
            depth={50}
            count={800}
            factor={3}
            fade
            speed={0.5}
          />
          <OceanWaves />
          <FloatingBubbles />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-6 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-sm font-medium tracking-wide"
        >
          🏝️ Andaman & Nicobar &nbsp;|&nbsp; Lakshadweep &nbsp;|&nbsp; North-East
          India
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg"
        >
          Discover Your
          <br />
          <span className="text-teal-200">Andaman Paradise</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-white/85 max-w-xl mb-8 leading-relaxed"
        >
          Curated island escape packages — breathtaking beaches, coral reefs,
          and tropical adventures crafted by local experts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            type="button"
            onClick={onExploreClick}
            data-ocid="hero.primary_button"
            className="px-8 py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Packages
          </button>
          <a
            href="#contact"
            data-ocid="hero.secondary_button"
            className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full border border-white/40 backdrop-blur-sm transition-all duration-200"
          >
            Contact Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60 text-xs"
        >
          <span>Scroll to explore</span>
          <div className="w-0.5 h-8 bg-white/40 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
