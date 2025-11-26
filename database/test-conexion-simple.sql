-- Script simple para probar la conexión a Supabase
-- Ejecuta esto en el SQL Editor de Supabase

-- Verificar que puedes ejecutar consultas
SELECT NOW() as fecha_actual, 
       current_database() as base_datos,
       version() as version_postgres;

-- Verificar si las tablas existen
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;


