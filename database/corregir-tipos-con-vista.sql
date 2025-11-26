-- Script para corregir los tipos de datos eliminando dependencias primero
-- Ejecuta esto en el SQL Editor de Supabase

-- Paso 1: Eliminar la vista si existe (porque depende de las columnas)
DROP VIEW IF EXISTS vista_permisos_operacion CASCADE;

-- Paso 2: Eliminar cualquier otra vista o regla que dependa de estas columnas
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Buscar y eliminar todas las vistas que dependen de permisos_operacion
    FOR r IN 
        SELECT viewname 
        FROM pg_views 
        WHERE schemaname = 'public' 
        AND definition LIKE '%permisos_operacion%'
    LOOP
        EXECUTE 'DROP VIEW IF EXISTS ' || quote_ident(r.viewname) || ' CASCADE';
    END LOOP;
END $$;

-- Paso 3: Eliminar restricciones de foreign key si existen
ALTER TABLE permisos_operacion 
DROP CONSTRAINT IF EXISTS permisos_operacion_aldea_id_fkey CASCADE;

ALTER TABLE permisos_operacion 
DROP CONSTRAINT IF EXISTS permisos_operacion_barrio_colonia_id_fkey CASCADE;

-- Paso 4: Cambiar aldea_id de UUID a VARCHAR
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'aldea_id'
        AND data_type = 'uuid'
    ) THEN
        ALTER TABLE permisos_operacion 
        ALTER COLUMN aldea_id TYPE VARCHAR(255) USING aldea_id::text;
    ELSIF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'aldea_id'
    ) THEN
        ALTER TABLE permisos_operacion 
        ADD COLUMN aldea_id VARCHAR(255);
    END IF;
END $$;

-- Paso 5: Cambiar barrio_colonia_id de UUID a VARCHAR
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'barrio_colonia_id'
        AND data_type = 'uuid'
    ) THEN
        ALTER TABLE permisos_operacion 
        ALTER COLUMN barrio_colonia_id TYPE VARCHAR(255) USING barrio_colonia_id::text;
    ELSIF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'barrio_colonia_id'
    ) THEN
        ALTER TABLE permisos_operacion 
        ADD COLUMN barrio_colonia_id VARCHAR(255);
    END IF;
END $$;

-- Paso 6: Verificar los tipos actuales
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name IN ('aldea_id', 'barrio_colonia_id')
ORDER BY column_name;

-- Nota: Si necesitas recrear la vista vista_permisos_operacion después,
-- deberás hacerlo manualmente con la nueva estructura

