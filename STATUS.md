# Estado

## Snapshot

- Migración de `original/index.html` a Next.js 14 con App Router, React 18 y TypeScript estricto completada.
- Estructura implementada: secciones en `src/library/Landing/`, componentes reutilizables en `src/components/` y contenido en `src/library/Landing/landingContent.ts`.
- Estilos Stylus en `src/styles/stylus/`, compilados hacia `src/styles/css/Index.css` durante build.

## Siguiente acción

- Ejecutar las capturas y comparación visual solicitadas en `docs/comparacion/`; no se alcanzaron a generar en esta sesión.

## Pendientes de producto

- Reemplazar `AGENDA_URL` cuando exista el enlace final de calendarios.
- Completar `PRIVACY_URL` y `COFEPRIS_PERMIT` en `landingContent.ts`; el pie los oculta mientras estén vacíos.
