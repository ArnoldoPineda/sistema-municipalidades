-- Script para verificar y agregar la columna 'tipo' en la tabla solvencias
-- Ejecuta esto en el SQL Editor de Supabase

-- Paso 1: Verificar todas las columnas de la tabla solvencias
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'solvencias'
ORDER BY ordinal_position;

-- Paso 2: Verificar específicamente si existe la columna 'tipo'
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'solvencias' 
            AND column_name = 'tipo'
        ) THEN 'La columna "tipo" EXISTE'
        ELSE 'La columna "tipo" NO EXISTE'
    END as estado_columna;

-- Paso 3: Agregar la columna 'tipo' si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'solvencias' 
        AND column_name = 'tipo'
    ) THEN
        -- Agregar la columna con valor por defecto 'personal'
        ALTER TABLE solvencias 
        ADD COLUMN tipo VARCHAR(50) DEFAULT 'personal' NOT NULL;
        
        -- Actualizar registros existentes con el valor por defecto
        UPDATE solvencias 
        SET tipo = 'personal' 
        WHERE tipo IS NULL;
        
        RAISE NOTICE 'Columna "tipo" agregada a la tabla solvencias con valor por defecto "personal"';
    ELSE
        -- Si existe, verificar si permite NULL
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'solvencias' 
            AND column_name = 'tipo'
            AND is_nullable = 'YES'
        ) THEN
            -- Si permite NULL, actualizar valores NULL y luego hacerla NOT NULL
            UPDATE solvencias 
            SET tipo = 'personal' 
            WHERE tipo IS NULL;
            
            ALTER TABLE solvencias 
            ALTER COLUMN tipo SET NOT NULL;
            
            ALTER TABLE solvencias 
            ALTER COLUMN tipo SET DEFAULT 'personal';
            
            RAISE NOTICE 'Columna "tipo" actualizada: valores NULL reemplazados y restricción NOT NULL agregada';
        ELSE
            RAISE NOTICE 'Columna "tipo" ya existe y está configurada correctamente';
        END IF;
    END IF;
END $$;

-- Paso 4: Verificar el resultado final
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'solvencias' 
AND column_name = 'tipo';

-- Paso 5: Verificar si hay registros sin tipo (por si acaso)
SELECT 
    COUNT(*) as registros_sin_tipo
FROM solvencias 
WHERE tipo IS NULL;

