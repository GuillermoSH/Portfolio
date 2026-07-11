import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { heroScrollRef } from "../lib/heroScroll";

const ACCENT = "#d45a28";
const STAR_COUNT = 200;

/** Saturated planet tones — visible on dark canvas and light canvas, not ink-white */
const PLANET_COLORS = [
  "#2d9a88", // teal (DSP)
  "#c05830", // rust
  "#3a6888", // ocean
  "#9a6838", // ochre
  "#6a4840", // umber
  "#4a8070", // sage teal
] as const;

/** Cosine ease: slow near nodes (t=0 and t=1) */
function travelEase(t: number) {
  return 0.5 - 0.5 * Math.cos(t * Math.PI);
}

type Vec3 = [number, number, number];

const NODES: { id: string; pos: Vec3; size: number; colorIndex: number }[] = [
  { id: "hub", pos: [0, 0, 0], size: 0.15, colorIndex: 0 },
  { id: "ingest", pos: [2.4, 0.4, 0.6], size: 0.1, colorIndex: 4 },
  { id: "process", pos: [-2.0, -0.55, 0.5], size: 0.11, colorIndex: 1 },
  { id: "deploy", pos: [0.6, 1.7, -0.4], size: 0.095, colorIndex: 3 },
  { id: "monitor", pos: [-1.0, 1.2, 0.9], size: 0.085, colorIndex: 2 },
  { id: "relay", pos: [1.5, -1.1, -0.7], size: 0.08, colorIndex: 5 },
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
  { radius: 3.2, speed: 0.2, tilt: [0.55, 0.15, 0.08] as Vec3, phase: 0, colorIndex: 2 },
  { radius: 4.0, speed: -0.12, tilt: [1.1, -0.3, 0.2] as Vec3, phase: 1.8, colorIndex: 0 },
  { radius: 4.8, speed: 0.08, tilt: [0.3, 0.5, -0.15] as Vec3, phase: 3.2, colorIndex: 3 },
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
    ref.current.scale.setScalar(1 + p * 0.35);
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.005, 6, 120]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={opacity} />
    </mesh>
  );
}

function Planet({
  size,
  colorIndex,
  withRing = false,
}: {
  size: number;
  colorIndex: number;
  withRing?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const color = PLANET_COLORS[colorIndex % PLANET_COLORS.length];

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[size, 20, 20]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[size, 14, 14]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
      {withRing ? (
        <group rotation={[1.12, 0.4, 0.25]}>
          <mesh>
            <torusGeometry args={[size * 1.65, size * 0.075, 8, 56]} />
            <meshBasicMaterial color="#4ec4b0" transparent opacity={0.7} />
          </mesh>
          <mesh scale={[1.06, 1.06, 1]}>
            <torusGeometry args={[size * 1.65, size * 0.028, 6, 56]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0.55} />
          </mesh>
        </group>
      ) : null}
    </group>
  );
}

function OrbitingSatellite({
  radius,
  speed,
  tilt,
  phase,
  colorIndex,
}: {
  radius: number;
  speed: number;
  tilt: Vec3;
  phase: number;
  colorIndex: number;
}) {
  const ref = useRef<THREE.Group>(null);
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
    <group ref={ref}>
      <Planet size={0.05} colorIndex={colorIndex} />
    </group>
  );
}

function DysonHub() {
  const shellRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const p = heroScrollRef.current;
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * (1.6 + p * 2)) * 0.05;

    if (coreRef.current) coreRef.current.scale.setScalar(pulse * (1 + p * 0.15));
    if (glowRef.current) {
      glowRef.current.scale.setScalar(
        (2.2 + Math.sin(t * 1.2) * 0.12) * (1 + p * 0.45),
      );
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + p * 0.1;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = t * 0.06;
      shellRef.current.rotation.x = Math.sin(t * 0.04) * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.06} />
      </mesh>

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshBasicMaterial color="#fff4e8" />
      </mesh>
      <mesh scale={0.92}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      <group ref={shellRef}>
        <mesh>
          <icosahedronGeometry args={[0.27, 2]} />
          <meshBasicMaterial
            color={ACCENT}
            wireframe
            transparent
            opacity={0.38}
          />
        </mesh>
        <mesh rotation={[0.45, 0.8, 0.15]}>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshBasicMaterial
            color="#c5ccd8"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
        <mesh rotation={[1.05, 0.2, 0.5]}>
          <icosahedronGeometry args={[0.33, 1]} />
          <meshBasicMaterial
            color="#3a8090"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>

        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            rotation={[
              Math.PI / 2 + i * 0.35,
              i * 1.1,
              i * 0.25,
            ]}
          >
            <torusGeometry args={[0.28 + i * 0.02, 0.004, 4, 64]} />
            <meshBasicMaterial
              color={i === 0 ? ACCENT : "#b8c0cc"}
              transparent
              opacity={0.28 - i * 0.06}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function NetworkNode({
  position,
  size,
  colorIndex,
  isHub = false,
}: {
  position: Vec3;
  size: number;
  colorIndex: number;
  isHub?: boolean;
}) {
  if (isHub) return <DysonHub />;

  return (
    <group position={position}>
      <Planet
        size={size}
        colorIndex={colorIndex}
        withRing={colorIndex === 4}
      />
    </group>
  );
}

function LogisticsShip({
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
  const groupRef = useRef<THREE.Group>(null);
  const fromVec = useMemo(() => new THREE.Vector3(...from), [from]);
  const toVec = useMemo(() => new THREE.Vector3(...to), [to]);
  const progress = useRef(offset % 2);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const posAhead = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const forward = useMemo(() => new THREE.Vector3(0, 0, 1), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    progress.current = (progress.current + delta * speed) % 2;
    const linearT =
      progress.current <= 1 ? progress.current : 2 - progress.current;
    const eased = travelEase(linearT);
    const linearAhead =
      progress.current <= 1
        ? Math.min(linearT + 0.03, 1)
        : Math.max(linearT - 0.03, 0);
    const easedAhead = travelEase(linearAhead);

    pos.lerpVectors(fromVec, toVec, eased);
    posAhead.lerpVectors(fromVec, toVec, easedAhead);
    groupRef.current.position.copy(pos);

    direction.subVectors(posAhead, pos);
    if (direction.lengthSq() > 1e-8) {
      direction.normalize();
      groupRef.current.quaternion.setFromUnitVectors(forward, direction);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.018]}>
        <coneGeometry args={[0.014, 0.05, 4]} />
        <meshBasicMaterial color="#5a9aaa" />
      </mesh>
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[0.034, 0.01, 0.022]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      <mesh position={[0, 0, -0.024]}>
        <boxGeometry args={[0.01, 0.01, 0.014]} />
        <meshBasicMaterial color="#3a6888" />
      </mesh>
    </group>
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
      opacity={0.18}
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
    groupRef.current.scale.setScalar(1 + p * 0.55);
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
          <LogisticsShip
            key={`flow-${a}-${b}`}
            from={from}
            to={to}
            speed={0.32 + (i % 3) * 0.07}
            offset={i * 0.37}
          />
        );
      })}

      {NODES.map((node) => (
        <NetworkNode
          key={node.id}
          position={node.pos}
          size={node.size}
          colorIndex={node.colorIndex}
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
            colorIndex={orbit.colorIndex}
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
