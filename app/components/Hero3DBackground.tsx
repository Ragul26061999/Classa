'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Simple3DBook } from './Simple3DBook';
import { Simple3DPencil } from './Simple3DPencil';

const Hero3DScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const clock = useRef(new THREE.Clock());

  // Generate random positions for floating elements
  const bookPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 5; i++) {
      positions.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        color: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
      });
    }
    return positions;
  }, []);

  const pencilPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 3; i++) {
      positions.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 8,
        ] as [number, number, number],
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = clock.current.getElapsedTime();
    
    // Animate the entire group
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
    }

    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = Math.sin(time * 0.5 + i * 0.1) * 0.5;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Floating Books */}
      {bookPositions.map(({ position, color }, i) => (
        <Simple3DBook key={`book-${i}`} position={position} color={color} />
      ))}
      
      {/* Floating Pencils */}
      {pencilPositions.map(({ position }, i) => (
        <Simple3DPencil key={`pencil-${i}`} position={position} />
      ))}
      
      {/* Subtle Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(100 * 3), 3]}
            onUpdate={(self) => {
              const positions = self.array as Float32Array;
              for (let i = 0; i < positions.length; i += 3) {
                positions[i] = (Math.random() - 0.5) * 20;
                positions[i + 1] = (Math.random() - 0.5) * 10;
                positions[i + 2] = (Math.random() - 0.5) * 20;
              }
              self.needsUpdate = true;
            }}
            count={100}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#4f46e5" transparent opacity={0.6} />
      </points>
    </group>
  );
};

export const Hero3DBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <Hero3DScene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80 dark:from-gray-900/90 dark:via-gray-900/95 dark:to-gray-900/90" />
    </div>
  );
};
