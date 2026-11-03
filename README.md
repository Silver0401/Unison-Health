# Unison Health

Landing de Unison Health creada con Next.js 14, React 18, TypeScript y Stylus.

## Desarrollo local

Requiere Node.js 22.

```bash
npm install
npm run dev
```

El script de desarrollo ejecuta Next.js y el compilador de Stylus en modo watch. Para probar la versión de producción:

```bash
npm run build
npm start
```

## Subir a GitHub

Después de crear un repositorio vacío en GitHub:

```bash
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

## Desplegar en Vercel

1. Importa el repositorio desde el panel de Vercel.
2. Selecciona el preset `Next.js`.
3. No agregues variables de entorno.
4. Despliega.

El script `build` compila Stylus antes de ejecutar `next build`, por lo que Vercel no requiere pasos manuales.
