// src/components/Avatar3D.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';

export default function Avatar3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Environment preset="sunset" />

          {/* Modelo 3D */}
          <mesh rotation={[0.3, 0.5, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial color="#1e3a8a" wireframe />
          </mesh>

          <OrbitControls enableZoom={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
