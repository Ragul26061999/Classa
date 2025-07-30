'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Simple3DPencilProps {
  position: [number, number, number];
}

export const Simple3DPencil = ({ position }: Simple3DPencilProps) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.05, 0.1, 4]} />
        <meshStandardMaterial color="#FF6347" />
      </mesh>
    </group>
  );
};
