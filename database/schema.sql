-- ============================================
-- Sistema Municipal de Permisos
-- Esquema de Base de Datos para Supabase
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLAS DE CATÁLOGOS
-- ============================================

-- Tabla: aldeas
CREATE TABLE IF NOT EXISTS aldeas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: barrios_colonias
CREATE TABLE IF NOT EXISTS barrios_colonias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    aldea_id UUID REFERENCES aldeas(id) ON DELETE CASCADE,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: actividades_economicas
CREATE TABLE IF NOT EXISTS actividades_economicas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    codigo VARCHAR(50),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: categorias_rubros
CREATE TABLE IF NOT EXISTS categorias_rubros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: rubros_items
CREATE TABLE IF NOT EXISTS rubros_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(50) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    categoria_id UUID REFERENCES categorias_rubros(id) ON DELETE CASCADE,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLAS DE PERMISOS
-- ============================================

-- Tabla: permisos_operacion
CREATE TABLE IF NOT EXISTS permisos_operacion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_permiso VARCHAR(50) UNIQUE,
    nombre_empresa VARCHAR(255) NOT NULL,
    rtn_empresa VARCHAR(50),
    nombre_propietario VARCHAR(255) NOT NULL,
    numero_identidad VARCHAR(50) NOT NULL,
    aldea_id UUID REFERENCES aldeas(id),
    barrio_colonia_id UUID REFERENCES barrios_colonias(id),
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

-- Tabla: permisos_operacion_actividades (tabla de relación)
CREATE TABLE IF NOT EXISTS permisos_operacion_actividades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    permiso_operacion_id UUID REFERENCES permisos_operacion(id) ON DELETE CASCADE,
    actividad_economica_id UUID REFERENCES actividades_economicas(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(permiso_operacion_id, actividad_economica_id)
);

-- Tabla: permisos_construccion
CREATE TABLE IF NOT EXISTS permisos_construccion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_permiso VARCHAR(50) UNIQUE,
    concede_permiso_a VARCHAR(255) NOT NULL,
    numero_identidad VARCHAR(50) NOT NULL,
    clave_catastral VARCHAR(100),
    para_construir TEXT NOT NULL,
    ubicacion TEXT,
    presupuesto DECIMAL(15, 2),
    nombre_constructor VARCHAR(255),
    numero_recibo VARCHAR(50),
    valor_recibo DECIMAL(15, 2),
    fecha_emision DATE,
    fecha_vencimiento DATE,
    estado VARCHAR(50) DEFAULT 'Pendiente',
    observaciones TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: solvencias
CREATE TABLE IF NOT EXISTS solvencias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_solvencia VARCHAR(50) UNIQUE,
    nombre_contribuyente VARCHAR(255) NOT NULL,
    numero_identidad VARCHAR(50) NOT NULL,
    aldea_id UUID REFERENCES aldeas(id),
    barrio_colonia_id UUID REFERENCES barrios_colonias(id),
    numero_recibo VARCHAR(50),
    valor_recibo DECIMAL(15, 2),
    fecha_emision DATE,
    fecha_vencimiento DATE,
    estado VARCHAR(50) DEFAULT 'Vigente',
    observaciones TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLAS DE CONFIGURACIÓN
-- ============================================

-- Tabla: configuracion_municipal
CREATE TABLE IF NOT EXISTS configuracion_municipal (
    id INTEGER PRIMARY KEY DEFAULT 1,
    firmas JSONB DEFAULT '{"alcalde": null, "juez": null, "jefeCatastro": null}',
    logos JSONB DEFAULT '{"logoAlcaldia": null, "logoSegundo": null}',
    numeracion JSONB DEFAULT '{
        "permisosOperacion": {"numeroInicio": "00001", "formato": "00001"},
        "permisosConstruccion": {"numeroInicio": "00001", "formato": "00001"},
        "solvencias": {"numeroInicio": "0000001", "formato": "0000001"}
    }',
    estilo JSONB DEFAULT '{
        "permisosOperacion": {"estilo": "vertical", "tamañoFirma": "mediano"},
        "permisosConstruccion": {"estilo": "vertical", "tamañoFirma": "mediano"},
        "solvencias": {"estilo": "vertical", "tamañoFirma": "mediano"}
    }',
    año INTEGER DEFAULT EXTRACT(YEAR FROM NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLAS DE USUARIOS
-- ============================================

-- Tabla: perfiles_usuarios
-- Esta tabla se relaciona con auth.users de Supabase
CREATE TABLE IF NOT EXISTS perfiles_usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'usuario',
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ÍNDICES PARA MEJORAR RENDIMIENTO
-- ============================================

CREATE INDEX IF NOT EXISTS idx_barrios_aldea ON barrios_colonias(aldea_id);
CREATE INDEX IF NOT EXISTS idx_rubros_categoria ON rubros_items(categoria_id);
CREATE INDEX IF NOT EXISTS idx_permisos_operacion_aldea ON permisos_operacion(aldea_id);
CREATE INDEX IF NOT EXISTS idx_permisos_operacion_barrio ON permisos_operacion(barrio_colonia_id);
CREATE INDEX IF NOT EXISTS idx_permisos_operacion_actividades_permiso ON permisos_operacion_actividades(permiso_operacion_id);
CREATE INDEX IF NOT EXISTS idx_permisos_operacion_actividades_actividad ON permisos_operacion_actividades(actividad_economica_id);
CREATE INDEX IF NOT EXISTS idx_solvencias_aldea ON solvencias(aldea_id);
CREATE INDEX IF NOT EXISTS idx_solvencias_barrio ON solvencias(barrio_colonia_id);

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger a todas las tablas con updated_at
CREATE TRIGGER update_aldeas_updated_at BEFORE UPDATE ON aldeas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_barrios_colonias_updated_at BEFORE UPDATE ON barrios_colonias
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_actividades_economicas_updated_at BEFORE UPDATE ON actividades_economicas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categorias_rubros_updated_at BEFORE UPDATE ON categorias_rubros
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rubros_items_updated_at BEFORE UPDATE ON rubros_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_permisos_operacion_updated_at BEFORE UPDATE ON permisos_operacion
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_permisos_construccion_updated_at BEFORE UPDATE ON permisos_construccion
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_solvencias_updated_at BEFORE UPDATE ON solvencias
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_perfiles_usuarios_updated_at BEFORE UPDATE ON perfiles_usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracion_municipal_updated_at BEFORE UPDATE ON configuracion_municipal
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATOS INICIALES (OPCIONAL)
-- ============================================

-- Insertar configuración inicial
INSERT INTO configuracion_municipal (id, año)
VALUES (1, EXTRACT(YEAR FROM NOW()))
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- NOTAS IMPORTANTES
-- ============================================

-- 1. Las políticas de Row Level Security (RLS) deben configurarse según tus necesidades
-- 2. Para desarrollo, puedes desactivar RLS temporalmente
-- 3. Para producción, configura políticas apropiadas para cada tabla
-- 4. La tabla perfiles_usuarios se relaciona con auth.users de Supabase
-- 5. Asegúrate de crear un trigger para sincronizar perfiles_usuarios cuando se crea un usuario en auth.users


