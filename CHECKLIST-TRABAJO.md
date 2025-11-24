# Checklist de Trabajo - Sistema Municipal Figma

## 📋 Orden Recomendado de Trabajo

Sigue este orden para trabajar de manera eficiente en Figma.

---

## FASE 1: Configuración Base (30 min)

### ✅ Design System Setup

- [ ] **Variables de Color**
  - [ ] Crear modo "Light"
  - [ ] Agregar Primary (Base, Hover, Background)
  - [ ] Agregar Success, Warning, Danger
  - [ ] Agregar Neutral (Text, Border, Background, White)

- [ ] **Estilos de Texto**
  - [ ] H1 (32px, Bold, 40px line-height)
  - [ ] H2 (24px, SemiBold, 32px line-height)
  - [ ] H3 (20px, SemiBold, 28px line-height)
  - [ ] H4 (18px, Medium, 24px line-height)
  - [ ] Body (16px, Regular, 24px line-height)
  - [ ] Small (14px, Regular, 20px line-height)
  - [ ] Caption (12px, Regular, 16px line-height)

- [ ] **Estructura de Carpetas**
  - [ ] Crear página "Design System"
  - [ ] Carpeta "Colors"
  - [ ] Carpeta "Typography"
  - [ ] Carpeta "Spacing"
  - [ ] Carpeta "Components"
  - [ ] Carpeta "Icons"

---

## FASE 2: Componentes Base (2-3 horas)

### ✅ Botones

- [ ] **Button/Primary**
  - [ ] Crear frame 120x40px
  - [ ] Auto Layout horizontal
  - [ ] Padding 12px 24px
  - [ ] Border radius 8px
  - [ ] Fondo #0066CC
  - [ ] Texto blanco, Body
  - [ ] Crear variante Hover (#0052A3)
  - [ ] Crear variante Disabled
  - [ ] Convertir a Component

- [ ] **Button/Secondary**
  - [ ] Mismo tamaño que Primary
  - [ ] Fondo transparente
  - [ ] Borde 1px #E5E7EB
  - [ ] Texto #6B7280
  - [ ] Variantes Hover y Disabled
  - [ ] Convertir a Component

- [ ] **Button/Danger**
  - [ ] Fondo #EF4444
  - [ ] Variante Hover
  - [ ] Convertir a Component

- [ ] **Button/Success**
  - [ ] Fondo #10B981
  - [ ] Variante Hover
  - [ ] Convertir a Component

- [ ] **Button/Disabled**
  - [ ] Fondo #E5E7EB
  - [ ] Texto #9CA3AF
  - [ ] Convertir a Component

---

### ✅ Inputs

- [ ] **Input/Text**
  - [ ] Crear frame 400x40px
  - [ ] Padding 12px 16px
  - [ ] Border radius 8px
  - [ ] Borde 1px #E5E7EB
  - [ ] Fondo blanco
  - [ ] Crear variante Focus (borde #0066CC, outline)
  - [ ] Crear variante Error (borde #EF4444 + mensaje)
  - [ ] Crear variante Disabled
  - [ ] Convertir a Component

- [ ] **Input/Select**
  - [ ] Mismo que Text
  - [ ] Agregar icono dropdown (derecha)
  - [ ] Padding right 40px
  - [ ] Variantes Focus, Error, Disabled
  - [ ] Convertir a Component

- [ ] **Input/Textarea**
  - [ ] Frame 400x100px (min height)
  - [ ] Mismo estilo que Text
  - [ ] Variantes Focus, Error, Disabled
  - [ ] Convertir a Component

---

### ✅ Cards

- [ ] **Card/Default**
  - [ ] Frame flexible
  - [ ] Padding 24px
  - [ ] Border radius 12px
  - [ ] Borde 1px #E5E7EB
  - [ ] Sombra sutil
  - [ ] Auto Layout vertical
  - [ ] Convertir a Component

- [ ] **Card/KPI**
  - [ ] Frame 280x140px
  - [ ] Padding 24px
  - [ ] Border radius 12px
  - [ ] Borde superior 4px
  - [ ] Crear 4 variantes (Azul, Verde, Naranja, Rojo)
  - [ ] Agregar título, valor, indicador
  - [ ] Convertir a Component

- [ ] **Card/Hover**
  - [ ] Mismo que Default
  - [ ] Agregar estado Hover (sombra más fuerte)
  - [ ] Convertir a Component

---

### ✅ Badges

- [ ] **Badge/Success**
  - [ ] Frame auto-width, height 24px
  - [ ] Padding 4px 12px
  - [ ] Border radius 12px
  - [ ] Fondo #D1FAE5
  - [ ] Texto #065F46, Caption, SemiBold
  - [ ] Convertir a Component

- [ ] **Badge/Warning**
  - [ ] Fondo #FEF3C7
  - [ ] Texto #92400E
  - [ ] Convertir a Component

- [ ] **Badge/Danger**
  - [ ] Fondo #FEE2E2
  - [ ] Texto #991B1B
  - [ ] Convertir a Component

- [ ] **Badge/Info**
  - [ ] Fondo #DBEAFE
  - [ ] Texto #1E40AF
  - [ ] Convertir a Component

---

### ✅ Tables

- [ ] **Table/Container**
  - [ ] Frame flexible
  - [ ] Border radius 8px
  - [ ] Borde 1px #E5E7EB
  - [ ] Overflow hidden

- [ ] **Table/Header**
  - [ ] Frame height 48px
  - [ ] Padding 12px 16px
  - [ ] Fondo #F9FAFB
  - [ ] Borde inferior 1px
  - [ ] Texto Small, SemiBold, #6B7280
  - [ ] Auto Layout horizontal
  - [ ] Convertir a Component

- [ ] **Table/Row**
  - [ ] Frame min-height 56px
  - [ ] Padding 16px
  - [ ] Borde inferior 1px
  - [ ] Texto Body
  - [ ] Crear variante Hover
  - [ ] Crear variante Stripe
  - [ ] Convertir a Component

---

### ✅ Modal

- [ ] **Modal/Container**
  - [ ] Frame 600px width
  - [ ] Max height 80vh
  - [ ] Border radius 12px
  - [ ] Sombra fuerte
  - [ ] Auto Layout vertical

- [ ] **Modal/Header**
  - [ ] Padding 24px 24px 16px
  - [ ] Borde inferior 1px
  - [ ] Título H3
  - [ ] Botón cerrar (derecha)
  - [ ] Convertir a Component

- [ ] **Modal/Content**
  - [ ] Padding 24px
  - [ ] Overflow auto
  - [ ] Convertir a Component

- [ ] **Modal/Footer**
  - [ ] Padding 16px 24px 24px
  - [ ] Borde superior 1px
  - [ ] Botones alineados derecha
  - [ ] Convertir a Component

- [ ] **Modal/Overlay**
  - [ ] Frame 100vw x 100vh
  - [ ] Fondo rgba(0,0,0,0.5)
  - [ ] Convertir a Component

---

### ✅ Layout Components

- [ ] **Header/Navbar**
  - [ ] Frame height 64px
  - [ ] Padding 0 24px
  - [ ] Borde inferior 1px
  - [ ] Logo, Navegación, Usuario
  - [ ] Auto Layout horizontal
  - [ ] Convertir a Component

- [ ] **Sidebar**
  - [ ] Frame width 240px
  - [ ] Padding 24px 16px
  - [ ] Borde derecho 1px
  - [ ] Logo, Menú
  - [ ] Auto Layout vertical
  - [ ] Convertir a Component

- [ ] **Footer**
  - [ ] Frame height 80px
  - [ ] Padding 24px
  - [ ] Fondo #F9FAFB
  - [ ] Borde superior 1px
  - [ ] Convertir a Component

---

## FASE 3: Páginas (12-15 horas)

### ✅ 1. Login

- [ ] **Desktop (1280x720)**
  - [ ] Frame 1280x720
  - [ ] Card centrado 400px
  - [ ] Logo arriba
  - [ ] Título "Iniciar Sesión"
  - [ ] Input Usuario
  - [ ] Input Contraseña
  - [ ] Botón Primary "Iniciar Sesión"
  - [ ] Link "¿Olvidaste tu contraseña?"

- [ ] **Tablet (768x1024)**
  - [ ] Adaptar card (90% width, max 400px)
  - [ ] Ajustar espaciados

- [ ] **Mobile (375x667)**
  - [ ] Card full width
  - [ ] Padding lateral 24px
  - [ ] Inputs y botón full width

---

### ✅ 2. Dashboard

- [ ] **Desktop (1280x720)**
  - [ ] Frame 1280x720
  - [ ] Header completo
  - [ ] Sidebar completo
  - [ ] Main content:
    - [ ] Título "Dashboard"
    - [ ] 4 KPI Cards (grid 2x2)
    - [ ] Gráfico/Chart placeholder
    - [ ] Tabla últimos registros
  - [ ] Footer

- [ ] **Tablet (768x1024)**
  - [ ] Sidebar colapsable
  - [ ] KPI Cards 2 columnas
  - [ ] Tabla scroll horizontal

- [ ] **Mobile (375x667)**
  - [ ] Sidebar oculto (hamburger)
  - [ ] KPI Cards 1 columna
  - [ ] Tabla convertida a cards

---

### ✅ 3. Permisos Operación (Listar)

- [ ] **Desktop (1280x720)**
  - [ ] Header + Sidebar
  - [ ] Título + Botón "Nuevo Permiso"
  - [ ] Filtros (Búsqueda, Estado, Fecha)
  - [ ] Tabla completa con columnas
  - [ ] Paginación

- [ ] **Tablet (768x1024)**
  - [ ] Filtros en acordeón
  - [ ] Tabla scroll horizontal

- [ ] **Mobile (375x667)**
  - [ ] Filtros colapsables
  - [ ] Tabla convertida a cards

---

### ✅ 4. Permiso Op. Crear/Editar (Modal)

- [ ] **Modal Completo**
  - [ ] Overlay
  - [ ] Container 600px
  - [ ] Header con título y cerrar
  - [ ] Content con formulario:
    - [ ] Select Tipo
    - [ ] Input Solicitante
    - [ ] Textarea Descripción
    - [ ] Date Fecha Inicio
    - [ ] Date Fecha Fin
    - [ ] File Upload Documentos
  - [ ] Footer con botones Cancelar y Guardar

---

### ✅ 5. Permisos Construcción

- [ ] **Desktop, Tablet, Mobile**
  - [ ] Similar a Permisos Operación
  - [ ] Campos específicos construcción
  - [ ] Tabla con columnas apropiadas

---

### ✅ 6. Solvencias

- [ ] **Desktop, Tablet, Mobile**
  - [ ] Header + Sidebar
  - [ ] Título + Botón "Nueva Solvencia"
  - [ ] Filtros (RUC/DNI, Estado)
  - [ ] Tabla con columnas
  - [ ] Modal crear/editar

---

### ✅ 7. Reportes

- [ ] **Desktop, Tablet, Mobile**
  - [ ] Header + Sidebar
  - [ ] Select Tipo de Reporte
  - [ ] Date Range Picker
  - [ ] Botón "Generar Reporte"
  - [ ] Área de visualización
  - [ ] Botones descargar (PDF, Excel)

---

### ✅ 8. Usuarios (Admin)

- [ ] **Desktop, Tablet, Mobile**
  - [ ] Header + Sidebar
  - [ ] Título + Botón "Nuevo Usuario"
  - [ ] Filtros (Búsqueda, Rol, Estado)
  - [ ] Tabla usuarios
  - [ ] Modal crear/editar usuario

---

### ✅ 9. Configuración (Admin)

- [ ] **Desktop, Tablet, Mobile**
  - [ ] Header + Sidebar
  - [ ] Sección Información Municipal
  - [ ] Sección Tipos de Permisos
  - [ ] Sección Configuración General
  - [ ] Formularios y botones guardar

---

## FASE 4: Prototypes (2-3 horas)

### ✅ Interacciones Básicas

- [ ] **Navegación**
  - [ ] Login → Dashboard (click botón)
  - [ ] Sidebar items → Cambio de página
  - [ ] Header navegación → Cambio de página

- [ ] **Modales**
  - [ ] Botón "Nuevo" → Abre modal
  - [ ] Click overlay o cerrar → Cierra modal
  - [ ] Botón "Guardar" → Cierra modal

- [ ] **Formularios**
  - [ ] Inputs Focus states
  - [ ] Validación Error states
  - [ ] Botones Hover states

- [ ] **Tablas**
  - [ ] Hover en filas
  - [ ] Click en acciones (Ver, Editar, Eliminar)
  - [ ] Paginación

- [ ] **Cards**
  - [ ] Hover effects
  - [ ] Click en KPI cards

---

## FASE 5: Revisión Final (1 hora)

### ✅ Checklist de Calidad

- [ ] Todos los componentes tienen variantes correctas
- [ ] Todos los estados están implementados
- [ ] Colores usan Variables
- [ ] Textos usan Estilos de Texto
- [ ] Auto Layout configurado correctamente
- [ ] Constraints configurados
- [ ] Nombres descriptivos y consistentes
- [ ] Responsive funciona en los 3 breakpoints
- [ ] Prototypes funcionan correctamente
- [ ] Sin elementos hardcodeados (usar variables/styles)

---

## 📊 Progreso Total

**Componentes:** 0/9 secciones completadas
**Páginas:** 0/9 páginas completadas
**Prototypes:** 0/4 secciones completadas

---

## 💡 Tips

- Trabaja componente por componente
- Usa Auto Layout siempre
- Crea variantes para estados
- Prueba en diferentes tamaños
- Documenta componentes complejos
- Mantén nombres consistentes

---

**Última actualización:** Al completar cada tarea, marca el checkbox ✅



