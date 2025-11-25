# Configuración de Supabase

Este documento te guiará paso a paso para conectar tu aplicación con Supabase.

## ⚠️ Solución de Problemas del Panel de Supabase

Si el panel de Supabase te muestra un error como "Lo sentimos. Es posible que una extensión del navegador haya provocado un error", **NO es necesario recrear el proyecto**. Este es un problema del navegador, no de Supabase.

### Soluciones Rápidas:

1. **Usar modo incógnito** (Ctrl+Shift+N en Chrome)
2. **Desactivar extensiones** (especialmente traductores)
3. **Usar otro navegador** (Firefox, Edge)
4. **Acceder directamente al SQL Editor** - Este suele funcionar aunque el panel de Auth falle
5. **Usar la página de prueba** - Ve a `/test-conexion` en tu aplicación para verificar la conexión

El proyecto y la base de datos están bien, solo necesitas acceder de otra forma.

## 📋 Requisitos Previos

1. Una cuenta en [Supabase](https://supabase.com)
2. Un proyecto creado en Supabase (ya tienes el proyecto "MUNICIPAL")

## 🔑 Paso 1: Obtener las Credenciales de Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard/project/lwllwxtonylugqhtcmaw
2. En el menú lateral, haz clic en **Settings** (⚙️)
3. Selecciona **API** en el submenú
4. Encontrarás dos valores importantes:
   - **Project URL**: Es la URL de tu proyecto (ejemplo: `https://lwllwxtonylugqhtcmaw.supabase.co`)
   - **anon public key**: Es la clave pública anónima (una cadena larga que comienza con `eyJ...`)

## 📝 Paso 2: Configurar Variables de Entorno

1. Copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Abre el archivo `.env` y reemplaza los valores con tus credenciales:
   ```
   VITE_SUPABASE_URL=https://lwllwxtonylugqhtcmaw.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```

   ⚠️ **IMPORTANTE**: Reemplaza `tu-anon-key-aqui` con la clave real que copiaste de Supabase.

## 🗄️ Paso 3: Crear las Tablas en Supabase

Necesitas crear las siguientes tablas en tu base de datos. Puedes hacerlo de dos formas:

### Opción A: Usando el Editor SQL de Supabase (Recomendado)

1. Ve a tu proyecto en Supabase
2. En el menú lateral, haz clic en **SQL Editor**
3. Haz clic en **New query**
4. Copia y pega el contenido del archivo `database/schema.sql`
5. Haz clic en **Run** (o presiona `Ctrl+Enter`)

### Opción B: Usando el Table Editor

Puedes crear las tablas manualmente usando el Table Editor de Supabase. Consulta el archivo `database/schema.sql` para ver la estructura de cada tabla.

## 📊 Estructura de la Base de Datos

El sistema utiliza las siguientes tablas:

### Tablas de Catálogos
- `aldeas` - Lista de aldeas
- `barrios_colonias` - Barrios y colonias (relacionados con aldeas)
- `actividades_economicas` - Actividades económicas
- `categorias_rubros` - Categorías de rubros de negocios
- `rubros_items` - Rubros específicos (relacionados con categorías)

### Tablas de Permisos
- `permisos_operacion` - Permisos de operación
- `permisos_operacion_actividades` - Relación entre permisos y actividades
- `permisos_construccion` - Permisos de construcción (si se implementa)
- `solvencias` - Solvencias personales (si se implementa)

### Tablas de Configuración
- `configuracion_municipal` - Configuración del sistema (logos, firmas, etc.)

### Tablas de Usuarios
- `perfiles_usuarios` - Perfiles de usuarios del sistema

## ✅ Paso 4: Verificar la Conexión

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre la aplicación en tu navegador
3. Intenta iniciar sesión o crear un nuevo registro
4. Si todo está configurado correctamente, deberías poder interactuar con la base de datos

## 🔒 Configuración de Seguridad (Row Level Security)

Para producción, es importante configurar las políticas de seguridad (RLS) en Supabase:

1. Ve a **Authentication** > **Policies** en tu proyecto
2. Configura las políticas según tus necesidades de seguridad
3. Por ahora, puedes desactivar RLS para desarrollo, pero **NO lo hagas en producción**

## 🚀 Despliegue en Netlify

Cuando despliegues en Netlify, necesitarás agregar las variables de entorno:

1. Ve a tu proyecto en Netlify
2. Ve a **Site settings** > **Environment variables**
3. Agrega las siguientes variables:
   - `VITE_SUPABASE_URL` = Tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY` = Tu anon key

## 📞 Soporte

Si tienes problemas con la configuración:
1. Verifica que las credenciales estén correctas
2. Asegúrate de que las tablas estén creadas
3. Revisa la consola del navegador para errores
4. Verifica que las políticas de RLS no estén bloqueando las consultas

