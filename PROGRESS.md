# Progreso

## 2026-11-11

- Generadas tres tarjetas PNG de paquetes en `public/img/paquetes/`, formato cuadrado `600×600`: Consulta Integral ($2,200 MXN), Consulta Médica ($400 MXN) y Asesoría Médico-Tecnológica ($500 MXN).
- La composición toma como referencia las tarjetas de suscripción de CronosMD: marco, retícula, órbitas, fondo nocturno y jerarquía de precio; el logo y copy corresponden a Unison Health.
- Se añadió el modelo anatómico 3D como elemento mediano dentro del círculo derecho, manteniendo libre la zona central para la foto de perfil.

## 2026-11-03

- Creado el proyecto Next.js en la raíz, conservando `original/` sin modificaciones.
- Migrados header, footer, botones, tarjetas de servicio, ocho secciones y el contenido de la landing.
- Implementados control de escenas, revelado por scroll y canvas de listones/unísono con limpieza al desmontar y soporte para movimiento reducido.
- `npm run build` finalizó correctamente.
- Se portó sin aproximaciones el algoritmo Silk: control points por escena, interpolación/easing, ondas, sombreado cilíndrico, tintes, opacidad, grosor e inercia por listón.
- Se añadió redimensionado con DPR, listeners de movimiento reducido y limpieza de listeners/rAF al desmontar el componente.
- Se eliminó `UnisonCanvas` del hero porque el HTML de referencia no tiene `#unison`; con ello las primeras cinco secciones recuperan sus offsets y altura de referencia.
- Se generaron y revisaron 20 capturas Playwright en `docs/comparacion/`: original y React, al 0/25/50/75/100% para 1440x900 y 390x844.

## 2026-11-13 — Agenda propia de Unison Health

- Implementado `/agendar`: inicial/integral a la izquierda en azul, seguimiento a la derecha en blanco. Segundo paso con Diana a la izquierda e Ismael a la derecha.
- Retrato de Ismael desde Descargas y foto existente de Diana a gran escala; vidrio, luz de hover, crossfade y soporte de movimiento reducido.
- Actualizados los ocho enlaces de agenda y navegación interna desde la nueva ruta. Configuración central para tres URLs pendientes; diálogo de disponibilidad mientras están vacías.
- Verificado build/TypeScript, flujo en escritorio/tablet/móvil, Enter/Escape, historial, foco y movimiento reducido. Capturas y prueba reproducible en [docs/agenda.md](docs/agenda.md).
- Trabajo local, sin push ni deploy.
