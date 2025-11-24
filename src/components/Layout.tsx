import { Outlet } from 'react-router-dom'
import Header from './Layout/Header'
import Sidebar from './Layout/Sidebar'
import Footer from './Layout/Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-xl">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}



