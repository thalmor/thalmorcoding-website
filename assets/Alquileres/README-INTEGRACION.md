# Integración de "El Encargado" en `thalmorcoding.ar` (Patrón idéntico a Cabeza de Serie)

En este paquete tenés todo listo para publicar la página de **El Encargado – Gestión de Alquileres** en `https://thalmorcoding.ar` y mantener sus **planes y precios sincronizados automáticamente en tiempo real** con `alquileres.thalmorcoding.ar` y Supabase (`public.plan_plataforma`):

---

## Archivos incluidos

1. **`alquileres-landing.html`** (también copiado en `/workspace/alquileres-thalmorcoding.html`)
   - Página web completa (HTML5 + Tailwind CSS CDN + tipografía `Inter` + estética oscura `bg-slate-950` y acentos `sky`/`brand` idéntica a `thalmorcoding.ar` y a `cabezadeserie-landing.html`).
   - Lista para subir como `/Alquileres/index.html` (siguiendo el mismo patrón de `/Baqueano/index.html` y `/cabezadeserie/index.html` en `thalmorcoding.ar`).
   - **Sincronización doble en vivo (`syncLivePlans()`):**
     1. Consulta primero `https://alquileres.thalmorcoding.ar/api/public/plans`.
     2. Si el endpoint aún no está desplegado, consulta directamente la API REST de Supabase (`https://gpeptcscrpsbzsyvkjou.supabase.co/rest/v1/plan_plataforma?activo=eq.true&order=orden.asc`) usando la `anon` key pública.
     3. Mientras responde (o sin conexión), renderiza sin parpadeos el espejo de respaldo (`Prueba Gratis 14 Días`, `Plan Inicial` $15.000/mes, `Plan Pro` $30.000/mes, `Plan Estudio` $60.000/mes).

2. **`snippet-card-thalmorcoding.html`**
   - Bloque HTML exacto de la tarjeta de producto para pegar dentro de `<section id="productos">` en el `index.html` principal de `https://thalmorcoding.ar`.

3. **`api-public-plans-route.ts`**
   - Endpoint para el proyecto **El Encargado** en `src/app/api/public/plans/route.ts`.
   - Lee en vivo `public.plan_plataforma` y `public.config_facturacion_plataforma` desde Supabase y los devuelve con cabeceras CORS (`Access-Control-Allow-Origin: *`).
   - **Nota sobre el Middleware de Next.js (`src/middleware.ts`):** agregá `pathname.startsWith("/api/public")` a las rutas públicas para que el middleware no redirija `/api/public/plans` a `/login`.

4. **`supabase-public-plans.sql`**
   - Política RLS de 1 línea para ejecutar en el SQL Editor de Supabase (`FOR SELECT TO anon, authenticated USING (activo = true)` sobre `public.plan_plataforma`). Con solo correr ese SQL, `thalmorcoding.ar` lee los precios en vivo directamente desde Supabase al instante cuando los editás en `/admin/suscripciones`.

5. **`ElEncargadoSection.tsx`**
   - Componente React / Next.js equivalente (`"use client"`) por si integrás la página dentro de un proyecto React/Next.js.
