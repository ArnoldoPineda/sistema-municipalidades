# 🚀 Guía de Despliegue en Netlify

## Opción 1: Despliegue Automático con GitHub (RECOMENDADO) ⭐

Esta es la forma más fácil y te permite actualizaciones automáticas cada vez que hagas cambios.

### Paso 1: Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) y haz clic en el botón verde **"Nuevo"** (New) en la barra lateral izquierda
2. Nombra el repositorio (ejemplo: `sistema-municipalidades`)
3. **NO marques** "Add a README file" (ya tienes uno)
4. Haz clic en **"Create repository"**

### Paso 2: Subir el código a GitHub

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Primera versión del sistema municipal"

# Conectar con tu repositorio (reemplaza TU_USUARIO y TU_REPOSITORIO)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Subir el código
git branch -M main
git push -u origin main
```

**Nota:** Si GitHub te pide autenticación, usa un Personal Access Token en lugar de tu contraseña.

### Paso 3: Conectar Netlify con GitHub

1. Ve a [Netlify](https://app.netlify.com)
2. Haz clic en **"Add new project"**
3. Selecciona **"Import an existing project"**
4. Elige **"Deploy with GitHub"**
5. Autoriza Netlify a acceder a tu cuenta de GitHub
6. Selecciona el repositorio que acabas de crear
7. Netlify detectará automáticamente la configuración:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
8. **IMPORTANTE:** Antes de hacer clic en "Deploy", haz clic en **"Show advanced"** y agrega las variables de entorno:
   - **Variable:** `VITE_SUPABASE_URL`
   - **Value:** (tu URL de Supabase)
   - **Variable:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** (tu clave anónima de Supabase)
9. Haz clic en **"Deploy site"**

### Paso 4: Esperar el despliegue

Netlify construirá tu proyecto automáticamente. Esto tomará unos minutos la primera vez.

### ✅ Ventajas de esta opción:
- ✅ Despliegues automáticos cada vez que hagas `git push`
- ✅ Historial de versiones
- ✅ Fácil de revertir cambios
- ✅ Colaboración con otros desarrolladores

---

## Opción 2: Despliegue Manual (RÁPIDO) 🏃

Si quieres desplegar ahora mismo sin usar GitHub:

### Paso 1: Construir el proyecto localmente

```powershell
# Asegúrate de estar en la carpeta del proyecto
npm run build
```

Esto creará una carpeta `dist` con los archivos listos para producción.

### Paso 2: Desplegar en Netlify

1. Ve a [Netlify](https://app.netlify.com)
2. Haz clic en **"Add new project"**
3. Selecciona **"Deploy manually"**
4. Arrastra la carpeta **`dist`** a la zona de arrastre
5. Netlify comenzará a desplegar inmediatamente

### Paso 3: Configurar variables de entorno

1. Ve a **"Site settings"** → **"Environment variables"**
2. Agrega:
   - `VITE_SUPABASE_URL` = (tu URL de Supabase)
   - `VITE_SUPABASE_ANON_KEY` = (tu clave anónima de Supabase)
3. Haz clic en **"Redeploy"** para aplicar los cambios

### ⚠️ Desventajas de esta opción:
- ❌ Debes construir y subir manualmente cada vez
- ❌ No hay historial de versiones
- ❌ Más trabajo para actualizaciones

---

## 🔧 Configuración Adicional

### Cambiar el nombre del sitio

1. Ve a **"Site settings"** → **"Change site name"**
2. Elige un nombre personalizado (ejemplo: `sistema-municipal-marcovia`)

### Dominio personalizado (opcional)

1. Ve a **"Domain settings"**
2. Haz clic en **"Add custom domain"**
3. Sigue las instrucciones para configurar tu dominio

---

## 📝 Notas Importantes

1. **Variables de entorno:** Las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` son **OBLIGATORIAS** para que el sistema funcione correctamente.

2. **Archivo .env:** El archivo `.env` local NO se sube a GitHub (está en `.gitignore`), por eso debes configurar las variables en Netlify.

3. **Primera carga:** La primera vez que Netlify construya el proyecto puede tardar 3-5 minutos.

4. **Actualizaciones:** Si usas GitHub, cada vez que hagas `git push`, Netlify desplegará automáticamente la nueva versión.

---

## 🆘 Solución de Problemas

### Error: "Build failed"
- Verifica que las variables de entorno estén configuradas
- Revisa los logs de build en Netlify para ver el error específico

### Error: "Module not found"
- Asegúrate de que `package.json` tenga todas las dependencias
- Ejecuta `npm install` localmente para verificar

### El sitio carga pero no funciona
- Verifica que las variables de entorno de Supabase estén configuradas
- Revisa la consola del navegador para ver errores

---

## ✅ Checklist Final

Antes de desplegar, verifica:

- [ ] El proyecto se construye localmente sin errores (`npm run build`)
- [ ] Tienes las credenciales de Supabase listas
- [ ] El archivo `netlify.toml` está presente
- [ ] El archivo `public/_redirects` está presente
- [ ] Has probado el sistema localmente

---

**¿Necesitas ayuda?** Revisa los logs de build en Netlify o los errores en la consola del navegador.


