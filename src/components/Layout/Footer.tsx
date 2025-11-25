export default function Footer() {
    return (
      <footer className="bg-white border-t border-neutral-border py-md px-xl">
        <div className="text-center text-sm text-neutral-text">
          <p>© {new Date().getFullYear()} Sistema Municipal de Permisos - Municipalidad de Marcovia</p>
        </div>
      </footer>
    )
  }