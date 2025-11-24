import { useAuthStore } from '@/store/authStore'
import { LogOut, User } from 'lucide-react'
import Button from '../ui/Button'

export default function Header() {
  const { user, logout } = useAuthStore()

  return (
    <header className="h-16 bg-white border-b border-neutral-border flex items-center justify-between px-xl shadow-sm">
      <div className="flex items-center gap-lg">
        <h1 className="text-h4 font-semibold text-primary">Sistema Municipal</h1>
      </div>
      
      <div className="flex items-center gap-md">
        <div className="flex items-center gap-sm text-base text-neutral-text">
          <User className="w-5 h-5" />
          <span>{user?.name}</span>
          <span className="text-small">({user?.role})</span>
        </div>
        <Button variant="secondary" onClick={logout} className="flex items-center gap-xs">
          <LogOut className="w-4 h-4" />
          Salir
        </Button>
      </div>
    </header>
  )
}

