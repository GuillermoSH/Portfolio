import { LOGISTICS_SHIP } from "../lib/logisticsShip";

/** Exact LogisticsShip geometry from HeroCanvas. */
export function LogisticsShipModel() {
  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.018]}>
        <coneGeometry args={[0.014, 0.05, 4]} />
        <meshBasicMaterial color={LOGISTICS_SHIP.nose} />
      </mesh>
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[0.034, 0.01, 0.022]} />
        <meshBasicMaterial color={LOGISTICS_SHIP.body} />
      </mesh>
      <mesh position={[0, 0, -0.024]}>
        <boxGeometry args={[0.01, 0.01, 0.014]} />
        <meshBasicMaterial color={LOGISTICS_SHIP.tail} />
      </mesh>
    </>
  );
}
