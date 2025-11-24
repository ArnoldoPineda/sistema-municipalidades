# Sistema Municipal de Permisos y Solvencias

## Estado del Proyecto

**FASE ACTUAL:** Diseño UI en Figma (5% completado)

**ÚLTIMA ACTUALIZACIÓN:** 2025

---

## ✅ Completado

- [x] Design System documentado (8 colores, tipografía, espaciados)
- [x] 9 páginas diseñadas en wireframes (desktop, tablet, mobile)
- [x] Figma file abierto y frame "01-Login-Desktop" creado (1280x720)

---

## ❌ Pendiente

- [ ] Componentes base (Botones, Inputs, Cards, Badges, Tables, Modal)
- [ ] 8 páginas completas en Figma (faltan 8 de 9)
- [ ] Versiones responsive (Tablet 768px, Mobile 375px)
- [ ] Prototypes y interacciones
- [ ] Design tokens exportables

---

## 🎨 Design System

### Colores Base

| Color | Hex | Uso |
|-------|-----|-----|
| Azul Principal | `#0066CC` | Botones primarios, links activos |
| Azul Hover | `#0052A3` | Estados hover de botones azules |
| Azul Fondo | `#E6F2FF` | Fondos suaves, highlights |
| Verde | `#10B981` | Éxito, aprobaciones |
| Naranja | `#F59E0B` | Advertencias, pendientes |
| Rojo | `#EF4444` | Errores, rechazos |
| Gris | `#6B7280` | Texto secundario |
| Gris Bordes | `#E5E7EB` | Bordes, separadores |
| Gris Fondo | `#F9FAFB` | Fondos de secciones |
| Blanco | `#FFFFFF` | Fondos principales |

### Tipografía

**Fuente Principal:** Inter / System UI
- **H1:** 32px / 40px (Bold)
- **H2:** 24px / 32px (SemiBold)
- **H3:** 20px / 28px (SemiBold)
- **H4:** 18px / 24px (Medium)
- **Body:** 16px / 24px (Regular)
- **Small:** 14px / 20px (Regular)
- **Caption:** 12px / 16px (Regular)

### Espaciados

- **XS:** 4px
- **SM:** 8px
- **MD:** 16px
- **LG:** 24px
- **XL:** 32px
- **2XL:** 48px
- **3XL:** 64px

---

## 📄 Páginas del Sistema

1. **Login** ✅ Frame creado
2. **Dashboard** (importante - página principal)
3. **Permisos Operación** (Listar)
4. **Permiso Op. Crear/Editar** (Modal)
5. **Permisos Construcción**
6. **Solvencias**
7. **Reportes**
8. **Usuarios** (Admin)
9. **Configuración** (Admin)

### Breakpoints

- **Desktop:** 1280px
- **Tablet:** 768px
- **Mobile:** 375px

---

## 🧩 Componentes Base Requeridos

### Botones (5 variantes)
- Primary (Azul)
- Secondary (Gris)
- Danger (Rojo)
- Success (Verde)
- Disabled (Gris claro)

### Inputs (4 tipos + estados)
- Text
- Select
- Textarea
- Estados: Default, Focus, Error, Disabled

### Cards (3 tipos)
- Default
- KPI (4 colores: Azul, Verde, Naranja, Rojo)
- Hover

### Badges (4 tipos)
- Success (Verde)
- Warning (Naranja)
- Danger (Rojo)
- Info (Azul)

### Tables
- Header
- Rows
- Hover state
- Stripe (alternado)

### Modal
- Header
- Content
- Footer

---

## 🔗 Enlaces

**Figma File:**
https://figma.com/design/pFACdirtNEFvozkjP80YxM/01-Login-Deskt?node-id=0-1

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

- **Manual en Figma:** 6-8 horas
- **Con Node.js + Figma API:** 2h setup + 30min ejecución
- **Total proyecto completo:** 20 horas

---

## 📋 Próximas Acciones

1. Crear componentes base en Figma
2. Completar página de Login (Desktop, Tablet, Mobile)
3. Diseñar Dashboard completo
4. Continuar con páginas restantes
5. Agregar prototypes e interacciones
6. Exportar design tokens



