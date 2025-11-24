import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-background p-md">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center gap-lg">
          {/* Logo placeholder */}
          <div className="w-20 h-20 bg-primary-background rounded-full flex items-center justify-center">
            <span className="text-h2 font-bold text-primary">M</span>
          </div>

          <h2 className="text-h2 font-semibold">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-md">
            <Input
              type="email"
              label="Usuario"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-xs text-danger">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>

            <a
              href="#"
              className="text-small text-primary text-center hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>
      </Card>
    </div>
  )
}

