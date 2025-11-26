-- Script para resolver columnas duplicadas (nombre_negocio y nombre_empresa)
-- Ejecuta esto en el SQL Editor de Supabase

-- Paso 1: Verificar qué columnas existen
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name IN ('nombre_negocio', 'nombre_empresa')
ORDER BY column_name;

-- Paso 2: Si ambas columnas existen, copiar datos y eliminar la duplicada
DO $$ 
BEGIN
    -- Si ambas columnas existen
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_negocio'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_empresa'
    ) THEN
        -- Copiar datos de nombre_negocio a nombre_empresa donde nombre_empresa esté vacío
        UPDATE permisos_operacion 
        SET nombre_empresa = nombre_negocio 
        WHERE (nombre_empresa IS NULL OR nombre_empresa = '') 
        AND nombre_negocio IS NOT NULL 
        AND nombre_negocio != '';
        
        -- Eliminar la columna nombre_negocio
        ALTER TABLE permisos_operacion 
        DROP COLUMN nombre_negocio;
        
        RAISE NOTICE 'Columna nombre_negocio eliminada, datos copiados a nombre_empresa';
    
    -- Si solo existe nombre_negocio
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_negocio'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_empresa'
    ) THEN
        -- Renombrar nombre_negocio a nombre_empresa
        ALTER TABLE permisos_operacion 
        RENAME COLUMN nombre_negocio TO nombre_empresa;
        
        RAISE NOTICE 'Columna nombre_negocio renombrada a nombre_empresa';
    
    -- Si solo existe nombre_empresa, no hacer nada
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_empresa'
    ) THEN
        RAISE NOTICE 'Columna nombre_empresa ya existe, no se requiere acción';
    END IF;
END $$;

-- Paso 3: Asegurar que nombre_empresa tenga la restricción NOT NULL
DO $$ 
BEGIN
    -- Si la columna permite NULL, cambiarla a NOT NULL
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_empresa'
        AND is_nullable = 'YES'
    ) THEN
        -- Primero actualizar valores NULL a un valor por defecto
        UPDATE permisos_operacion 
        SET nombre_empresa = 'Sin nombre' 
        WHERE nombre_empresa IS NULL;
        
        -- Luego agregar la restricción NOT NULL
        ALTER TABLE permisos_operacion 
        ALTER COLUMN nombre_empresa SET NOT NULL;
        
        RAISE NOTICE 'Restricción NOT NULL agregada a nombre_empresa';
    END IF;
END $$;

-- Paso 4: Verificar el resultado final
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name = 'nombre_empresa';

