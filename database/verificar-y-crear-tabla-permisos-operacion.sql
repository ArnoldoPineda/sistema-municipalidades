-- Script para verificar y crear/actualizar la tabla permisos_operacion
-- Ejecuta esto en el SQL Editor de Supabase

-- Primero, verificar si la tabla existe y crear si no existe
CREATE TABLE IF NOT EXISTS permisos_operacion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_permiso VARCHAR(50) UNIQUE,
    nombre_empresa VARCHAR(255) NOT NULL,
    rtn_empresa VARCHAR(50),
    nombre_propietario VARCHAR(255) NOT NULL,
    numero_identidad VARCHAR(50) NOT NULL,
    aldea_id VARCHAR(255),
    barrio_colonia_id VARCHAR(255),
    direccion TEXT,
    telefono VARCHAR(50),
    email VARCHAR(255),
    fecha_emision DATE,
    fecha_vencimiento DATE,
    estado VARCHAR(50) DEFAULT 'Pendiente',
    observaciones TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agregar columnas que puedan faltar
DO $$ 
BEGIN
    -- Agregar nombre_empresa si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'nombre_empresa'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN nombre_empresa VARCHAR(255);
    END IF;

    -- Agregar nombre_propietario si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'nombre_propietario'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN nombre_propietario VARCHAR(255);
    END IF;

    -- Agregar rtn_empresa si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'rtn_empresa'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN rtn_empresa VARCHAR(50);
    END IF;

    -- Agregar numero_identidad si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'numero_identidad'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN numero_identidad VARCHAR(50);
    END IF;

    -- Agregar aldea_id si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'aldea_id'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN aldea_id VARCHAR(255);
    END IF;

    -- Agregar barrio_colonia_id si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'barrio_colonia_id'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN barrio_colonia_id VARCHAR(255);
    END IF;

    -- Agregar direccion si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'direccion'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN direccion TEXT;
    END IF;

    -- Agregar fecha_emision si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'fecha_emision'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN fecha_emision DATE;
    END IF;

    -- Agregar estado si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'estado'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN estado VARCHAR(50) DEFAULT 'Pendiente';
    END IF;

    -- Agregar observaciones si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'observaciones'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN observaciones TEXT;
    END IF;

    -- Agregar created_at si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'created_at'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    -- Agregar updated_at si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE permisos_operacion ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Verificar todas las columnas
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion'
ORDER BY ordinal_position;

