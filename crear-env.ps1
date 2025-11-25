# Script para crear el archivo .env con la URL correcta de Supabase

$envContent = @"
# Supabase Configuration
# URL CORRECTA (corregida)
VITE_SUPABASE_URL=https://lwllwxtonylugqhtcmaw.supabase.co

# IMPORTANTE: Reemplaza 'tu-anon-key-aqui' con tu clave real de Supabase
# Obtén la clave desde: https://supabase.com/dashboard/project/lwllwxtonylugqhtcmaw/settings/api
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
"@

# Crear el archivo .env
$envContent | Out-File -FilePath .env -Encoding utf8

Write-Host "✅ Archivo .env creado con la URL correcta!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Debes editar el archivo .env y reemplazar 'tu-anon-key-aqui' con tu clave real de Supabase" -ForegroundColor Yellow
Write-Host ""
Write-Host "Para obtener tu clave:" -ForegroundColor Cyan
Write-Host "1. Ve a: https://supabase.com/dashboard/project/lwllwxtonylugqhtcmaw/settings/api" -ForegroundColor Cyan
Write-Host "2. Copia la 'anon public' key" -ForegroundColor Cyan
Write-Host "3. Pégalo en el archivo .env reemplazando 'tu-anon-key-aqui'" -ForegroundColor Cyan

