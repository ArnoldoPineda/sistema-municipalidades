-- Script para desactivar RLS en todas las tablas principales (SOLO PARA DESARROLLO)
-- ⚠️ ADVERTENCIA: Esto desactiva la seguridad. Solo úsalo en desarrollo.
-- Ejecuta esto en el SQL Editor de Supabase

-- Desactivar RLS en permisos_operacion
ALTER TABLE IF EXISTS permisos_operacion DISABLE ROW LEVEL SECURITY;

-- Desactivar RLS en permisos_construccion
ALTER TABLE IF EXISTS permisos_construccion DISABLE ROW LEVEL SECURITY;

-- Desactivar RLS en solvencias
ALTER TABLE IF EXISTS solvencias DISABLE ROW LEVEL SECURITY;

-- Desactivar RLS en configuracion_municipal
ALTER TABLE IF EXISTS configuracion_municipal DISABLE ROW LEVEL SECURITY;

-- Verificar el estado de RLS
SELECT 
    tablename,
    rowsecurity as rls_habilitado
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('permisos_operacion', 'permisos_construccion', 'solvencias', 'configuracion_municipal')
ORDER BY tablename;

