-- Script para agregar columnas numero_recibo y valor_recibo a permisos_operacion
-- Ejecuta esto en el SQL Editor de Supabase

-- Agregar numero_recibo si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'numero_recibo'
    ) THEN
        ALTER TABLE permisos_operacion 
        ADD COLUMN numero_recibo VARCHAR(50);
        
        RAISE NOTICE 'Columna numero_recibo agregada';
    ELSE
        RAISE NOTICE 'Columna numero_recibo ya existe';
    END IF;
END $$;

-- Agregar valor_recibo si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'permisos_operacion' 
        AND column_name = 'valor_recibo'
    ) THEN
        ALTER TABLE permisos_operacion 
        ADD COLUMN valor_recibo DECIMAL(15, 2);
        
        RAISE NOTICE 'Columna valor_recibo agregada';
    ELSE
        RAISE NOTICE 'Columna valor_recibo ya existe';
    END IF;
END $$;

-- Verificar las columnas agregadas
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    numeric_precision,
    numeric_scale
FROM information_schema.columns 
WHERE table_name = 'permisos_operacion' 
AND column_name IN ('numero_recibo', 'valor_recibo')
ORDER BY column_name;

