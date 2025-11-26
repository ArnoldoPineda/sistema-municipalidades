# 🔑 Cómo Obtener tus Credenciales de Supabase

## ⚠️ Problema Detectado

Tu URL de Supabase estaba mal escrita. La URL correcta es:
```
https://lwllwxtonylugqhtcmaw.supabase.co
```

## 📝 Pasos para Obtener tus Credenciales

### Opción 1: Desde Settings (Recomendado)

1. Ve a tu proyecto en Supabase:
   ```
   https://supabase.com/dashboard/project/lwllwxtonylugqhtcmaw
   ```

2. Si el panel de Auth te da error, **NO TE PREOCUPES**, puedes acceder a Settings de otras formas:
   - Intenta hacer clic directamente en "Settings" en el menú lateral
   - O usa este enlace directo: `https://supabase.com/dashboard/project/lwllwxtonylugqhtcmaw/settings/api`

3. En la página de Settings → API, encontrarás:
   - **Project URL**: `https://lwllwxtonylugqhtcmaw.supabase.co`
   - **anon public key**: Una cadena larga que comienza con `eyJ...`

### Opción 2: Desde el SQL Editor

1. Ve al SQL Editor:
   ```
   https://supabase.com/dashboard/project/lwllwxtonylugqhtcmaw/sql/new
   ```

2. Ejecuta esta consulta:
   ```sql
   SELECT 
     current_setting('app.settings.supabase_url', true) as url,
     current_setting('app.settings.anon_key', true) as key;
   ```

   (Nota: Esto puede no funcionar, pero puedes intentarlo)

### Opción 3: Verificar desde la URL del Proyecto

La URL de tu proyecto es parte de la URL del dashboard:
- Dashboard: `https://supabase.com/dashboard/project/lwllwxtonylugqhtcmaw`
- Project URL: `https://lwllwxtonylugqhtcmaw.supabase.co`

## ✅ Configurar el Archivo .env

1. Abre el archivo `.env` en la raíz del proyecto

2. Reemplaza `tu-anon-key-aqui` con tu clave real:

   ```env
   VITE_SUPABASE_URL=https://lwllwxtonylugqhtcmaw.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (tu clave completa aquí)
   ```

3. **IMPORTANTE**: 
   - No dejes espacios alrededor del `=`
   - No uses comillas alrededor de los valores
   - La clave debe ser completa (es muy larga, puede tener varias líneas si la copias mal)

4. Guarda el archivo

5. Reinicia el servidor de desarrollo:
   ```bash
   # Detén el servidor (Ctrl+C)
   npm run dev
   ```

## 🧪 Verificar que Funciona

1. Ve a: `http://localhost:3000/test-conexion`
2. Haz clic en "Probar Conexión"
3. Deberías ver: ✅ Conexión exitosa con Supabase!

## ❌ Si Aún No Funciona

### Verificar que la URL esté correcta:

Abre la consola del navegador (F12) y ejecuta:
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL)
```

Debería mostrar: `https://lwllwxtonylugqhtcmaw.supabase.co`

### Verificar que la Key esté correcta:

```javascript
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20))
```

Debería mostrar algo como: `eyJhbGciOiJIUzI1NiIs`

## 📞 Si No Puedes Acceder a Settings

Si el panel de Supabase sigue dando error:

1. **Usa modo incógnito** (Ctrl+Shift+N)
2. **Desactiva extensiones** del navegador
3. **Usa otro navegador** (Firefox, Edge)
4. **Contacta a Supabase** si el problema persiste

Pero recuerda: **la URL correcta ya está en el archivo .env**, solo necesitas la clave (anon key).


