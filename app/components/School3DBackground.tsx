'use client';

import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Simple3DBook } from './Simple3DBook';
import { Simple3DPencil } from './Simple3DPencil';

type Position3D = [number, number, number];

interface BookItem {
  type: 'book';
  position: Position3D;
  color: string;
}

interface PencilItem {
  type: 'pencil';
  position: Position3D;
}

type SceneItem = BookItem | PencilItem;

export const School3DBackground = () => {
  const positions = useMemo<SceneItem[]>(() => {
    // Generate random positions for books and pencils
    const items: SceneItem[] = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'] as const;
    
    // Add books
    for (let i = 0; i < 6; i++) {
      const bookItem: BookItem = {
        type: 'book',
        position: [
          Math.random() * 20 - 10,  // x: -10 to 10
          Math.random() * 8 - 4,    // y: -4 to 4
          Math.random() * -10 - 5   // z: -15 to -5
        ] as Position3D,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      items.push(bookItem);
    }
    
    // Add pencils
    for (let i = 0; i < 8; i++) {
      const pencilItem: PencilItem = {
        type: 'pencil',
        position: [
          Math.random() * 20 - 10,
          Math.random() * 8 - 4,
          Math.random() * -10 - 5
        ] as Position3D
      };
      items.push(pencilItem);
    }
    
    return items;
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <group>
          {positions.map((item, index) => {
            if (item.type === 'book') {
              return (
                <Simple3DBook
                  key={`book-${index}`}
                  position={item.position}
                  color={item.color}
                />
              );
            } else if (item.type === 'pencil') {
              return (
                <Simple3DPencil
                  key={`pencil-${index}`}
                  position={item.position}
                />
              );
            }
            return null;
          })}
        </group>
        
        {/* Add some subtle floating elements */}
        <mesh position={[2, 3, -8]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#888" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-3, 2, -6]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#4ECDC4" transparent opacity={0.4} />
        </mesh>
        <mesh position={[1, -2, -7]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#FF6B6B" transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default School3DBackground;
