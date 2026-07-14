import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { createContext, useContext, useMemo, useRef } from "react";
import * as THREE from "three";
import { heroScrollRef } from "../lib/heroScroll";

const ACCENT = "#d45a28";
const SECONDARY = "#358f84";
const STAR_COUNT = 200;

const PLANET_COLORS = [
  "#358f84", // teal
  "#5a7594", // slate
  "#9570a0", // malva
  "#9a6838", // ochre
  "#c05830", // rust
  "#6a5848", // umber
] as const;

function travelEase(t: number) {
  return 0.5 - 0.5 * Math.cos(t * Math.PI);
}

type Vec3 = [number, number, number];

type PlanetConfig = {
  id: string;
  radius: number;
  speed: number;
  tilt: Vec3;
  phase: number;
  size: number;
  colorIndex: number;
  withRing?: boolean;
};

const PLANETS: PlanetConfig[] = [
  {
    id: "ingest",
    radius: 2.15,
    speed: 0.17,
    tilt: [0.58, 0.2, 0.08],
    phase: 0,
    size: 0.1,
    colorIndex: 4,
    withRing: true,
  },
  {
    id: "process",
    radius: 2.55,
    speed: -0.14,
    tilt: [1.08, -0.32, 0.18],
    phase: 1.25,
    size: 0.11,
    colorIndex: 1,
  },
  {
    id: "deploy",
    radius: 2.95,
    speed: 0.11,
    tilt: [0.35, 0.48, -0.12],
    phase: 2.6,
    size: 0.095,
    colorIndex: 3,
  },
  {
    id: "monitor",
    radius: 3.35,
    speed: -0.09,
    tilt: [0.82, -0.15, 0.42],
    phase: 4.1,
    size: 0.085,
    colorIndex: 2,
  },
  {
    id: "relay",
    radius: 3.75,
    speed: 0.08,
    tilt: [1.35, 0.28, -0.22],
    phase: 5.4,
    size: 0.08,
    colorIndex: 5,
  },
];

const SHIP_ROUTES: [string, string][] = [
  ["hub", "ingest"],
  ["hub", "process"],
  ["hub", "deploy"],
  ["hub", "relay"],
  ["ingest", "deploy"],
  ["process", "monitor"],
];

type PositionsMap = Record<string, THREE.Vector3>;

function createPositionsMap(): PositionsMap {
  const ids = ["hub", ...PLANETS.map((p) => p.id)];
  const map: PositionsMap = {};
  ids.forEach((id) => {
    map[id] = new THREE.Vector3();
  });
  return map;
}

const PositionsContext = createContext<React.MutableRefObject<PositionsMap> | null>(
  null,
);

function usePositions() {
  const ctx = useContext(PositionsContext);
  if (!ctx) throw new Error("usePositions outside SolarNetwork");
  return ctx;
}

function orbitRadius(base: number) {
  const p = heroScrollRef.current;
  return base * (1 + p * 0.35);
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

function DashedOrbitRing({
  radius,
  rotation,
  opacity = 0.11,
}: {
  radius: number;
  rotation: Vec3;
  opacity?: number;
}) {
  const scaleRef = useRef<THREE.Group>(null);
  const lineObj = useMemo(() => {
    const segments = 128;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius),
      );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineDashedMaterial({
      color: ACCENT,
      transparent: true,
      opacity,
      dashSize: 0.14,
      gapSize: 0.14,
    });
    const loop = new THREE.LineLoop(geometry, material);
    loop.computeLineDistances();
    return loop;
  }, [radius, opacity]);

  useFrame(() => {
    if (!scaleRef.current) return;
    scaleRef.current.scale.setScalar(orbitRadius(1));
  });

  return (
    <group ref={scaleRef} rotation={rotation}>
      <primitive object={lineObj} />
    </group>
  );
}

function PlanetMesh({
  size,
  colorIndex,
  withRing = false,
}: {
  size: number;
  colorIndex: number;
  withRing?: boolean;
}) {
  const spinRef = useRef<THREE.Group>(null);
  const color = PLANET_COLORS[colorIndex % PLANET_COLORS.length];

  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={spinRef}>
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
            <meshBasicMaterial color={SECONDARY} transparent opacity={0.75} />
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

function OrbitingPlanet({ config }: { config: PlanetConfig }) {
  const pivotRef = useRef<THREE.Group>(null);
  const positionsRef = usePositions();
  const angle = useRef(config.phase);
  const tiltEuler = useMemo(
    () => new THREE.Euler(config.tilt[0], config.tilt[1], config.tilt[2]),
    [config.tilt],
  );

  useFrame((_, delta) => {
    if (!pivotRef.current) return;
    const r = orbitRadius(config.radius);
    angle.current += delta * config.speed;
    const x = Math.cos(angle.current) * r;
    const z = Math.sin(angle.current) * r;
    pivotRef.current.position.set(x, 0, z);

    const local = positionsRef.current[config.id];
    local.set(x, 0, z);
    local.applyEuler(tiltEuler);
  });

  return (
    <group rotation={config.tilt}>
      <group ref={pivotRef}>
        <PlanetMesh
          size={config.size}
          colorIndex={config.colorIndex}
          withRing={config.withRing}
        />
      </group>
    </group>
  );
}

function DysonHub() {
  const shellRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const positionsRef = usePositions();

  useFrame((state) => {
    const p = heroScrollRef.current;
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * (1.6 + p * 2)) * 0.05;

    positionsRef.current.hub.set(0, 0, 0);

    if (coreRef.current) coreRef.current.scale.setScalar(pulse * (1 + p * 0.15));
    if (glowRef.current) {
      glowRef.current.scale.setScalar(
        (3.1 + Math.sin(t * 1.2) * 0.14) * (1 + p * 0.45),
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
        <sphereGeometry args={[0.48, 20, 20]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.06} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color="#fff4e8" />
      </mesh>
      <mesh scale={0.92}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      <group ref={shellRef}>
        <mesh>
          <icosahedronGeometry args={[0.38, 2]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.38} />
        </mesh>
        <mesh rotation={[0.45, 0.8, 0.15]}>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshBasicMaterial
            color="#c5ccd8"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
        <mesh rotation={[1.05, 0.2, 0.5]}>
          <icosahedronGeometry args={[0.46, 1]} />
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
            rotation={[Math.PI / 2 + i * 0.35, i * 1.1, i * 0.25]}
          >
            <torusGeometry args={[0.38 + i * 0.03, 0.004, 4, 64]} />
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

function LogisticsShip({
  fromId,
  toId,
  speed,
  offset,
}: {
  fromId: string;
  toId: string;
  speed: number;
  offset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const positionsRef = usePositions();
  const progress = useRef(offset % 2);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const posAhead = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const forward = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const from = useMemo(() => new THREE.Vector3(), []);
  const to = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    from.copy(positionsRef.current[fromId]);
    to.copy(positionsRef.current[toId]);

    progress.current = (progress.current + delta * speed) % 2;
    const linearT =
      progress.current <= 1 ? progress.current : 2 - progress.current;
    const eased = travelEase(linearT);
    const linearAhead =
      progress.current <= 1
        ? Math.min(linearT + 0.03, 1)
        : Math.max(linearT - 0.03, 0);
    const easedAhead = travelEase(linearAhead);

    pos.lerpVectors(from, to, eased);
    posAhead.lerpVectors(from, to, easedAhead);
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
        <meshBasicMaterial color="#5a7594" />
      </mesh>
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[0.034, 0.01, 0.022]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      <mesh position={[0, 0, -0.024]}>
        <boxGeometry args={[0.01, 0.01, 0.014]} />
        <meshBasicMaterial color="#5a7594" />
      </mesh>
    </group>
  );
}

function SolarNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const positionsRef = useRef(createPositionsMap());

  useFrame(() => {
    if (!groupRef.current) return;
    const p = heroScrollRef.current;
    groupRef.current.rotation.y = p * Math.PI * 0.35;
    groupRef.current.scale.setScalar(1 + p * 0.55);
  });

  return (
    <PositionsContext.Provider value={positionsRef}>
      <group ref={groupRef}>
        {PLANETS.map((planet) => (
          <DashedOrbitRing
            key={`ring-${planet.id}`}
            radius={planet.radius}
            rotation={planet.tilt}
          />
        ))}

        <DysonHub />

        {PLANETS.map((planet) => (
          <OrbitingPlanet key={planet.id} config={planet} />
        ))}

        {SHIP_ROUTES.map(([a, b], i) => (
          <LogisticsShip
            key={`ship-${a}-${b}`}
            fromId={a}
            toId={b}
            speed={0.32 + (i % 3) * 0.07}
            offset={i * 0.37}
          />
        ))}
      </group>
    </PositionsContext.Provider>
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
      <SolarNetwork />
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
