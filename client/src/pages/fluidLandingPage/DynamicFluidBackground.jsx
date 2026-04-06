import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// This is the GLSL code (Shader Language)
const WaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color("#020024") }, // Deep Blue
    uColorEnd: { value: new THREE.Color("#ff0080") },   // Hot Pink
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;

    // Standard Noise function to create the "Liquid" look
    float noise(vec2 p) {
      return sin(p.x * 10.0 + uTime) * cos(p.y * 10.0 + uTime) * 0.5;
    }

    void main() {
      float n = noise(vUv * 1.5); 
      vec3 finalColor = mix(uColorStart, uColorEnd, vUv.y + n);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

const Scene = () => {
  const meshRef = useRef();

  // useFrame runs 60 times per second to update the 'uTime' variable
  useFrame(({ clock }) => {
    meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5]} />
      <shaderMaterial attach="material" args={[WaveShaderMaterial]} />
    </mesh>
  );
};

export default function DynamicBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  );
}