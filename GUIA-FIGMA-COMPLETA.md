# Guía Completa para Diseño en Figma

## 📋 Índice

1. [Configuración Inicial](#configuración-inicial)
2. [Crear Design System](#crear-design-system)
3. [Componentes Base](#componentes-base)
4. [Páginas del Sistema](#páginas-del-sistema)
5. [Responsive Design](#responsive-design)
6. [Prototypes](#prototypes)

---

## 🚀 Configuración Inicial

### 1. Configurar Variables de Color

1. Abre el panel **Design** → **Variables**
2. Crea un **modo de color** llamado "Light"
3. Agrega las siguientes variables:

```
Colors:
├── Primary
│   ├── Base: #0066CC
│   └── Hover: #0052A3
├── Background
│   ├── Primary: #FFFFFF
│   ├── Secondary: #F9FAFB
│   └── Accent: #E6F2FF
├── Text
│   ├── Primary: #000000
│   └── Secondary: #6B7280
├── Border: #E5E7EB
├── Success: #10B981
├── Warning: #F59E0B
└── Danger: #EF4444
```

### 2. Configurar Tipografía

1. Crea un **estilo de texto** para cada variante:
   - **H1:** Inter Bold, 32px, Line Height 40px
   - **H2:** Inter SemiBold, 24px, Line Height 32px
   - **H3:** Inter SemiBold, 20px, Line Height 28px
   - **H4:** Inter Medium, 18px, Line Height 24px
   - **Body:** Inter Regular, 16px, Line Height 24px
   - **Small:** Inter Regular, 14px, Line Height 20px
   - **Caption:** Inter Regular, 12px, Line Height 16px

### 3. Configurar Espaciados

Crea un **estilo de efecto** o usa **Auto Layout** con estos valores:
- 4px, 8px, 16px, 24px, 32px, 48px, 64px

---

## 🎨 Crear Design System

### Estructura de Carpetas en Figma

```
📁 Design System
  📁 Colors
  📁 Typography
  📁 Spacing
  📁 Components
    📁 Buttons
    📁 Inputs
    📁 Cards
    📁 Badges
    📁 Tables
    📁 Modal
  📁 Icons
```

---

## 🧩 Componentes Base

### 1. Botones

#### Primary Button
- **Tamaño:** Height 40px, Padding horizontal 24px
- **Fondo:** #0066CC
- **Texto:** Blanco, Body (16px)
- **Border Radius:** 8px
- **Estados:**
  - Default: #0066CC
  - Hover: #0052A3
  - Active: #004080
  - Disabled: #E5E7EB (texto #9CA3AF)

#### Secondary Button
- Mismo tamaño que Primary
- **Fondo:** Transparente
- **Borde:** 1px solid #E5E7EB
- **Texto:** #6B7280
- **Hover:** Fondo #F9FAFB

#### Danger Button
- Mismo tamaño que Primary
- **Fondo:** #EF4444
- **Texto:** Blanco
- **Hover:** #DC2626

#### Success Button
- Mismo tamaño que Primary
- **Fondo:** #10B981
- **Texto:** Blanco
- **Hover:** #059669

#### Disabled Button
- Mismo tamaño que Primary
- **Fondo:** #E5E7EB
- **Texto:** #9CA3AF
- **Cursor:** not-allowed

**Configurar como Component:**
- Crear variantes para cada tipo
- Agregar propiedades: Type (Primary, Secondary, Danger, Success, Disabled)
- Agregar propiedades: Size (Small, Medium, Large) - opcional

---

### 2. Inputs

#### Text Input
- **Tamaño:** Height 40px, Width 100% (máx 400px)
- **Padding:** 12px 16px
- **Borde:** 1px solid #E5E7EB
- **Border Radius:** 8px
- **Fondo:** #FFFFFF
- **Texto:** Body (16px)
- **Placeholder:** #9CA3AF

**Estados:**
- **Default:** Borde #E5E7EB
- **Focus:** Borde #0066CC, Outline 2px solid #E6F2FF
- **Error:** Borde #EF4444, Texto error debajo
- **Disabled:** Fondo #F9FAFB, Borde #E5E7EB, Texto #9CA3AF

#### Select Input
- Mismo estilo que Text Input
- Agregar icono de dropdown (chevron-down) a la derecha
- Padding derecho: 40px

#### Textarea
- **Tamaño:** Min height 100px, Width 100%
- Mismo estilo que Text Input
- Resize vertical habilitado

**Configurar como Component:**
- Variantes: Type (Text, Select, Textarea)
- Variantes: State (Default, Focus, Error, Disabled)

---

### 3. Cards

#### Default Card
- **Padding:** 24px
- **Fondo:** #FFFFFF
- **Borde:** 1px solid #E5E7EB
- **Border Radius:** 12px
- **Sombra:** 0 1px 3px rgba(0,0,0,0.1)

#### KPI Card
- Mismo estilo que Default Card
- **Tamaño:** Width 280px, Height 140px
- **Variantes de color:**
  - Azul: Borde superior 4px #0066CC
  - Verde: Borde superior 4px #10B981
  - Naranja: Borde superior 4px #F59E0B
  - Rojo: Borde superior 4px #EF4444

**Contenido KPI:**
- Título (Small, #6B7280)
- Valor (H2, color del borde)
- Cambio/Indicador (Caption, con icono)

#### Card Hover
- Mismo estilo que Default Card
- **Hover:** Sombra 0 4px 12px rgba(0,0,0,0.15)
- **Transición:** 0.2s ease

---

### 4. Badges

#### Badge Base
- **Height:** 24px
- **Padding:** 4px 12px
- **Border Radius:** 12px
- **Texto:** Caption (12px, Bold)
- **Display:** Inline-flex

**Variantes:**
- **Success:** Fondo #D1FAE5, Texto #065F46
- **Warning:** Fondo #FEF3C7, Texto #92400E
- **Danger:** Fondo #FEE2E2, Texto #991B1B
- **Info:** Fondo #DBEAFE, Texto #1E40AF

---

### 5. Tables

#### Table Structure
- **Width:** 100%
- **Borde:** 1px solid #E5E7EB
- **Border Radius:** 8px
- **Overflow:** Hidden

#### Table Header
- **Fondo:** #F9FAFB
- **Padding:** 12px 16px
- **Texto:** Small (14px, SemiBold, #6B7280)
- **Borde inferior:** 1px solid #E5E7EB

#### Table Row
- **Padding:** 16px
- **Borde inferior:** 1px solid #E5E7EB
- **Texto:** Body (16px)

**Estados:**
- **Default:** Fondo #FFFFFF
- **Hover:** Fondo #F9FAFB
- **Stripe (alternado):** Fondo #FAFAFA

#### Table Cell
- **Padding:** 12px 16px
- **Alineación:** Izquierda (texto), Derecha (números)

---

### 6. Modal

#### Modal Container
- **Width:** 600px (Desktop), 90% (Mobile)
- **Max Height:** 80vh
- **Fondo:** #FFFFFF
- **Border Radius:** 12px
- **Sombra:** 0 20px 25px rgba(0,0,0,0.15)
- **Overlay:** Fondo negro 50% opacidad

#### Modal Header
- **Padding:** 24px 24px 16px
- **Borde inferior:** 1px solid #E5E7EB
- **Título:** H3 (20px)
- **Botón cerrar:** Icono X, 24x24px, #6B7280

#### Modal Content
- **Padding:** 24px
- **Overflow:** Auto

#### Modal Footer
- **Padding:** 16px 24px 24px
- **Borde superior:** 1px solid #E5E7EB
- **Botones:** Alineados a la derecha, gap 12px

---

## 📄 Páginas del Sistema

### Estructura de Frames

```
📁 Pages
  📁 01-Login
    ├── Desktop (1280x720)
    ├── Tablet (768x1024)
    └── Mobile (375x667)
  📁 02-Dashboard
    ├── Desktop (1280x720)
    ├── Tablet (768x1024)
    └── Mobile (375x667)
  ... (repetir para cada página)
```

### 1. Login Page

**Desktop (1280x720):**
- Layout centrado
- Card de login: 400px width
- Logo arriba
- Título "Iniciar Sesión"
- Inputs: Usuario, Contraseña
- Botón "Iniciar Sesión" (Primary)
- Link "¿Olvidaste tu contraseña?"

**Tablet (768x1024):**
- Card: 90% width, max 400px
- Mismo layout, más espaciado vertical

**Mobile (375x667):**
- Card: 100% width, padding lateral 24px
- Inputs full width
- Botón full width

---

### 2. Dashboard

**Desktop (1280x720):**
- **Header:** Logo, Navegación, Usuario
- **Sidebar:** Menú lateral (240px width)
- **Main Content:**
  - Título "Dashboard"
  - 4 KPI Cards (grid 2x2)
  - Gráfico/Chart (ancho completo)
  - Tabla de últimos registros
- **Footer:** Información municipal

**Tablet (768x1024):**
- Sidebar colapsable (hamburger menu)
- KPI Cards: 2 columnas
- Tabla scroll horizontal

**Mobile (375x667):**
- Sidebar oculto (menú hamburger)
- KPI Cards: 1 columna
- Tabla: Cards individuales

---

### 3. Permisos Operación (Listar)

**Desktop:**
- Header con título y botón "Nuevo Permiso"
- Filtros: Búsqueda, Estado, Fecha
- Tabla con columnas:
  - Número
  - Solicitante
  - Tipo
  - Fecha
  - Estado (Badge)
  - Acciones (Ver, Editar, Eliminar)

**Tablet/Mobile:**
- Filtros en acordeón
- Tabla convertida a cards

---

### 4. Permiso Op. Crear/Editar (Modal)

**Contenido del Modal:**
- Formulario con campos:
  - Tipo de permiso (Select)
  - Solicitante (Text)
  - Descripción (Textarea)
  - Fecha inicio (Date)
  - Fecha fin (Date)
  - Documentos adjuntos
- Botones: Cancelar (Secondary), Guardar (Primary)

---

### 5-9. Resto de Páginas

Seguir estructura similar:
- Header consistente
- Navegación clara
- Contenido principal
- Acciones visibles

---

## 📱 Responsive Design

### Auto Layout

Usa **Auto Layout** para todos los componentes:
- **Direction:** Vertical u Horizontal según corresponda
- **Padding:** Usar valores del sistema (4, 8, 16, 24, 32px)
- **Gap:** 8px, 16px, 24px
- **Constraints:** 
  - Desktop: Fixed
  - Tablet: Hug contents
  - Mobile: Fill container

### Constraints

- **Desktop:** Left & Right, Top & Bottom
- **Tablet:** Left & Right, Top
- **Mobile:** Left & Right, Top

### Breakpoints

Crear variantes de componentes para cada breakpoint:
- Usar **Component Properties** para variantes
- O crear frames separados para cada tamaño

---

## 🎬 Prototypes

### Interacciones Básicas

1. **Login → Dashboard:**
   - Click en botón "Iniciar Sesión"
   - Transición: Instant o Smart Animate

2. **Navegación:**
   - Click en items del menú
   - Cambio de página

3. **Modal:**
   - Click en botón "Nuevo"
   - Abre modal (Overlay + Modal)
   - Click en "Cerrar" o overlay
   - Cierra modal

4. **Tabla:**
   - Hover en filas
   - Click en acciones

### Configuración de Prototype

- **Trigger:** On Click
- **Action:** Navigate to
- **Animation:** Smart Animate (300ms ease-in-out)
- **Overlay:** Para modales

---

## ✅ Checklist de Componentes

- [ ] Botones (5 variantes)
- [ ] Inputs (Text, Select, Textarea + estados)
- [ ] Cards (Default, KPI x4, Hover)
- [ ] Badges (4 tipos)
- [ ] Tables (Header, Rows, estados)
- [ ] Modal (Header, Content, Footer)
- [ ] Header/Navbar
- [ ] Sidebar
- [ ] Footer

---

## ✅ Checklist de Páginas

- [ ] Login (Desktop, Tablet, Mobile)
- [ ] Dashboard (Desktop, Tablet, Mobile)
- [ ] Permisos Operación Listar (Desktop, Tablet, Mobile)
- [ ] Permiso Op. Crear/Editar Modal
- [ ] Permisos Construcción (Desktop, Tablet, Mobile)
- [ ] Solvencias (Desktop, Tablet, Mobile)
- [ ] Reportes (Desktop, Tablet, Mobile)
- [ ] Usuarios Admin (Desktop, Tablet, Mobile)
- [ ] Configuración Admin (Desktop, Tablet, Mobile)

---

## 💡 Tips y Mejores Prácticas

1. **Nombrado:** Usar convención clara
   - Componentes: `Button/Primary`
   - Páginas: `01-Login/Desktop`

2. **Auto Layout:** Usar siempre que sea posible

3. **Variants:** Agrupar variantes relacionadas

4. **Styles:** Crear estilos reutilizables para colores y texto

5. **Components:** Hacer componentes de todo lo reutilizable

6. **Frames:** Usar frames con nombres descriptivos

7. **Organización:** Mantener estructura de carpetas clara

8. **Comentarios:** Agregar notas en elementos complejos

---

## 🔗 Recursos

- [Figma File](https://figma.com/design/pFACdirtNEFvozkjP80YxM/01-Login-Deskt?node-id=0-1)
- [Figma Auto Layout Guide](https://help.figma.com/hc/en-us/articles/5731384052759)
- [Figma Components Guide](https://help.figma.com/hc/en-us/articles/5579474826519)



