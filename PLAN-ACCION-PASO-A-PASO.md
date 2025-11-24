# 🎯 Plan de Acción - Paso a Paso

## 📍 Estado Actual
- ✅ Frame "01-Login-Desktop" creado en Figma
- ✅ Documentación completa lista
- ❌ Falta configurar Design System
- ❌ Falta crear componentes base
- ❌ Falta completar páginas

---

## 🚀 PASO 1: Configurar Design System en Figma (30 min)

### 1.1 Abrir Figma
1. Ve a: https://figma.com/design/pFACdirtNEFvozkjP80YxM/01-Login-Deskt?node-id=0-1
2. Asegúrate de estar en tu archivo

### 1.2 Crear Variables de Color
1. Click en el panel izquierdo en **"Design"** (icono de paleta)
2. Click en **"Variables"** (icono de variables)
3. Click en **"+"** para crear nueva colección
4. Nómbrala: **"Design System"**
5. Click en **"+"** junto a "Colors" para agregar variables:

**Agregar estas variables una por una:**

```
Primary/Base: #0066CC
Primary/Hover: #0052A3
Primary/Background: #E6F2FF
Success: #10B981
Warning: #F59E0B
Danger: #EF4444
Neutral/Text: #6B7280
Neutral/Border: #E5E7EB
Neutral/Background: #F9FAFB
Background/White: #FFFFFF
Background/Black: #000000
```

**Cómo agregar cada variable:**
- Click en **"+"** junto a Colors
- Escribe el nombre (ej: "Primary/Base")
- Click en el color y pega el hex (ej: #0066CC)
- Repite para cada color

### 1.3 Crear Estilos de Texto
1. En el panel izquierdo, click en **"Text"** (icono de T)
2. Click en los **"..."** (menú) → **"Create text style"**

**Crear estos estilos uno por uno:**

```
H1:
- Nombre: "H1/Heading"
- Font: Inter (o System UI si no tienes Inter)
- Size: 32px
- Weight: Bold (700)
- Line Height: 40px

H2:
- Nombre: "H2/Heading"
- Font: Inter
- Size: 24px
- Weight: SemiBold (600)
- Line Height: 32px

H3:
- Nombre: "H3/Heading"
- Font: Inter
- Size: 20px
- Weight: SemiBold (600)
- Line Height: 28px

H4:
- Nombre: "H4/Heading"
- Font: Inter
- Size: 18px
- Weight: Medium (500)
- Line Height: 24px

Body:
- Nombre: "Body/Regular"
- Font: Inter
- Size: 16px
- Weight: Regular (400)
- Line Height: 24px

Small:
- Nombre: "Small/Regular"
- Font: Inter
- Size: 14px
- Weight: Regular (400)
- Line Height: 20px

Caption:
- Nombre: "Caption/Regular"
- Font: Inter
- Size: 12px
- Weight: Regular (400)
- Line Height: 16px
```

### 1.4 Crear Estructura de Carpetas
1. En el panel izquierdo, click derecho en la página actual
2. Click en **"Add page"**
3. Nómbrala: **"Design System"**
4. Dentro de esta página, crea frames para organizar:

**Crea estos frames (usa F para crear frame):**
- Frame "Colors" (para mostrar los colores)
- Frame "Typography" (para mostrar los textos)
- Frame "Components" (aquí irán los componentes)

---

## 🧩 PASO 2: Crear Primer Componente - Botón Primary (15 min)

### 2.1 Crear el Botón
1. Ve a la página "Design System" → Frame "Components"
2. Presiona **R** (Rectangle tool) o **F** (Frame tool)
3. Crea un frame de **120px de ancho x 40px de alto**
4. Click derecho en el frame → **"Add Auto Layout"**
5. Configura Auto Layout:
   - **Direction:** Horizontal
   - **Padding:** 12px (top/bottom) y 24px (left/right)
   - **Gap:** 0px
   - **Alignment:** Center

### 2.2 Agregar Texto
1. Presiona **T** (Text tool)
2. Escribe: **"Button"**
3. Selecciona el texto y aplica:
   - Estilo: **"Body/Regular"** (que creaste antes)
   - Color: **#FFFFFF** (blanco)
   - Alineación: Center

### 2.3 Estilizar el Botón
1. Selecciona el frame del botón
2. En el panel derecho:
   - **Fill:** #0066CC (o usa la variable Primary/Base)
   - **Corner Radius:** 8px
   - **Stroke:** None

### 2.4 Convertir a Componente
1. Selecciona el frame completo del botón
2. Presiona **Ctrl+Alt+K** (Windows) o **Cmd+Option+K** (Mac)
3. O click derecho → **"Create Component"**
4. Nómbralo: **"Button/Primary"**

### 2.5 Crear Variante Hover
1. Selecciona el componente que acabas de crear
2. Click derecho → **"Add Variant"**
3. En el panel derecho, cambia:
   - **Fill:** #0052A3 (Primary/Hover)
4. Nombra la variante: **"Hover"**

**¡Felicidades! Ya tienes tu primer componente con variante.**

---

## 📄 PASO 3: Completar Página de Login (30 min)

### 3.1 Ir al Frame Existente
1. Ve a la página donde está "01-Login-Desktop"
2. Selecciona el frame (debería ser 1280x720)

### 3.2 Crear Card de Login
1. Presiona **F** (Frame tool)
2. Crea un frame de **400px de ancho**
3. Click derecho → **"Add Auto Layout"**
4. Configura:
   - **Direction:** Vertical
   - **Padding:** 32px (todos los lados)
   - **Gap:** 24px
   - **Alignment:** Center
5. Estiliza:
   - **Fill:** #FFFFFF
   - **Corner Radius:** 12px
   - **Stroke:** 1px, #E5E7EB
   - **Effects:** Shadow (0, 1, 3px, rgba(0,0,0,0.1))

### 3.3 Agregar Contenido
Dentro del card, agrega (de arriba hacia abajo):

1. **Logo** (opcional por ahora, puedes usar un placeholder)
   - Frame 80x80px, fondo gris claro

2. **Título "Iniciar Sesión"**
   - Text tool (T)
   - Estilo: **"H2/Heading"**
   - Color: #000000
   - Alineación: Center

3. **Input Usuario**
   - Frame 100% width, 40px height
   - Auto Layout vertical
   - Padding: 12px 16px
   - Border: 1px, #E5E7EB
   - Corner Radius: 8px
   - Agrega placeholder: "Usuario"

4. **Input Contraseña**
   - Mismo estilo que Input Usuario
   - Placeholder: "Contraseña"

5. **Botón "Iniciar Sesión"**
   - Usa el componente **Button/Primary** que creaste
   - Cambia el texto a "Iniciar Sesión"
   - Width: 100%

6. **Link "¿Olvidaste tu contraseña?"**
   - Text tool
   - Estilo: **"Small/Regular"**
   - Color: #0066CC
   - Alineación: Center

### 3.4 Centrar el Card
1. Selecciona el frame del card
2. En el panel derecho, configura **Constraints:**
   - Horizontal: Center
   - Vertical: Center

---

## ✅ PASO 4: Continuar con Más Componentes (2 horas)

Sigue el mismo proceso para crear:

### 4.1 Botones Restantes
- Button/Secondary (transparente, borde gris)
- Button/Danger (rojo)
- Button/Success (verde)
- Button/Disabled (gris claro)

### 4.2 Inputs
- Input/Text (con estados Focus, Error, Disabled)
- Input/Select (con icono dropdown)
- Input/Textarea

**Guía detallada:** Revisa `ESPECIFICACIONES-COMPONENTES.md` para cada componente.

---

## 📋 Checklist Rápido

Marca conforme avances:

### FASE 1: Setup (30 min)
- [ ] Variables de color creadas
- [ ] Estilos de texto creados
- [ ] Estructura de carpetas creada

### FASE 2: Primer Componente (15 min)
- [ ] Button/Primary creado
- [ ] Variante Hover creada

### FASE 3: Login Desktop (30 min)
- [ ] Card de login creado
- [ ] Inputs agregados
- [ ] Botón agregado
- [ ] Link agregado
- [ ] Todo centrado

### FASE 4: Más Componentes (2 horas)
- [ ] Todos los botones
- [ ] Todos los inputs
- [ ] Cards
- [ ] Badges
- [ ] Tables
- [ ] Modal

---

## 🆘 Si Te Atascas

1. **Revisa la guía detallada:**
   - Abre `GUIA-FIGMA-COMPLETA.md` en Cursor
   - Busca la sección específica que necesitas

2. **Revisa las especificaciones:**
   - Abre `ESPECIFICACIONES-COMPONENTES.md`
   - Busca el componente que estás creando

3. **Referencia rápida:**
   - Abre `INDICE-REFERENCIA-RAPIDA.txt`
   - Copia los colores y valores exactos

---

## 🎯 Próximos Pasos Después

Una vez completes el Login Desktop:

1. **Login Tablet** (768x1024)
2. **Login Mobile** (375x667)
3. **Dashboard Desktop**
4. Y así sucesivamente...

**Guía completa de páginas:** Revisa `wireframes-detallados.md`

---

## 💡 Tips Importantes

- ✅ **Usa Auto Layout siempre** - Te ahorrará mucho tiempo
- ✅ **Crea componentes reutilizables** - No copies y pegues
- ✅ **Usa Variables y Estilos** - Facilita cambios futuros
- ✅ **Nombra todo claramente** - Te ayudará a encontrar cosas
- ✅ **Trabaja componente por componente** - No intentes hacer todo a la vez

---

**¡Empieza con el PASO 1 y avanza paso a paso!** 🚀



