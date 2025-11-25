# 🔍 Guía de Verificación - Test de Conexión

## 📋 Pasos para Verificar

### 1. Ir a la Página de Prueba

1. Abre tu navegador
2. Ve a: `http://localhost:3000/test-conexion`
3. Asegúrate de que el servidor esté corriendo (`npm run dev`)

### 2. Probar la Conexión Básica

1. Haz clic en el botón **"Probar Conexión"** (botón azul)
2. Deberías ver:
   - ✅ **Conexión exitosa con Supabase!**
   - ✅ **Las tablas están creadas y accesibles**

### 3. Verificar Todas las Tablas

1. Haz clic en el botón **"Verificar Tablas"** (botón gris)
2. Deberías ver una lista con **✅ OK** para todas las tablas:
   - ✅ aldeas
   - ✅ barrios_colonias
   - ✅ actividades_economicas
   - ✅ categorias_rubros
   - ✅ rubros_items
   - ✅ permisos_operacion
   - ✅ permisos_operacion_actividades
   - ✅ permisos_construccion
   - ✅ solvencias
   - ✅ **configuracion_municipal** (esta es la que acabamos de crear)
   - ✅ perfiles_usuarios

### 4. Ver Información del Proyecto

1. Haz clic en **"Mostrar Info"**
2. Abre la consola del navegador (F12)
3. Deberías ver:
   - URL: `https://lwllwxtonylugqhtcmaw.supabase.co`
   - Key configurada: ✅ Sí

## ✅ Resultado Esperado

Si todo está bien, deberías ver:
- ✅ Conexión exitosa
- ✅ Todas las tablas con estado "OK"
- ✅ Sin errores en la consola (excepto advertencias menores de React)

## ❌ Si Hay Errores

### Error: "Invalid API key"
- Verifica que el archivo `.env` tenga tu clave real (no `TU_CLAVE_AQUI`)
- Reinicia el servidor después de cambiar el `.env`

### Error: "Table not found" para alguna tabla
- Ve al SQL Editor de Supabase
- Ejecuta el script `database/schema.sql` completo

### Error: "Failed to fetch" o "ERR_NAME_NOT_RESOLVED"
- Verifica que la URL en `.env` sea correcta: `https://lwllwxtonylugqhtcmaw.supabase.co`
- Reinicia el servidor

## 📸 Qué Buscar

En la página deberías ver:
- Botones funcionando
- Mensajes de éxito (verde con ✅)
- Lista de tablas todas con "OK"
- Sin mensajes de error en rojo

¡Vamos a verificar que todo funciona!

