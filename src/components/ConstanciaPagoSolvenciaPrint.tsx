import { useState, useEffect } from 'react'

interface ConstanciaPagoSolvenciaPrintProps {
  solvencia: {
    numeroSolvencia: string
    nombreContribuyente: string
    numeroIdentidad: string
    aldea: string
    barrioColonia: string
    numeroRecibo: string
    valorRecibo: string
    fechaCreacion: string
  }
}

export default function ConstanciaPagoSolvenciaPrint({ solvencia }: ConstanciaPagoSolvenciaPrintProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Formatear fecha en formato "18 DE Noviembre DE 2025"
  const fecha = new Date()
  const dia = fecha.getDate()
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  const mes = meses[fecha.getMonth()]
  const año = fecha.getFullYear()
  const fechaFormateada = `${dia} DE ${mes.charAt(0).toUpperCase() + mes.slice(1)} DE ${año}`

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
          background: linear-gradient(135deg, #dc2626 0%, #fbbf24 50%, #10b981 100%);
          border: 2px solid #4a5568;
          border-radius: 4px;
        }
        .emblem-right {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border: 2px solid #4a5568;
          border-radius: 50%;
        }
        .main-title {
          font-size: 16px;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          margin: 20px 0 10px 0;
          letter-spacing: 1px;
          line-height: 1.4;
        }
        .document-number {
          text-align: center;
          color: #dc2626;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 30px;
        }
        .body-section {
          margin: 30px 0;
        }
        .intro-text {
          text-align: center;
          font-size: 12px;
          margin-bottom: 20px;
        }
        .contribuyente-name {
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
          margin: 20px 0;
          letter-spacing: 0.5px;
        }
        .content-paragraph {
          text-align: justify;
          font-size: 12px;
          line-height: 1.8;
          margin: 20px 0;
        }
        .footer-section {
          text-align: center;
          font-size: 12px;
          text-transform: uppercase;
          margin-top: 40px;
        }
      `}</style>

      <div className="document-border">
        <div className="header-section">
          <div className="emblem-left"></div>
          <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <div className="main-title">
              CONSTANCIA DE PAGO DE IMPUESTOS PERSONALES<br />
              MUNICIPALES
            </div>
            <div className="document-number">N°. {solvencia.numeroSolvencia}</div>
          </div>
          <div className="emblem-right"></div>
        </div>

        <div className="body-section">
          <div className="intro-text">
            El suscrito, HACE CONSTAR: Que el contribuyente
          </div>
          
          <div className="contribuyente-name">
            {solvencia.nombreContribuyente}
          </div>

          <div className="content-paragraph">
            Ha pagado sus Impuestos Municipales correspondientes al año 2025 ARTÍCULO No. 77 (Según reforma por decreto 48-91). 
            Toda persona natural pagará anualmente un impuesto personal único, sobre sus ingresos anuales en el municipio en que lo perciba.
          </div>
        </div>

        <div className="footer-section">
          MARCOVIA, CHOLUTECA {fechaFormateada}
        </div>
      </div>
    </div>
  )
}

