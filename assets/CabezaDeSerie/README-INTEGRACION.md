# Integración Web: `thalmorcoding.ar` ↔ `cabezadeserie.com.ar`

Este paquete incluye todo lo necesario para publicar la página de **Cabeza de Serie** dentro de **`thalmorcoding.ar`** manteniendo los planes, precios y links de WhatsApp sincronizados automáticamente con **`cabezadeserie.com.ar`**.

## Archivos incluidos
1. **`api-public-plans-route.ts`**:
   - Copialo en el repositorio `thalmor/cabezadeserie` en la ruta `src/app/api/public/plans/route.ts`.
   - Lee en tiempo real `getPremiumConfig()` (`NEXT_PUBLIC_PREMIUM_PRICE_LABEL`, `NEXT_PUBLIC_PLUS_PRICE_LABEL`, `NEXT_PUBLIC_PREMIUM_WHATSAPP`, `NEXT_PUBLIC_PREMIUM_MP_LINK`) y `LICENSE_PLAN_LABELS` de `src/lib/domain/license.ts`, devolviendo un JSON público con CORS habilitado (`Access-Control-Allow-Origin: *`).
   - Cada vez que cambies el precio o WhatsApp en las variables de entorno o en `src/lib/premium.ts` de **Cabeza de Serie**, `thalmorcoding.ar` mostrará el nuevo valor automáticamente sin tocar el código de `thalmorcoding.ar`.
2. **`cabezadeserie-landing.html`**:
   - Página HTML/Tailwind completa, lista para subir como `/cabezadeserie/index.html` en `thalmorcoding.ar`.
   - Incluye Hero, explorador interactivo de los 3 módulos (Canchas, Torneos, Caja y Abonos), Calculadora interactiva de retorno de inversión para dueños de clubes y la sección de Planes conectada a `https://cabezadeserie.com.ar/api/public/plans` con fallback instantáneo.
3. **`CabezaDeSerieSection.tsx`**:
   - Componente React / Next.js con Tailwind CSS listo para importar en `thalmorcoding.ar` si tu web usa Next.js/React (`<CabezaDeSerieSection />`).
