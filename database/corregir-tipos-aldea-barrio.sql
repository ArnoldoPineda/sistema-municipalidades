-- Script para corregir los tipos de datos de aldea_id y barrio_colonia_id
-- Ejecuta esto en el SQL Editor de Supabase

-- Cambiar aldea_id de UUID a VARCHAR si es necesario
DO $$ 
BEGIN
    -- Verificar el tipo actual de aldea_id
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'aldea_id'
        AND data_type = 'uuid'
    ) THEN
        -- Cambiar a VARCHAR para permitir strings
        ALTER TABLE permisos_operacion 
        ALTER COLUMN aldea_id TYPE VARCHAR(255);
        
        -- Eliminar la restricción de foreign key si existe
        ALTER TABLE permisos_operacion 
        DROP CONSTRAINT IF EXISTS permisos_operacion_aldea_id_fkey;
    END IF;

    -- Verificar el tipo actual de barrio_colonia_id
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'barrio_colonia_id'
        AND data_type = 'uuid'
    ) THEN
        -- Cambiar a VARCHAR para permitir strings
        ALTER TABLE permisos_operacion 
        ALTER COLUMN barrio_colonia_id TYPE VARCHAR(255);
        
        -- Eliminar la restricción de foreign key si existe
        ALTER TABLE permisos_operacion 
        DROP CONSTRAINT IF EXISTS permisos_operacion_barrio_colonia_id_fkey;
    END IF;
END $$;

-- Verificar los tipos actuales
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name IN ('aldea_id', 'barrio_colonia_id');

