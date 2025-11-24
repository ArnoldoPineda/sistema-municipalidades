# Especificaciones Detalladas de Componentes

## 🎯 Guía de Uso

Este documento contiene las especificaciones exactas para crear cada componente en Figma. Sigue estas especificaciones pixel por pixel para mantener consistencia.

---

## 1. Botones

### Primary Button

**Dimensiones:**
- Height: `40px`
- Padding Horizontal: `24px`
- Padding Vertical: `12px`
- Border Radius: `8px`
- Min Width: `120px`

**Estilos:**
- Background: `#0066CC`
- Text Color: `#FFFFFF`
- Font: Inter Regular, `16px`, Line Height `24px`
- Border: None

**Estados:**
- **Default:** Background `#0066CC`
- **Hover:** Background `#0052A3`
- **Active:** Background `#004080`
- **Disabled:** Background `#E5E7EB`, Text `#9CA3AF`, Cursor `not-allowed`

**Variantes:**
- Small: Height `32px`, Padding `8px 16px`, Font `14px`
- Medium: Height `40px` (default)
- Large: Height `48px`, Padding `14px 32px`, Font `18px`

---

### Secondary Button

**Dimensiones:**
- Mismo que Primary Button

**Estilos:**
- Background: `Transparent`
- Text Color: `#6B7280`
- Border: `1px solid #E5E7EB`
- Font: Inter Regular, `16px`

**Estados:**
- **Default:** Transparent background
- **Hover:** Background `#F9FAFB`
- **Active:** Background `#F3F4F6`
- **Disabled:** Background `#F9FAFB`, Text `#9CA3AF`, Border `#E5E7EB`

---

### Danger Button

**Dimensiones:**
- Mismo que Primary Button

**Estilos:**
- Background: `#EF4444`
- Text Color: `#FFFFFF`
- Font: Inter Regular, `16px`

**Estados:**
- **Default:** Background `#EF4444`
- **Hover:** Background `#DC2626`
- **Active:** Background `#B91C1C`

---

### Success Button

**Dimensiones:**
- Mismo que Primary Button

**Estilos:**
- Background: `#10B981`
- Text Color: `#FFFFFF`
- Font: Inter Regular, `16px`

**Estados:**
- **Default:** Background `#10B981`
- **Hover:** Background `#059669`
- **Active:** Background `#047857`

---

### Disabled Button

**Dimensiones:**
- Mismo que Primary Button

**Estilos:**
- Background: `#E5E7EB`
- Text Color: `#9CA3AF`
- Font: Inter Regular, `16px`
- Cursor: `not-allowed`

---

## 2. Inputs

### Text Input

**Dimensiones:**
- Height: `40px`
- Width: `100%` (máx `400px`)
- Padding: `12px 16px`
- Border Radius: `8px`

**Estilos Base:**
- Background: `#FFFFFF`
- Border: `1px solid #E5E7EB`
- Text Color: `#000000`
- Font: Inter Regular, `16px`, Line Height `24px`
- Placeholder Color: `#9CA3AF`

**Estados:**
- **Default:**
  - Border: `#E5E7EB`
  - Background: `#FFFFFF`
  
- **Focus:**
  - Border: `#0066CC`
  - Outline: `2px solid #E6F2FF` (offset `0px`)
  - Background: `#FFFFFF`
  
- **Error:**
  - Border: `#EF4444`
  - Background: `#FFFFFF`
  - Text Error (debajo): `#EF4444`, Font `12px`
  
- **Disabled:**
  - Background: `#F9FAFB`
  - Border: `#E5E7EB`
  - Text: `#9CA3AF`
  - Cursor: `not-allowed`

**Mensaje de Error:**
- Position: Debajo del input
- Text: "Este campo es requerido" (o mensaje personalizado)
- Color: `#EF4444`
- Font: Inter Regular, `12px`
- Margin Top: `4px`

---

### Select Input

**Dimensiones:**
- Mismo que Text Input
- Padding Right: `40px` (para icono)

**Estilos:**
- Mismo que Text Input
- Icono dropdown: `20x20px`, Color `#6B7280`
- Position: Right `12px`, Center vertical

**Estados:**
- Mismo que Text Input

---

### Textarea

**Dimensiones:**
- Min Height: `100px`
- Width: `100%` (máx `600px`)
- Padding: `12px 16px`
- Border Radius: `8px`

**Estilos:**
- Mismo que Text Input
- Resize: Vertical only
- Font: Inter Regular, `16px`, Line Height `24px`

**Estados:**
- Mismo que Text Input

---

## 3. Cards

### Default Card

**Dimensiones:**
- Width: `100%` (flexible)
- Padding: `24px`
- Border Radius: `12px`

**Estilos:**
- Background: `#FFFFFF`
- Border: `1px solid #E5E7EB`
- Shadow: `0 1px 3px rgba(0, 0, 0, 0.1)`

**Auto Layout:**
- Direction: Vertical
- Padding: `24px`
- Gap: `16px`

---

### KPI Card

**Dimensiones:**
- Width: `280px`
- Height: `140px`
- Padding: `24px`
- Border Radius: `12px`

**Estilos Base:**
- Background: `#FFFFFF`
- Border: `1px solid #E5E7EB`
- Border Top: `4px solid` (color según variante)
- Shadow: `0 1px 3px rgba(0, 0, 0, 0.1)`

**Variantes de Color:**
- **Azul:** Border Top `#0066CC`
- **Verde:** Border Top `#10B981`
- **Naranja:** Border Top `#F59E0B`
- **Rojo:** Border Top `#EF4444`

**Contenido:**
- Título (arriba):
  - Font: Inter Regular, `14px`, Line Height `20px`
  - Color: `#6B7280`
  - Margin Bottom: `8px`
  
- Valor (centro):
  - Font: Inter SemiBold, `24px`, Line Height `32px`
  - Color: Mismo que border top
  - Margin Bottom: `8px`
  
- Indicador (abajo):
  - Font: Inter Regular, `12px`
  - Icono: `16x16px`
  - Color: `#6B7280`

**Auto Layout:**
- Direction: Vertical
- Padding: `24px`
- Gap: `8px`
- Alignment: Top Left

---

### Card Hover

**Dimensiones:**
- Mismo que Default Card

**Estilos:**
- Mismo que Default Card
- **Hover State:**
  - Shadow: `0 4px 12px rgba(0, 0, 0, 0.15)`
  - Transition: `0.2s ease`

---

## 4. Badges

### Badge Base

**Dimensiones:**
- Height: `24px`
- Padding: `4px 12px`
- Border Radius: `12px`
- Min Width: Auto

**Estilos Base:**
- Display: Inline-flex
- Font: Inter SemiBold, `12px`, Line Height `16px`
- Border: None

**Variantes:**

**Success Badge:**
- Background: `#D1FAE5`
- Text: `#065F46`

**Warning Badge:**
- Background: `#FEF3C7`
- Text: `#92400E`

**Danger Badge:**
- Background: `#FEE2E2`
- Text: `#991B1B`

**Info Badge:**
- Background: `#DBEAFE`
- Text: `#1E40AF`

**Auto Layout:**
- Direction: Horizontal
- Padding: `4px 12px`
- Gap: `4px` (si tiene icono)
- Alignment: Center

---

## 5. Tables

### Table Container

**Dimensiones:**
- Width: `100%`
- Border Radius: `8px`
- Overflow: Hidden

**Estilos:**
- Border: `1px solid #E5E7EB`
- Background: `#FFFFFF`

---

### Table Header

**Dimensiones:**
- Height: `48px`
- Padding: `12px 16px`

**Estilos:**
- Background: `#F9FAFB`
- Border Bottom: `1px solid #E5E7EB`
- Font: Inter SemiBold, `14px`, Line Height `20px`
- Text Color: `#6B7280`
- Text Align: Left (o Right para números)

**Auto Layout:**
- Direction: Horizontal
- Padding: `12px 16px`
- Gap: `16px`

---

### Table Row

**Dimensiones:**
- Min Height: `56px`
- Padding: `16px`

**Estilos Base:**
- Background: `#FFFFFF`
- Border Bottom: `1px solid #E5E7EB`
- Font: Inter Regular, `16px`, Line Height `24px`
- Text Color: `#000000`

**Estados:**
- **Default:** Background `#FFFFFF`
- **Hover:** Background `#F9FAFB`
- **Stripe (alternado):** Background `#FAFAFA`

**Auto Layout:**
- Direction: Horizontal
- Padding: `16px`
- Gap: `16px`
- Alignment: Center Vertical

---

### Table Cell

**Dimensiones:**
- Padding: `12px 16px`
- Flex: 1 (o width específico)

**Estilos:**
- Font: Inter Regular, `16px`
- Text Align: Left (Right para números)
- Text Color: `#000000`

---

## 6. Modal

### Modal Overlay

**Dimensiones:**
- Width: `100vw`
- Height: `100vh`
- Position: Fixed, Center

**Estilos:**
- Background: `rgba(0, 0, 0, 0.5)`
- Backdrop Filter: `blur(4px)` (opcional)

---

### Modal Container

**Dimensiones:**
- Width: `600px` (Desktop)
- Max Width: `90vw` (Mobile)
- Max Height: `80vh`
- Border Radius: `12px`

**Estilos:**
- Background: `#FFFFFF`
- Shadow: `0 20px 25px rgba(0, 0, 0, 0.15)`
- Overflow: Hidden

**Auto Layout:**
- Direction: Vertical
- Width: `600px`
- Max Height: `80vh`

---

### Modal Header

**Dimensiones:**
- Padding: `24px 24px 16px`
- Min Height: `64px`

**Estilos:**
- Border Bottom: `1px solid #E5E7EB`
- Background: `#FFFFFF`

**Contenido:**
- Título:
  - Font: Inter SemiBold, `20px`, Line Height `28px`
  - Color: `#000000`
  
- Botón Cerrar:
  - Size: `24x24px`
  - Color: `#6B7280`
  - Hover: `#000000`
  - Position: Absolute, Right `24px`, Top `24px`

**Auto Layout:**
- Direction: Horizontal
- Padding: `24px 24px 16px`
- Alignment: Space Between

---

### Modal Content

**Dimensiones:**
- Padding: `24px`
- Overflow: Auto

**Estilos:**
- Background: `#FFFFFF`

**Auto Layout:**
- Direction: Vertical
- Padding: `24px`
- Gap: `16px`
- Width: Fill Container

---

### Modal Footer

**Dimensiones:**
- Padding: `16px 24px 24px`
- Min Height: `72px`

**Estilos:**
- Border Top: `1px solid #E5E7EB`
- Background: `#FFFFFF`

**Contenido:**
- Botones alineados a la derecha
- Gap entre botones: `12px`

**Auto Layout:**
- Direction: Horizontal
- Padding: `16px 24px 24px`
- Gap: `12px`
- Alignment: Right

---

## 7. Header/Navbar

### Header Container

**Dimensiones:**
- Height: `64px`
- Width: `100%`
- Padding: `0 24px`

**Estilos:**
- Background: `#FFFFFF`
- Border Bottom: `1px solid #E5E7EB`
- Shadow: `0 1px 3px rgba(0, 0, 0, 0.1)`

**Auto Layout:**
- Direction: Horizontal
- Padding: `0 24px`
- Alignment: Space Between, Center Vertical

---

### Logo

**Dimensiones:**
- Height: `40px`
- Width: Auto

---

### Navigation

**Auto Layout:**
- Direction: Horizontal
- Gap: `24px`
- Alignment: Center

**Items:**
- Font: Inter Medium, `16px`
- Color: `#6B7280`
- Active Color: `#0066CC`
- Hover: `#0052A3`

---

### User Menu

**Dimensiones:**
- Height: `40px`
- Padding: `8px 12px`
- Border Radius: `8px`

**Estilos:**
- Background: `#F9FAFB`
- Hover: `#F3F4F6`

**Contenido:**
- Avatar: `24x24px`, Border Radius `50%`
- Nombre: Inter Medium, `14px`
- Icono dropdown: `16x16px`

---

## 8. Sidebar

### Sidebar Container

**Dimensiones:**
- Width: `240px`
- Height: `100vh`
- Padding: `24px 16px`

**Estilos:**
- Background: `#FFFFFF`
- Border Right: `1px solid #E5E7EB`

**Auto Layout:**
- Direction: Vertical
- Padding: `24px 16px`
- Gap: `24px`

---

### Sidebar Logo

**Dimensiones:**
- Height: `32px`
- Margin Bottom: `24px`

---

### Sidebar Menu

**Auto Layout:**
- Direction: Vertical
- Gap: `4px`
- Width: Fill Container

---

### Menu Item

**Dimensiones:**
- Height: `40px`
- Padding: `8px 12px`
- Border Radius: `8px`

**Estilos:**
- Font: Inter Medium, `14px`
- Color: `#6B7280`
- Background: Transparent

**Estados:**
- **Default:** Transparent
- **Hover:** Background `#F9FAFB`
- **Active:** Background `#E6F2FF`, Color `#0066CC`

**Auto Layout:**
- Direction: Horizontal
- Padding: `8px 12px`
- Gap: `12px`
- Alignment: Left, Center Vertical

---

## 9. Footer

### Footer Container

**Dimensiones:**
- Height: `80px`
- Width: `100%`
- Padding: `24px`

**Estilos:**
- Background: `#F9FAFB`
- Border Top: `1px solid #E5E7EB`

**Auto Layout:**
- Direction: Horizontal
- Padding: `24px`
- Alignment: Space Between, Center Vertical

---

### Footer Text

**Estilos:**
- Font: Inter Regular, `14px`
- Color: `#6B7280`

---

## 📐 Espaciados del Sistema

Usa estos valores consistentemente:

- **XS:** `4px`
- **SM:** `8px`
- **MD:** `16px`
- **LG:** `24px`
- **XL:** `32px`
- **2XL:** `48px`
- **3XL:** `64px`

---

## 🎨 Colores del Sistema

### Primarios
- `#0066CC` - Azul Principal
- `#0052A3` - Azul Hover
- `#E6F2FF` - Azul Fondo

### Estados
- `#10B981` - Verde (Éxito)
- `#F59E0B` - Naranja (Advertencia)
- `#EF4444` - Rojo (Error)

### Neutros
- `#6B7280` - Gris Texto
- `#E5E7EB` - Gris Bordes
- `#F9FAFB` - Gris Fondo
- `#FFFFFF` - Blanco

---

## ✅ Checklist de Componentes

Al crear cada componente, verifica:

- [ ] Dimensiones exactas
- [ ] Colores correctos
- [ ] Tipografía correcta
- [ ] Estados (Default, Hover, Active, Disabled)
- [ ] Auto Layout configurado
- [ ] Constraints configurados
- [ ] Variantes creadas (si aplica)
- [ ] Component Properties configuradas
- [ ] Nombre descriptivo



