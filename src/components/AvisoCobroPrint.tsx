import { useState, useEffect } from 'react'
import { useConfiguracionPrint } from '@/lib/configuracionHelpers'

interface AvisoCobroPrintProps {
  contribuyente: {
    nombre: string
    tipo: 'permiso-operacion' | 'permiso-construccion' | 'solvencia'
    fechaVencimiento: string
  }
}

export default function AvisoCobroPrint({ contribuyente }: AvisoCobroPrintProps) {
  const [mounted, setMounted] = useState(false)
  const { logos } = useConfiguracionPrint()

  useEffect(() => {
    setMounted(true)
  }, [])

  const fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Obtener el tipo de documento en español
  const getTipoDocumento = () => {
    switch (contribuyente.tipo) {
      case 'permiso-operacion':
        return 'permiso de operación'
      case 'permiso-construccion':
        return 'permiso de construcción'
      case 'solvencia':
        return 'solvencia'
      default:
        return 'documento'
    }
  }

  // Obtener la fecha límite (31 de enero del año en curso)
  const añoActual = new Date().getFullYear()
  const fechaLimite = `31 de enero del ${añoActual}`

  if (!mounted) return null

  return (
    <div className="print-container" style={{ 
      display: 'block',
      fontFamily: 'Arial, sans-serif'
    }}>
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: block !important;
          }
        }
        @media screen {
          .print-container {
            position: relative;
            visibility: visible;
            background: white;
            padding: 20px;
          }
        }
        .document-border {
          border: 1px solid #d1d5db;
          padding: 40px;
          background: white;
          max-width: 8.5in;
          margin: 0 auto;
        }
        .header-section {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }
        .emblem-left, .emblem-right {
          width: 80px;
          height: 80px;
          display: inline-block;
          vertical-align: middle;
          margin: 0 20px;
        }
        .emblem-left {
          background: linear-gradient(135deg, #10b981 0%, #fbbf24 100%);
          border: 2px solid #4a5568;
          border-radius: 4px;
        }
        .emblem-right {
          background: linear-gradient(135deg, #3b82f6 0%, #fbbf24 100%);
          border: 2px solid #4a5568;
          border-radius: 50%;
        }
        .municipal-title {
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          margin: 20px 0;
          letter-spacing: 1px;
        }
        .document-title {
          text-align: center;
          color: #dc2626;
          font-weight: bold;
          font-size: 20px;
          margin: 30px 0;
          text-transform: uppercase;
        }
        .contribuyente-name {
          text-align: left;
          font-size: 14px;
          font-weight: bold;
          margin: 30px 0 20px 0;
          text-transform: uppercase;
        }
        .body-text {
          text-align: justify;
          font-size: 12px;
          line-height: 1.8;
          margin: 15px 0;
        }
        .footer-section {
          text-align: center;
          font-size: 12px;
          margin-top: 40px;
        }
        .signature-section {
          margin-top: 50px;
          text-align: center;
        }
        .signature-line {
          border-top: 1px solid #000;
          width: 300px;
          margin: 0 auto 5px auto;
        }
        .signature-label {
          font-size: 11px;
          margin-top: 5px;
        }
      `}</style>

      <div className="document-border">
        <div className="header-section">
          {logos.logoAlcaldia ? (
            <img src={logos.logoAlcaldia} alt="Logo Alcaldía" className="w-20 h-20 object-contain inline-block mx-4" />
          ) : (
            <div className="emblem-left"></div>
          )}
          <div className="municipal-title">
            ALCALDÍA MUNICIPAL DE MARCOVIA, CHOLUTECA
          </div>
          {logos.logoSegundo ? (
            <img src={logos.logoSegundo} alt="Logo Segundo" className="w-20 h-20 object-contain inline-block mx-4" />
          ) : (
            <div className="emblem-right"></div>
          )}
        </div>

        <div className="document-title">
          AVISO DE COBRO
        </div>

        <div className="contribuyente-name">
          {contribuyente.nombre}
        </div>

        <div className="body-text">
          <p>
            Estimado/a contribuyente, favor presentarse al departamento de Administración Tributaria y cancelar la renovación de su {getTipoDocumento()}, recuerde que la fecha límite para la renovación vence el día {fechaLimite}.
          </p>
        </div>

        <div className="body-text">
          <p>
            La no renovación de su aviso de cobro en la fecha estipulada, según la ley de municipalidades nos obliga a cobrar multa por operar sin {getTipoDocumento()}.
          </p>
        </div>

        <div className="footer-section">
          Alcaldía Municipal de Marcovia, Choluteca {fechaActual}
        </div>

        <div className="signature-section">
          <div className="signature-line"></div>
          <div className="signature-label">(Firma y sello)</div>
          <div className="signature-label" style={{ marginTop: '10px' }}>
            Jefe de administración tributaria
          </div>
        </div>
      </div>
    </div>
  )
}






