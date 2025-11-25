# Sistema Municipal de Permisos y Solvencias

## 📋 Estado del Proyecto

**FASE ACTUAL:** Desarrollo Frontend (Completado ✅)

Sistema completo desarrollado con React + TypeScript + Vite + Tailwind CSS.

---

## 📁 Estructura del Proyecto

```
.
├── RESUMEN-PROGRESO-COMPLETO.md    # Estado general del proyecto
├── INDICE-REFERENCIA-RAPIDA.txt    # Referencia rápida de colores y datos
├── wireframes-detallados.md        # Wireframes de las 9 páginas
├── GUIA-FIGMA-COMPLETA.md          # Guía paso a paso para Figma
├── ESPECIFICACIONES-COMPONENTES.md # Especificaciones detalladas de componentes
├── figma-components-spec.json      # Especificaciones en JSON
├── package.json                    # Dependencias Node.js
├── scripts/                        # Scripts de automatización
│   └── generate-figma-components.js
└── README.md                       # Este archivo
```

---

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Copia .env.example a .env y agrega tus credenciales de Supabase
# Ver SUPABASE_SETUP.md para instrucciones detalladas

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

El proyecto se abrirá en `http://localhost:3000`

### Configuración de Supabase

**⚠️ IMPORTANTE:** Antes de usar la aplicación, debes configurar Supabase:

1. Lee el archivo **`SUPABASE_SETUP.md`** para instrucciones completas
2. Crea las tablas ejecutando el script `database/schema.sql` en Supabase
3. Configura las variables de entorno en `.env`

**Ver instrucciones detalladas en:** `SUPABASE_SETUP.md`

### Acceso

1. Ve a `http://localhost:3000`
2. Si Supabase está configurado, usa tus credenciales reales
3. Si no está configurado, el sistema funcionará en modo demo (sin persistencia)
4. Click en "Iniciar Sesión"
5. Serás redirigido al Dashboard

---

## 🎨 Design System

### Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Azul Principal | `#0066CC` | Botones primarios |
| Azul Hover | `#0052A3` | Estados hover |
| Azul Fondo | `#E6F2FF` | Fondos suaves |
| Verde | `#10B981` | Éxito |
| Naranja | `#F59E0B` | Advertencia |
| Rojo | `#EF4444` | Error |
| Gris | `#6B7280` | Texto secundario |
| Gris Bordes | `#E5E7EB` | Bordes |
| Gris Fondo | `#F9FAFB` | Fondos |
| Blanco | `#FFFFFF` | Fondos principales |

### Tipografía

- **H1:** 32px / 40px (Bold)
- **H2:** 24px / 32px (SemiBold)
- **H3:** 20px / 28px (SemiBold)
- **H4:** 18px / 24px (Medium)
- **Body:** 16px / 24px (Regular)
- **Small:** 14px / 20px (Regular)
- **Caption:** 12px / 16px (Regular)

### Espaciados

- XS: 4px | SM: 8px | MD: 16px | LG: 24px | XL: 32px | 2XL: 48px | 3XL: 64px

### Breakpoints

- **Desktop:** 1280px
- **Tablet:** 768px
- **Mobile:** 375px

---

## 🛠️ Herramientas

### Scripts Node.js (Opcional)

Si quieres usar los scripts de automatización:

```bash
# Instalar dependencias
npm install

# Generar especificaciones de componentes
npm run generate-components
```

**Nota:** Los scripts requieren configuración adicional con tokens de Figma API. Para la mayoría de casos, es más rápido crear los componentes manualmente siguiendo las especificaciones.

---

## 📚 Documentación Detallada

### Configuración de Base de Datos

1. **SUPABASE_SETUP.md** - Guía completa para configurar Supabase
2. **database/schema.sql** - Script SQL para crear todas las tablas
3. **database/verificar-conexion.sql** - Script para verificar que las tablas estén creadas

### Para Diseñadores

1. **GUIA-FIGMA-COMPLETA.md** - Guía paso a paso completa
2. **ESPECIFICACIONES-COMPONENTES.md** - Detalles pixel por pixel
3. **wireframes-detallados.md** - Estructura de páginas

### Para Desarrolladores

1. **figma-components-spec.json** - Especificaciones en JSON
2. **ESPECIFICACIONES-COMPONENTES.md** - Para implementar en código
3. **SUPABASE_SETUP.md** - Configuración de base de datos

---

## ✅ Estado de Desarrollo

### Componentes Base ✅
- [x] Botones (Primary, Secondary, Danger, Success)
- [x] Inputs (Text, Select, Textarea + estados)
- [x] Cards (Default, KPI, Hover)
- [x] Badges (Success, Warning, Danger, Info)
- [x] Tables (Header, Rows, estados)
- [x] Modal (Header, Content, Footer)
- [x] Header/Navbar
- [x] Sidebar
- [x] Footer

### Páginas ✅
- [x] Login
- [x] Dashboard
- [x] Permisos Operación (Listar + Modal Crear/Editar)
- [x] Permisos Construcción
- [x] Solvencias
- [x] Reportes
- [x] Usuarios (Admin)
- [x] Configuración (Admin)

### Funcionalidades
- [x] Routing y navegación
- [x] Autenticación (con Supabase)
- [x] Layout responsive
- [x] Integración con Supabase
- [x] CRUD completo de permisos y catálogos
- [x] Sistema de configuración municipal
- [x] Impresión de documentos (permisos, solvencias, avisos)

---

## 🔗 Enlaces

- **Figma File:** [Abrir en Figma](https://figma.com/design/pFACdirtNEFvozkjP80YxM/01-Login-Deskt?node-id=0-1)

---

## 🚀 Stack Tecnológico Final

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **State:** Zustand + React Query
- **Backend:** Supabase (PostgreSQL)
- **Deploy:** Netlify

---

## 👥 Roles del Sistema

- **Admin:** Acceso completo (CRUD + Configuración)
- **Empleado:** CRUD de permisos y solvencias
- **Directivo:** Solo lectura (view only)

---

## ⏱️ Tiempo Estimado

- **Componentes Base:** 2-3 horas
- **Páginas (9 x 3 breakpoints):** 12-15 horas
- **Prototypes:** 2-3 horas
- **Total:** 16-21 horas

---

## 📝 Notas

- Usa **Auto Layout** siempre que sea posible
- Crea **Variants** para componentes con múltiples estados
- Usa **Component Properties** para flexibilidad
- Mantén consistencia en nombres y estructura
- Documenta componentes complejos con notas

---

## 🆘 Ayuda

Si tienes dudas:

1. Revisa **GUIA-FIGMA-COMPLETA.md** para instrucciones detalladas
2. Consulta **ESPECIFICACIONES-COMPONENTES.md** para detalles técnicos
3. Revisa **wireframes-detallados.md** para estructura de páginas
4. Usa **INDICE-REFERENCIA-RAPIDA.txt** como referencia rápida

---

**Última actualización:** 2025

