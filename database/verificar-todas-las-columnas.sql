-- Script para verificar y corregir TODAS las columnas de permisos_operacion
-- Ejecuta esto en el SQL Editor de Supabase

-- Paso 1: Verificar todas las columnas actuales
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion'
ORDER BY ordinal_position;

-- Paso 2: Asegurar que todas las columnas necesarias existan con los nombres correctos
DO $$ 
BEGIN
    -- Asegurar que nombre_empresa existe (no nombre_negocio)
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
    END IF;

    -- Asegurar que nombre_propietario existe (no propietario)
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'propietario'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'nombre_propietario'
    ) THEN
        ALTER TABLE permisos_operacion 
        RENAME COLUMN propietario TO nombre_propietario;
    END IF;

    -- Asegurar que numero_identidad existe (no identidad)
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'identidad'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'numero_identidad'
    ) THEN
        ALTER TABLE permisos_operacion 
        RENAME COLUMN identidad TO numero_identidad;
    END IF;

    -- Crear numero_identidad si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'numero_identidad'
    ) THEN
        ALTER TABLE permisos_operacion 
        ADD COLUMN numero_identidad VARCHAR(50);
    END IF;
END $$;

-- Paso 3: Verificar el resultado final
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion'
AND column_name IN ('nombre_empresa', 'nombre_propietario', 'numero_identidad', 'identidad')
ORDER BY column_name;

