-- Script para crear la tabla configuracion_municipal
-- Ejecuta esto en el SQL Editor de Supabase si la tabla no existe

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

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger
DROP TRIGGER IF EXISTS update_configuracion_municipal_updated_at ON configuracion_municipal;
CREATE TRIGGER update_configuracion_municipal_updated_at 
    BEFORE UPDATE ON configuracion_municipal
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar configuración inicial si no existe
INSERT INTO configuracion_municipal (id, año)
VALUES (1, EXTRACT(YEAR FROM NOW()))
ON CONFLICT (id) DO NOTHING;

-- Verificar que se creó correctamente
SELECT 'Tabla configuracion_municipal creada exitosamente' as resultado;


