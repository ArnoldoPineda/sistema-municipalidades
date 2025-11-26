-- Script para verificar y corregir la columna propietario/nombre_propietario
-- Ejecuta esto en el SQL Editor de Supabase

-- Paso 1: Verificar qué columnas existen
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name IN ('propietario', 'nombre_propietario')
ORDER BY column_name;

-- Paso 2: Resolver columnas duplicadas o renombrar
DO $$ 
BEGIN
    -- Si ambas columnas existen
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'propietario'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_propietario'
    ) THEN
        -- Copiar datos de propietario a nombre_propietario donde nombre_propietario esté vacío
        UPDATE permisos_operacion 
        SET nombre_propietario = propietario 
        WHERE (nombre_propietario IS NULL OR nombre_propietario = '') 
        AND propietario IS NOT NULL 
        AND propietario != '';
        
        -- Eliminar la columna propietario
        ALTER TABLE permisos_operacion 
        DROP COLUMN propietario;
        
        RAISE NOTICE 'Columna propietario eliminada, datos copiados a nombre_propietario';
    
    -- Si solo existe propietario, renombrarla
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'propietario'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_propietario'
    ) THEN
        -- Renombrar propietario a nombre_propietario
        ALTER TABLE permisos_operacion 
        RENAME COLUMN propietario TO nombre_propietario;
        
        RAISE NOTICE 'Columna propietario renombrada a nombre_propietario';
    
    -- Si solo existe nombre_propietario, no hacer nada
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_propietario'
    ) THEN
        RAISE NOTICE 'Columna nombre_propietario ya existe, no se requiere acción';
    END IF;
END $$;

-- Paso 3: Asegurar que nombre_propietario tenga la restricción NOT NULL
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_propietario'
        AND is_nullable = 'YES'
    ) THEN
        -- Primero actualizar valores NULL
        UPDATE permisos_operacion 
        SET nombre_propietario = 'Sin propietario' 
        WHERE nombre_propietario IS NULL;
        
        -- Luego agregar la restricción NOT NULL
        ALTER TABLE permisos_operacion 
        ALTER COLUMN nombre_propietario SET NOT NULL;
        
        RAISE NOTICE 'Restricción NOT NULL agregada a nombre_propietario';
    END IF;
END $$;

-- Paso 4: Verificar el resultado final
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name = 'nombre_propietario';

