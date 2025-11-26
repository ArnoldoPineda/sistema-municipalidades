# 🚀 Pasos para Desplegar en Netlify con GitHub

## ✅ Paso 1: Commit realizado
Ya hicimos el commit de todos los cambios. ✅

---

## 📝 Paso 2: Crear repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en el botón verde **"Nuevo"** (New) en la barra lateral izquierda, o ve a: https://github.com/new
3. Configura el repositorio:
   - **Repository name:** `sistema-municipalidades` (o el nombre que prefieras)
   - **Description:** (opcional) " Sistema de gestión municipal para permisos, solvencias y contribuyentes"
   - **Visibility:** 
     - ✅ **Public** (recomendado para Netlify gratuito)
     - O **Private** (si prefieres mantenerlo privado)
   - ⚠️ **NO marques** "Add a README file" (ya tienes uno)
   - ⚠️ **NO marques** "Add .gitignore" (ya tienes uno)
   - ⚠️ **NO marques** "Choose a license"
4. Haz clic en **"Create repository"**

---

## 🔗 Paso 3: Conectar tu repositorio local con GitHub

Después de crear el repositorio, GitHub te mostrará una página con instrucciones. **NO sigas esas instrucciones** porque ya tienes un repositorio local.

En su lugar, ejecuta estos comandos en PowerShell (reemplaza `TU_USUARIO` y `TU_REPOSITORIO` con los valores reales):

```powershell
# Actualizar el remote con la URL real de tu repositorio
git remote set-url origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Verificar que se actualizó correctamente
git remote -v

# Subir el código a GitHub
git push -u origin main
```

**Ejemplo:**
Si tu usuario es `ArnoldoPineda` y el repositorio es `sistema-municipalidades`, el comando sería:
```powershell
git remote set-url origin https://github.com/ArnoldoPineda/sistema-municipalidades.git
git push -u origin main
```

**Nota sobre autenticación:**
- Si GitHub te pide usuario y contraseña, **NO uses tu contraseña de GitHub**
- En su lugar, usa un **Personal Access Token (PAT)**
- Para crear un PAT: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
- Dale permisos: `repo` (acceso completo a repositorios)

---

## 🌐 Paso 4: Conectar Netlify con GitHub

1. Ve a [Netlify](https://app.netlify.com) e inicia sesión
2. Haz clic en **"Add new project"** (botón verde)
3. Selecciona **"Import an existing project"**
4. Elige **"Deploy with GitHub"**
5. Si es la primera vez:
   - Autoriza Netlify a acceder a tu cuenta de GitHub
   - Selecciona los repositorios que Netlify puede acceder (o "All repositories")
   - Haz clic en **"Install"** o **"Authorize"**
6. Selecciona el repositorio que acabas de crear (`sistema-municipalidades`)

---

## ⚙️ Paso 5: Configurar el build en Netlify

Netlify debería detectar automáticamente la configuración desde `netlify.toml`, pero verifica:

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Node version:** `18` (ya está configurado en `netlify.toml`)

**ANTES de hacer clic en "Deploy site":**

1. Haz clic en **"Show advanced"** o **"Advanced"**
2. Busca la sección **"Environment variables"** o **"Variables de entorno"**
3. Agrega estas dos variables:

   **Variable 1:**
   - **Key:** `VITE_SUPABASE_URL`
   - **Value:** (tu URL completa de Supabase, ejemplo: `https://lwllwxtonylugqhtcmaw.supabase.co`)

   **Variable 2:**
   - **Key:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** (tu clave anónima completa de Supabase)

4. Haz clic en **"Deploy site"**

---

## ⏳ Paso 6: Esperar el despliegue

- Netlify comenzará a construir tu proyecto automáticamente
- Esto tomará aproximadamente **3-5 minutos** la primera vez
- Puedes ver el progreso en tiempo real en la página de deploy
- Cuando termine, verás un enlace a tu sitio (algo como: `https://random-name-123.netlify.app`)

---

## ✅ Paso 7: Verificar el despliegue

1. Haz clic en el enlace de tu sitio
2. Verifica que la aplicación cargue correctamente
3. Prueba iniciar sesión y navegar por las diferentes secciones
4. Si hay errores, revisa:
   - La consola del navegador (F12)
   - Los logs de build en Netlify (Site settings → Build logs)

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios y quieras actualizar el sitio:

```powershell
# Hacer cambios en tu código...

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir a GitHub
git push

# Netlify desplegará automáticamente la nueva versión 🎉
```

---

## 🆘 Solución de Problemas

### Error: "Build failed"
- Verifica que las variables de entorno estén configuradas correctamente
- Revisa los logs de build en Netlify para ver el error específico
- Asegúrate de que `package.json` tenga todas las dependencias

### Error: "Module not found"
- Verifica que todas las dependencias estén en `package.json`
- Netlify ejecuta `npm install` automáticamente, pero si falta algo, el build fallará

### El sitio carga pero no funciona
- Verifica que las variables de entorno de Supabase estén configuradas
- Revisa la consola del navegador (F12) para ver errores
- Asegúrate de que las credenciales de Supabase sean correctas

### Error de autenticación con GitHub
- Usa un Personal Access Token en lugar de tu contraseña
- Asegúrate de que el token tenga permisos `repo`

---

## 📝 Checklist Final

Antes de considerar el despliegue completo:

- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub (`git push` exitoso)
- [ ] Netlify conectado con GitHub
- [ ] Variables de entorno configuradas en Netlify
- [ ] Build exitoso en Netlify
- [ ] Sitio accesible y funcionando
- [ ] Conexión con Supabase verificada

---

**¡Listo!** Una vez completados estos pasos, tu sistema estará en línea y se actualizará automáticamente cada vez que hagas `git push`. 🎉


