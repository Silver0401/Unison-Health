# Estado

## Snapshot

- Migración de `original/index.html` a Next.js 14 con App Router, React 18 y TypeScript estricto completada y contrastada visualmente.
- Estructura implementada: secciones en `src/library/Landing/`, componentes reutilizables en `src/components/` y contenido en `src/library/Landing/landingContent.ts`.
- Estilos Stylus en `src/styles/stylus/`, compilados hacia `src/styles/css/Index.css` durante build.

## Verificación visual

- `SilkCanvas.tsx` porta literalmente las ocho formaciones, la interpolación cúbica, las 26 hebras por tubo, las paletas, el brillo y la inercia independiente de cabeza/cola del script original.
- Las capturas Playwright del original y React están en `docs/comparacion/` para 1440x900 y 390x844, al 0/25/50/75/100% de scroll.
- Se eliminó el canvas `UnisonCanvas` del hero: el HTML original no incluye el elemento `#unison`, por lo que su script fuente no dibuja nada. Esto restaura la altura y los offsets de las secciones originales.

## Pendientes de producto

- Reemplazar `AGENDA_URL` cuando exista el enlace final de calendarios.
- Completar `PRIVACY_URL` y `COFEPRIS_PERMIT` en `landingContent.ts`; el pie los oculta mientras estén vacíos.
