# Agenda de Unison Health

Implementado el 2026-11-13. Ruta `/agendar`.

## Flujo

- Inicial: izquierda cobalto `#1E40AF`, consulta inicial/integral; derecha blanca, seguimiento.
- Seguimiento (`#seguimiento`): Diana a la izquierda, Ismael a la derecha. Cada panel completo es accionable.
- Navegación compartida siempre visible. Desde agenda, las secciones del menú regresan a `/#seccion`.
- Los ocho enlaces de agenda de la landing llegan a `/agendar` en la misma pestaña.
- `Volver` y el historial del navegador recuperan el paso anterior.

## Conectar los calendarios

Editar `src/library/Booking/bookingContent.ts`:

| Clave | Destino pendiente |
|---|---|
| `initial` | Agenda del Dr. Ismael para consulta inicial/integral |
| `ismael` | Agenda de seguimiento médico |
| `diana` | Agenda de seguimiento nutricional |

Cuando una URL está vacía, aparece un diálogo de disponibilidad. No se simula una reserva ni se envía al paciente a la antigua landing genérica de Cronos. Al agregar cada URL, el panel se convierte en enlace directo. Usar URLs HTTPS de las agendas confirmadas.

## Identidad y movimiento

Outfit para títulos, DM Sans para texto, cobalto `#1E40AF`, blanco, tinta `#0F172A` y coral `#FF7A59`. Header reutilizado. Cintas translúcidas como referencia al lienzo Silk de la landing, sin dependencias nuevas.

Transición cruzada entre pasos, luz por hover/foco, zoom suave en retratos y feedback de presión. Transiciones sobre opacity/transform; el vidrio utiliza blur estático. Movimiento reducido desactiva desplazamientos y animaciones. El paso oculto es inerte; el foco pasa al encabezado del nuevo paso.

Retrato de Ismael copiado sin modificar desde `~/Downloads/FotoRetrato.PNG` a `public/img/ismael-agenda.png`; el encuadre se hace con CSS. Diana utiliza `public/img/diana.jpg`. Imágenes optimizadas por `next/image` y precargadas para el segundo paso.

En móvil (hasta 700 px), paneles apilados y altura flexible para preservar la legibilidad. En escritorio, dos columnas ocupan el viewport bajo el header.

## Verificación

- `npm run build`: correcto, con validación TypeScript. Advertencia preexistente de Autoprefixer por `align-items: end` en estilos de landing.
- Chromium: 1440×900, 768×1024 y 390×844; selección, tres avisos pendientes, regreso, foco, pasos ocultos y sin desbordamiento horizontal.
- Enter, Escape, historial y acceso directo a `#seguimiento` verificados.
- Movimiento reducido: `animation-name: none`, `transition-duration: 0s`.
- En escritorio: documento de 900 px en viewport de 900 px.
- Ocho enlaces de la landing a `/agendar`, sin `target="_blank"` ni enlaces activos a `patientLanding`.

Comprobación reproducible, con la aplicación abierta en `/agendar` mediante Agent Browser:

```sh
agent-browser eval --stdin < scripts/check-booking-browser.js
```

Capturas: [inicial](agenda/inicial-desktop.png), [seguimiento](agenda/seguimiento-desktop.png), [inicial móvil](agenda/inicial-mobile.png), [seguimiento móvil](agenda/seguimiento-mobile.png).

No se hizo push ni deploy. Pendientes únicamente las tres URLs de calendarios y la revisión del dueño antes de publicar.
