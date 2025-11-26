-- Script para configurar Row-Level Security (RLS) en permisos_operacion
-- Ejecuta esto en el SQL Editor de Supabase

-- Opción 1: Desactivar RLS temporalmente (para desarrollo)
-- Descomenta la siguiente línea si quieres desactivar RLS completamente:
-- ALTER TABLE permisos_operacion DISABLE ROW LEVEL SECURITY;

-- Opción 2: Crear políticas permisivas (recomendado)
-- Esto permite todas las operaciones para usuarios autenticados

-- Habilitar RLS si no está habilitado
ALTER TABLE permisos_operacion ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Permitir todo para usuarios autenticados" ON permisos_operacion;
DROP POLICY IF EXISTS "Permitir insertar para todos" ON permisos_operacion;
DROP POLICY IF EXISTS "Permitir leer para todos" ON permisos_operacion;
DROP POLICY IF EXISTS "Permitir actualizar para todos" ON permisos_operacion;
DROP POLICY IF EXISTS "Permitir eliminar para todos" ON permisos_operacion;

-- Crear política para permitir INSERT (crear)
CREATE POLICY "Permitir insertar para todos"
ON permisos_operacion
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Crear política para permitir SELECT (leer)
CREATE POLICY "Permitir leer para todos"
ON permisos_operacion
FOR SELECT
TO authenticated, anon
USING (true);

-- Crear política para permitir UPDATE (actualizar)
CREATE POLICY "Permitir actualizar para todos"
ON permisos_operacion
FOR UPDATE
TO authenticated, anon
USING (true)
WITH CHECK (true);

-- Crear política para permitir DELETE (eliminar)
CREATE POLICY "Permitir eliminar para todos"
ON permisos_operacion
FOR DELETE
TO authenticated, anon
USING (true);

-- Verificar las políticas creadas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'permisos_operacion';

