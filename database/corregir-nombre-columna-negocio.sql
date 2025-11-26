-- Script para verificar y corregir el nombre de la columna
-- Ejecuta esto en el SQL Editor de Supabase

-- Verificar qué columnas existen actualmente
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name IN ('nombre_negocio', 'nombre_empresa')
ORDER BY column_name;

-- Si existe nombre_negocio pero no nombre_empresa, renombrar
DO $$ 
BEGIN
    -- Si existe nombre_negocio, renombrarlo a nombre_empresa
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_negocio'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_empresa'
    ) THEN
        ALTER TABLE permisos_operacion 
        RENAME COLUMN nombre_negocio TO nombre_empresa;
        
        RAISE NOTICE 'Columna nombre_negocio renombrada a nombre_empresa';
    END IF;
    
    -- Si no existe ninguna de las dos, crear nombre_empresa
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name IN ('nombre_negocio', 'nombre_empresa')
    ) THEN
        ALTER TABLE permisos_operacion 
        ADD COLUMN nombre_empresa VARCHAR(255) NOT NULL;
        
        RAISE NOTICE 'Columna nombre_empresa creada';
    END IF;
END $$;

-- Verificar el resultado final
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name = 'nombre_empresa';

