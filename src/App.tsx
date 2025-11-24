import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PermisosOperacion from './pages/PermisosOperacion'
import PermisosConstruccion from './pages/PermisosConstruccion'
import Solvencias from './pages/Solvencias'
import CategoriasRubros from './pages/CategoriasRubros'
import BarriosColonias from './pages/BarriosColonias'
import LibroControlPermisosOperacion from './pages/LibroControlPermisosOperacion'
import LibroControlPermisosConstruccion from './pages/LibroControlPermisosConstruccion'
import LibroControlSolvencias from './pages/LibroControlSolvencias'
import Reportes from './pages/Reportes'
import Usuarios from './pages/Usuarios'
import Configuracion from './pages/Configuracion'
import Layout from './components/Layout'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      
      <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="permisos-operacion" element={<PermisosOperacion />} />
        <Route path="permisos-construccion" element={<PermisosConstruccion />} />
        <Route path="solvencias" element={<Solvencias />} />
        <Route path="categorias-rubros" element={<CategoriasRubros />} />
        <Route path="barrios-colonias" element={<BarriosColonias />} />
        <Route path="libro-control-permisos-operacion" element={<LibroControlPermisosOperacion />} />
        <Route path="libro-control-permisos-construccion" element={<LibroControlPermisosConstruccion />} />
        <Route path="libro-control-solvencias" element={<LibroControlSolvencias />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="configuracion" element={<Configuracion />} />
      </Route>
    </Routes>
  )
}

export default App
