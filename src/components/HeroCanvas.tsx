import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { heroScrollRef } from "../lib/heroScroll";

const ACCENT = "#d45a28";
const ACCENT_DIM = "#8a3a18";
const STAR_COUNT = 200;

type Vec3 = [number, number, number];

const NODES: { id: string; pos: Vec3; size: number }[] = [
  { id: "hub", pos: [0, 0, 0], size: 0.15 },
  { id: "ingest", pos: [2.4, 0.4, 0.6], size: 0.09 },
  { id: "process", pos: [-2.0, -0.55, 0.5], size: 0.1 },
  { id: "deploy", pos: [0.6, 1.7, -0.4], size: 0.09 },
  { id: "monitor", pos: [-1.0, 1.2, 0.9], size: 0.08 },
  { id: "relay", pos: [1.5, -1.1, -0.7], size: 0.07 },
];

const EDGES: [string, string][] = [
  ["hub", "ingest"],
  ["hub", "process"],
  ["hub", "deploy"],
  ["hub", "relay"],
  ["ingest", "deploy"],
  ["process", "monitor"],
  ["deploy", "monitor"],
  ["relay", "process"],
];

const ORBITS = [
  { radius: 3.2, speed: 0.2, tilt: [0.55, 0.15, 0.08] as Vec3, phase: 0 },
  { radius: 4.0, speed: -0.12, tilt: [1.1, -0.3, 0.2] as Vec3, phase: 1.8 },
  { radius: 4.8, speed: 0.08, tilt: [0.3, 0.5, -0.15] as Vec3, phase: 3.2 },
];

function nodeById(id: string) {
  const node = NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown node: ${id}`);
  return node;
}

function ScrollCamera() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(() => {
    const p = heroScrollRef.current;
    camera.position.x = THREE.MathUtils.lerp(0, 1.2, p);
    camera.position.y = THREE.MathUtils.lerp(0.15, -0.6, p);
    camera.position.z = THREE.MathUtils.lerp(9, 4.5, p);
    camera.lookAt(target);
  });

  return null;
}

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const scrollYaw = useRef(0);
  const scrollPitch = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const p = heroScrollRef.current;
    scrollYaw.current = THREE.MathUtils.lerp(scrollYaw.current, p * 0.6, 0.06);
    scrollPitch.current = THREE.MathUtils.lerp(scrollPitch.current, p * 0.15, 0.06);
    ref.current.rotation.y =
      state.clock.elapsedTime * 0.006 + scrollYaw.current;
    ref.current.rotation.x = scrollPitch.current;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={STAR_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#c8cdd8"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function OrbitRing({
  radius,
  rotation,
  opacity = 0.1,
}: {
  radius: number;
  rotation: Vec3;
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const p = heroScrollRef.current;
    const scale = 1 + p * 0.35;
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.005, 6, 120]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={opacity} />
    </mesh>
  );
}

function OrbitingSatellite({
  radius,
  speed,
  tilt,
  phase,
  size = 0.06,
}: {
  radius: number;
  speed: number;
  tilt: Vec3;
  phase: number;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = useRef(phase);
  const tiltMatrix = useMemo(() => {
    const m = new THREE.Matrix4();
    m.makeRotationFromEuler(new THREE.Euler(tilt[0], tilt[1], tilt[2]));
    return m;
  }, [tilt]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = heroScrollRef.current;
    const r = radius * (1 + p * 0.35);
    angle.current += delta * speed;
    const local = new THREE.Vector3(
      Math.cos(angle.current) * r,
      0,
      Math.sin(angle.current) * r,
    );
    local.applyMatrix4(tiltMatrix);
    ref.current.position.copy(local);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshBasicMaterial color={ACCENT} />
    </mesh>
  );
}

function HubCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const p = heroScrollRef.current;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * (1.6 + p * 2)) * 0.06;
    if (coreRef.current) coreRef.current.scale.setScalar(pulse * (1 + p * 0.2));
    if (glowRef.current) {
      glowRef.current.scale.setScalar(
        (1.8 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15) * (1 + p * 0.5),
      );
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.07 + p * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.07} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
    </group>
  );
}

function NetworkNode({
  position,
  size,
  isHub = false,
}: {
  position: Vec3;
  size: number;
  isHub?: boolean;
}) {
  if (isHub) return <HubCore />;

  return (
    <mesh position={position}>
      <boxGeometry args={[size * 1.4, size * 1.4, size * 1.4]} />
      <meshBasicMaterial color={ACCENT_DIM} wireframe transparent opacity={0.55} />
    </mesh>
  );
}

function DataFlow({
  from,
  to,
  speed,
  offset,
}: {
  from: Vec3;
  to: Vec3;
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const fromVec = useMemo(() => new THREE.Vector3(...from), [from]);
  const toVec = useMemo(() => new THREE.Vector3(...to), [to]);
  const progress = useRef(offset % 1);

  useFrame((_, delta) => {
    if (!ref.current) return;
    progress.current = (progress.current + delta * speed) % 1;
    ref.current.position.lerpVectors(fromVec, toVec, progress.current);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={ACCENT} />
    </mesh>
  );
}

function Pipeline({ from, to }: { from: Vec3; to: Vec3 }) {
  const points = useMemo(
    () => [new THREE.Vector3(...from), new THREE.Vector3(...to)],
    [from, to],
  );

  return (
    <Line
      points={points}
      color={ACCENT}
      transparent
      opacity={0.22}
      lineWidth={1}
    />
  );
}

function AutomationNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = heroScrollRef.current;
    groupRef.current.rotation.y = p * Math.PI * 0.35;
    const scale = 1 + p * 0.55;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      {EDGES.map(([a, b]) => {
        const from = nodeById(a).pos;
        const to = nodeById(b).pos;
        return <Pipeline key={`${a}-${b}`} from={from} to={to} />;
      })}

      {EDGES.map(([a, b], i) => {
        const from = nodeById(a).pos;
        const to = nodeById(b).pos;
        return (
          <DataFlow
            key={`flow-${a}-${b}`}
            from={from}
            to={to}
            speed={0.35 + (i % 3) * 0.08}
            offset={i * 0.37}
          />
        );
      })}

      {NODES.map((node) => (
        <NetworkNode
          key={node.id}
          position={node.pos}
          size={node.size}
          isHub={node.id === "hub"}
        />
      ))}
    </group>
  );
}

function OrbitalSystem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = heroScrollRef.current;
    groupRef.current.rotation.z = p * 0.4;
  });

  return (
    <group ref={groupRef}>
      {ORBITS.map((orbit) => (
        <group key={orbit.radius}>
          <OrbitRing radius={orbit.radius} rotation={orbit.tilt} />
          <OrbitingSatellite
            radius={orbit.radius}
            speed={orbit.speed}
            tilt={orbit.tilt}
            phase={orbit.phase}
          />
        </group>
      ))}
    </group>
  );
}

function SceneRoot() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;
    const p = heroScrollRef.current;
    const scrollRotY = p * Math.PI * 0.55;
    const scrollRotX = p * 0.35;
    const targetY = scrollRotY + mouse.current.x * 0.12;
    const targetX = scrollRotX + mouse.current.y * 0.08;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.05,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.05,
    );
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      0.8 + p * 2.2,
      0.06,
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -p * 0.4,
      0.06,
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        mouse.current.x = (e.pointer.x - 0.5) * 2;
        mouse.current.y = (e.pointer.y - 0.5) * 2;
      }}
    >
      <StarField />
      <OrbitalSystem />
      <AutomationNetwork />
    </group>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 9], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ScrollCamera />
      <SceneRoot />
    </Canvas>
  );
}
