# 🚀 Instrucciones de Instalación

## Paso 1: Instalar Dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

## Paso 2: Ejecutar el Proyecto

```bash
npm run dev
```

El proyecto se abrirá automáticamente en `http://localhost:3000`

## Paso 3: Acceder al Sistema

1. Ve a `http://localhost:3000`
2. Serás redirigido a la página de Login
3. Ingresa cualquier email y contraseña (por ahora es simulado)
4. Click en "Iniciar Sesión"
5. Serás redirigido al Dashboard

---

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (Button, Input, Card, etc.)
│   └── Layout/         # Layout components (Header, Sidebar, Footer)
├── pages/              # Páginas del sistema
├── store/              # Estado global (Zustand)
├── lib/                # Utilidades
├── App.tsx             # Componente principal con routing
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales con Tailwind
```

---

## 🎨 Componentes Disponibles

### UI Components
- `Button` - Botones (primary, secondary, danger, success)
- `Input` - Inputs de texto
- `Select` - Selects con dropdown
- `Textarea` - Áreas de texto
- `Card` - Tarjetas
- `KPICard` - Tarjetas de métricas
- `Badge` - Badges de estado
- `Modal` - Modales
- `Table` - Tablas con filas y celdas

### Layout Components
- `Header` - Header con navegación y usuario
- `Sidebar` - Sidebar con menú
- `Footer` - Footer

---

## 📄 Páginas Disponibles

1. **Login** - `/login`
2. **Dashboard** - `/dashboard`
3. **Permisos Operación** - `/permisos-operacion`
4. **Permisos Construcción** - `/permisos-construccion`
5. **Solvencias** - `/solvencias`
6. **Reportes** - `/reportes`
7. **Usuarios** - `/usuarios` (solo Admin)
8. **Configuración** - `/configuracion` (solo Admin)

---

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

---

## 🎨 Design System

Los colores, tipografía y espaciados están configurados en:
- `tailwind.config.js` - Configuración de Tailwind
- `src/index.css` - Estilos globales y clases de utilidad

### Colores
- Primary: `#0066CC`
- Success: `#10B981`
- Warning: `#F59E0B`
- Danger: `#EF4444`

### Tipografía
- H1: 32px / 40px (Bold)
- H2: 24px / 32px (SemiBold)
- H3: 20px / 28px (SemiBold)
- Body: 16px / 24px (Regular)

---

## 🔧 Próximos Pasos

1. **Conectar con Supabase**
   - Configurar autenticación real
   - Crear tablas en PostgreSQL
   - Implementar CRUD completo

2. **Agregar Funcionalidades**
   - Validación de formularios
   - Paginación en tablas
   - Filtros avanzados
   - Exportación de reportes

3. **Mejorar UI/UX**
   - Loading states
   - Error handling
   - Toast notifications
   - Animaciones

---

## 🆘 Problemas Comunes

### Error: Cannot find module
```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error: Port already in use
```bash
# Cambia el puerto en vite.config.ts
server: {
  port: 3001  // Cambia a otro puerto
}
```

---

**¡Listo para empezar!** 🎉



