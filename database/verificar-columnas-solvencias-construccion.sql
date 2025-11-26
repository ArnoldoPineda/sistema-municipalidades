-- Script para verificar y agregar columnas necesarias en solvencias y permisos_construccion
-- Ejecuta esto en el SQL Editor de Supabase

-- ============================================
-- TABLA: solvencias
-- ============================================

-- Verificar columnas actuales de solvencias
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'solvencias'
ORDER BY ordinal_position;

-- Agregar numero_recibo si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'solvencias' 
        AND column_name = 'numero_recibo'
    ) THEN
        ALTER TABLE solvencias 
        ADD COLUMN numero_recibo VARCHAR(50);
        
        RAISE NOTICE 'Columna numero_recibo agregada a solvencias';
    END IF;
END $$;

-- Agregar valor_recibo si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'solvencias' 
        AND column_name = 'valor_recibo'
    ) THEN
        ALTER TABLE solvencias 
        ADD COLUMN valor_recibo DECIMAL(15, 2);
        
        RAISE NOTICE 'Columna valor_recibo agregada a solvencias';
    END IF;
END $$;

-- ============================================
-- TABLA: permisos_construccion
-- ============================================

-- Verificar columnas actuales de permisos_construccion
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_construccion'
ORDER BY ordinal_position;

-- Agregar numero_recibo si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_construccion' 
        AND column_name = 'numero_recibo'
    ) THEN
        ALTER TABLE permisos_construccion 
        ADD COLUMN numero_recibo VARCHAR(50);
        
        RAISE NOTICE 'Columna numero_recibo agregada a permisos_construccion';
    END IF;
END $$;

-- Agregar valor_recibo si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_construccion' 
        AND column_name = 'valor_recibo'
    ) THEN
        ALTER TABLE permisos_construccion 
        ADD COLUMN valor_recibo DECIMAL(15, 2);
        
        RAISE NOTICE 'Columna valor_recibo agregada a permisos_construccion';
    END IF;
END $$;

-- Verificar resultado final
SELECT 
    'solvencias' as tabla,
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'solvencias' 
AND column_name IN ('numero_recibo', 'valor_recibo')
UNION ALL
SELECT 
    'permisos_construccion' as tabla,
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_construccion' 
AND column_name IN ('numero_recibo', 'valor_recibo')
ORDER BY tabla, column_name;

