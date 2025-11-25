# 🔧 Corrección de URL de Supabase

## ❌ Problema Detectado

Tu archivo `.env` tiene la URL incorrecta:
```
https://iwllwxtonylugghtcmaw.supabase.co
```

## ✅ URL Correcta

La URL correcta es:
```
https://lwllwxtonylugqhtcmaw.supabase.co
```

## 📝 Pasos para Corregir

1. **Abre el archivo `.env`** en la raíz del proyecto

2. **Busca la línea:**
   ```
   VITE_SUPABASE_URL=https://iwllwxtonylugghtcmaw.supabase.co
   ```

3. **Reemplázala por:**
   ```
   VITE_SUPABASE_URL=https://lwllwxtonylugqhtcmaw.supabase.co
   ```

4. **Guarda el archivo**

5. **Reinicia el servidor de desarrollo:**
   - Detén el servidor (Ctrl+C)
   - Ejecuta nuevamente: `npm run dev`

6. **Recarga la página** en el navegador (F5 o Ctrl+R)

## 🔍 Verificación

Después de corregir, ve a `/test-conexion` y haz clic en "Probar Conexión". Deberías ver:
- ✅ Conexión exitosa
- ✅ Las tablas están creadas y accesibles

## 📋 Tu archivo .env debería verse así:

```
VITE_SUPABASE_URL=https://lwllwxtonylugqhtcmaw.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

**Nota:** Asegúrate de reemplazar `tu-anon-key-aqui` con tu clave real de Supabase.

