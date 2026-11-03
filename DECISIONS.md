# Decisiones

## 2026-11-03

- Se usa Next.js 14.2.7, React 18.3.1 y TypeScript estricto, alineado con la referencia de Cronos Frontend.
- Se conservan las variables de marca, `data-scene`, medidas y textos del HTML original; los estilos se separaron solo por responsabilidad sin cambiar el diseño.
- Outfit y DM Sans se cargan con `next/font/google` y se exponen mediante `--display` y `--body`.
- La animación Silk y el canvas del hero viven en componentes cliente para controlar el ciclo de vida con `useEffect`.
- Los pendentes del LEEME se mantienen como constantes con TODO en `src/library/Landing/landingContent.ts`.
