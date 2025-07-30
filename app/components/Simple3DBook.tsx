'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Simple3DBookProps {
  position: [number, number, number];
  color: string;
}

export const Simple3DBook = ({ position, color }: Simple3DBookProps) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[1, 0.1, 0.7]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
