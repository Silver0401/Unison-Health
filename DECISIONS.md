# Decisiones

## 2026-11-03

- Se usa Next.js 14.2.7, React 18.3.1 y TypeScript estricto, alineado con la referencia de Cronos Frontend.
- Se conservan las variables de marca, `data-scene`, medidas y textos del HTML original; los estilos se separaron solo por responsabilidad sin cambiar el diseño.
- Outfit y DM Sans se cargan con `next/font/google` y se exponen mediante `--display` y `--body`.
- La animación Silk vive en un componente cliente para controlar su ciclo de vida con `useEffect`.
- Los pendentes del LEEME se mantienen como constantes con TODO en `src/library/Landing/landingContent.ts`.
- El lienzo Silk mantiene las escenas y el soporte de movimiento reducido; su implementación React quedó validada visualmente contra el algoritmo de referencia.
- Silk se conserva a 75% de rasterización como la referencia, con backing store escalado por DPR para mantener la misma geometría y mejorar nitidez en pantallas retina.
- No se renderiza `UnisonCanvas`: aunque el script original contiene su rutina, el elemento objetivo no existe en su DOM y la representación fiel es no montarlo.

## 2026-11-13 — Flujo de agenda

- `/agendar` conserva el HeaderCC y la identidad original. `#seguimiento` representa el segundo paso para admitir enlaces directos y navegación Atrás/Adelante.
- CSS y estado React existentes bastan para transición cruzada, reflejos y zoom; no se agregan dependencias de animación.
- Los calendarios se configuran por separado en `bookingContent.ts`; una URL pendiente muestra un aviso y no utiliza un destino inventado.
- Dos columnas en escritorio y paneles apilados por debajo de 701 px; pasos ocultos inertes y foco en encabezado al cambiar de paso.
