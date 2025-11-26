-- Script para verificar que todas las tablas estén creadas correctamente
-- Ejecuta este script en el SQL Editor de Supabase después de crear el schema

-- Verificar tablas de catálogos
SELECT 'aldeas' as tabla, COUNT(*) as registros FROM aldeas
UNION ALL
SELECT 'barrios_colonias', COUNT(*) FROM barrios_colonias
UNION ALL
SELECT 'actividades_economicas', COUNT(*) FROM actividades_economicas
UNION ALL
SELECT 'categorias_rubros', COUNT(*) FROM categorias_rubros
UNION ALL
SELECT 'rubros_items', COUNT(*) FROM rubros_items
UNION ALL
-- Verificar tablas de permisos
SELECT 'permisos_operacion', COUNT(*) FROM permisos_operacion
UNION ALL
SELECT 'permisos_operacion_actividades', COUNT(*) FROM permisos_operacion_actividades
UNION ALL
SELECT 'permisos_construccion', COUNT(*) FROM permisos_construccion
UNION ALL
SELECT 'solvencias', COUNT(*) FROM solvencias
UNION ALL
-- Verificar tablas de configuración
SELECT 'configuracion_municipal', COUNT(*) FROM configuracion_municipal
UNION ALL
-- Verificar tablas de usuarios
SELECT 'perfiles_usuarios', COUNT(*) FROM perfiles_usuarios
ORDER BY tabla;

-- Verificar que la configuración inicial existe
SELECT * FROM configuracion_municipal WHERE id = 1;


