import { StackVariantFrame } from "../sections/stack-lab/StackVariantFrame";
import { StackNetworkGraph } from "../sections/stack-lab/StackNetworkGraph";
import { StackOrbitHub } from "../sections/stack-lab/StackOrbitHub";
import { StackPipeline } from "../sections/stack-lab/StackPipeline";
import { StackConstellation } from "../sections/stack-lab/StackConstellation";
import { StackLayerStack } from "../sections/stack-lab/StackLayerStack";
import type { Theme } from "../hooks/useTheme";

type StackLabPageProps = {
  theme: Theme;
  onThemeToggle: () => void;
};

export function StackLabPage({ theme, onThemeToggle }: StackLabPageProps) {
  return (
    <>
      <header className="stack-lab-header">
        <div className="stack-lab-header__inner">
          <div>
            <p className="stack-lab-header__kicker">Review</p>
            <h1 className="stack-lab-header__title">Stack Lab</h1>
          </div>
          <div className="stack-lab-header__actions">
            <button
              type="button"
              className="stack-lab-header__theme"
              onClick={onThemeToggle}
              aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <a href={import.meta.env.BASE_URL} className="stack-lab-header__back">
              ← Volver al portfolio
            </a>
          </div>
        </div>
      </header>

      <main id="main" className="stack-lab-main">
        <StackVariantFrame
          id="stack-lab-a"
          badge="Variante A"
          title="Red de stack"
          hint="Click nodos — resalta vecinos y detalle."
        >
          <StackNetworkGraph />
        </StackVariantFrame>

        <StackVariantFrame
          id="stack-lab-b"
          badge="Variante B"
          title="Orbit hub"
          hint="Click nodo en anillo — frena rotación y muestra detalle."
        >
          <StackOrbitHub />
        </StackVariantFrame>

        <StackVariantFrame
          id="stack-lab-c"
          badge="Variante C"
          title="Pipeline de build"
          hint="Click etapa — drawer con tools y flujo animado."
        >
          <StackPipeline />
        </StackVariantFrame>

        <StackVariantFrame
          id="stack-lab-d"
          badge="Variante D"
          title="Constelación cuadrante"
          hint="Hover cuadrante — zoom; click nodo — cross-links."
        >
          <StackConstellation />
        </StackVariantFrame>

        <StackVariantFrame
          id="stack-lab-e"
          badge="Variante E"
          title="Capas apiladas"
          hint="Click capa — revela tools; una abierta a la vez."
        >
          <StackLayerStack />
        </StackVariantFrame>
      </main>
    </>
  );
}
