import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface SolvenciaQRPrintProps {
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

export default function SolvenciaQRPrint({ solvencia }: SolvenciaQRPrintProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const qrData = JSON.stringify({
    tipo: 'solvencia-personal',
    numero: solvencia.numeroSolvencia,
    contribuyente: solvencia.nombreContribuyente,
    fecha: solvencia.fechaCreacion
  })

  // Fecha de vencimiento: 31 de diciembre del año actual
  const añoActual = new Date().getFullYear()
  const fechaVencimiento = `31 DE DICIEMBRE DE ${añoActual}`

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
        .document-container {
          max-width: 8.5in;
          margin: 0 auto;
          text-align: center;
          padding: 40px;
        }
        .document-number {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #1a202c;
        }
        .qr-code {
          margin: 30px auto;
          display: inline-block;
        }
        .valid-until {
          font-size: 14px;
          font-weight: bold;
          margin: 30px 0 20px 0;
          text-transform: uppercase;
        }
        .valid-date {
          font-size: 14px;
          margin-bottom: 50px;
          text-transform: uppercase;
        }
        .signature-section {
          margin-top: 60px;
        }
        .signature-line {
          border-top: 1px solid #000;
          width: 300px;
          margin: 0 auto 5px auto;
        }
        .signature-label {
          font-size: 12px;
          text-transform: uppercase;
          margin-top: 5px;
        }
      `}</style>

      <div className="document-container">
        <div className="document-number">
          {solvencia.numeroSolvencia}
        </div>

        <div className="qr-code">
          <QRCodeSVG value={qrData} size={150} />
        </div>

        <div className="valid-until">
          VÁLIDO HASTA:
        </div>

        <div className="valid-date">
          {fechaVencimiento}
        </div>

        <div className="signature-section">
          <div className="signature-line"></div>
          <div className="signature-line" style={{ marginTop: '40px' }}></div>
          <div className="signature-label">
            Alcalde Municipal
          </div>
        </div>
      </div>
    </div>
  )
}





