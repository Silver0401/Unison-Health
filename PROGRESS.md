# Progreso

## 2026-11-03

- Creado el proyecto Next.js en la raíz, conservando `original/` sin modificaciones.
- Migrados header, footer, botones, tarjetas de servicio, ocho secciones y el contenido de la landing.
- Implementados control de escenas, revelado por scroll y canvas de listones/unísono con limpieza al desmontar y soporte para movimiento reducido.
- `npm run build` finalizó correctamente.
- Se portó sin aproximaciones el algoritmo Silk: control points por escena, interpolación/easing, ondas, sombreado cilíndrico, tintes, opacidad, grosor e inercia por listón.
- Se añadió redimensionado con DPR, listeners de movimiento reducido y limpieza de listeners/rAF al desmontar el componente.
- Se eliminó `UnisonCanvas` del hero porque el HTML de referencia no tiene `#unison`; con ello las primeras cinco secciones recuperan sus offsets y altura de referencia.
- Se generaron y revisaron 20 capturas Playwright en `docs/comparacion/`: original y React, al 0/25/50/75/100% para 1440x900 y 390x844.
