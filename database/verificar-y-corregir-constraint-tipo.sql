-- Script para verificar y corregir el CHECK constraint de la columna 'tipo' en solvencias
-- Ejecuta esto en el SQL Editor de Supabase

-- Paso 1: Verificar la columna tipo y sus constraints
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'solvencias'::regclass
AND conname LIKE '%tipo%';

-- Paso 2: Verificar la definición de la columna tipo
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'solvencias' 
AND column_name = 'tipo';

-- Paso 3: Ver qué valores únicos existen actualmente en la columna tipo
SELECT DISTINCT tipo, COUNT(*) as cantidad
FROM solvencias
GROUP BY tipo;

-- Paso 4: Eliminar el constraint existente si existe
DO $$ 
BEGIN
    -- Eliminar constraint si existe
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'solvencias'::regclass 
        AND conname = 'solvencias_tipo_check'
    ) THEN
        ALTER TABLE solvencias 
        DROP CONSTRAINT solvencias_tipo_check;
        
        RAISE NOTICE 'Constraint solvencias_tipo_check eliminado';
    END IF;
END $$;

-- Paso 5: Crear un nuevo constraint más permisivo (o eliminar completamente si no es necesario)
-- Opción A: Crear constraint que permita 'personal', 'negocio', 'propiedad'
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'solvencias'::regclass 
        AND conname = 'solvencias_tipo_check'
    ) THEN
        ALTER TABLE solvencias 
        ADD CONSTRAINT solvencias_tipo_check 
        CHECK (tipo IN ('personal', 'negocio', 'propiedad', 'impuestos_personales'));
        
        RAISE NOTICE 'Nuevo constraint solvencias_tipo_check creado';
    END IF;
END $$;

-- OPCIONAL: Si prefieres eliminar completamente el constraint (más permisivo)
-- Descomenta las siguientes líneas si quieres eliminar el constraint:

-- ALTER TABLE solvencias 
-- DROP CONSTRAINT IF EXISTS solvencias_tipo_check;

-- Paso 6: Verificar el resultado
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'solvencias'::regclass
AND conname LIKE '%tipo%';

