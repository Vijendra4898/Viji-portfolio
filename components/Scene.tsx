"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = state.clock.elapsedTime * 0.12;
    group.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#4c1d95"
          emissiveIntensity={2.8}
          wireframe
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh scale={0.68}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={3}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      <mesh scale={0.42}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#f5f3ff"
          emissive="#8b5cf6"
          emissiveIntensity={5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 4]} intensity={18} color="#8b5cf6" />
        <pointLight position={[-3, -2, 2]} intensity={12} color="#22d3ee" />
        <Stars radius={35} depth={18} count={1600} factor={2.2} saturation={0} fade speed={0.5} />
        <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.7}>
          <Core />
        </Float>
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} />
      </Canvas>
      <div className="scene-ring ring-one" />
      <div className="scene-ring ring-two" />
    </div>
  );
}
