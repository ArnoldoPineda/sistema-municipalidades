-- Script para agregar la columna fecha_emision si no existe
-- Ejecuta esto en el SQL Editor de Supabase

-- Agregar columna fecha_emision a permisos_operacion si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'fecha_emision'
    ) THEN
        ALTER TABLE permisos_operacion 
        ADD COLUMN fecha_emision DATE;
        
        -- Actualizar registros existentes con la fecha de creación
        UPDATE permisos_operacion 
        SET fecha_emision = created_at::DATE 
        WHERE fecha_emision IS NULL;
    END IF;
END $$;

-- Verificar que se agregó correctamente
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name = 'fecha_emision';

