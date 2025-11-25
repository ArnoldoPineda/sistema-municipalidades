import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface SolvenciaPersonalPrintProps {
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

export default function SolvenciaPersonalPrint({ solvencia }: SolvenciaPersonalPrintProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const qrData = JSON.stringify({
    tipo: 'solvencia-personal',
    numero: solvencia.numeroSolvencia,
    contribuyente: solvencia.nombreContribuyente,
    fecha: solvencia.fechaCreacion
  })

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
            position: fixed;
            left: -9999px;
            top: -9999px;
            visibility: hidden;
          }
        }
        .solvencia-border {
          border: 10px solid #4a5568;
          border-image: none;
          padding: 30px;
          background: white;
          max-width: 8.5in;
          margin: 0 auto;
          position: relative;
          box-shadow: 0 0 0 2px #2d3748;
        }
        .solvencia-content {
          border: 2px solid #2d3748;
          padding: 25px;
          background: white;
        }
        .header-section {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }
        .municipal-title {
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }
        .municipal-subtitle {
          font-size: 14px;
          text-transform: uppercase;
          margin-bottom: 15px;
          letter-spacing: 0.5px;
        }
        .solvencia-type-box {
          border: 3px solid #000;
          padding: 15px;
          margin: 20px auto;
          display: inline-block;
          font-size: 20px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .solvencia-number {
          position: absolute;
          top: -5px;
          right: 20px;
          color: #dc2626;
          font-weight: bold;
          font-size: 14px;
          background: white;
          padding: 0 5px;
        }
        .crest-placeholder {
          width: 70px;
          height: 70px;
          border: 2px solid #4a5568;
          border-radius: 50%;
          display: inline-block;
          margin: 0 15px;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
          vertical-align: middle;
        }
        .intro-text {
          text-align: justify;
          margin: 20px 0;
          line-height: 1.6;
          font-size: 12px;
        }
        .info-section {
          margin: 25px 0;
        }
        .info-row {
          border-bottom: 1px solid #e2e8f0;
          padding: 10px 0;
          display: flex;
          align-items: flex-start;
          min-height: 25px;
        }
        .info-label {
          font-weight: bold;
          min-width: 250px;
          text-transform: uppercase;
          font-size: 11px;
          color: #2d3748;
        }
        .info-value {
          flex: 1;
          font-size: 12px;
          color: #1a202c;
        }
        .qr-section {
          float: right;
          margin-left: 20px;
          margin-top: -60px;
          margin-right: 20px;
        }
        .date-section {
          text-align: center;
          margin: 30px 0;
          font-size: 12px;
          text-transform: uppercase;
        }
        .signatures-section {
          display: flex;
          justify-content: space-around;
          margin: 50px 0 30px 0;
        }
        .signature-box {
          text-align: center;
          width: 250px;
        }
        .signature-line {
          border-top: 1px solid #000;
          margin: 50px 0 5px 0;
          height: 1px;
          width: 100%;
        }
        .signature-label {
          font-size: 11px;
          text-transform: uppercase;
        }
        .recibo-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
        }
        .recibo-row {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          gap: 15px;
        }
        .recibo-label {
          font-size: 12px;
          font-weight: bold;
          min-width: 120px;
        }
        .recibo-value-box {
          border: 1px solid #2d3748;
          padding: 8px 15px;
          min-width: 200px;
          font-size: 12px;
          background: #f9fafb;
          display: inline-block;
        }
      `}</style>

      <div className="solvencia-border">
        <div className="solvencia-content">
          <div className="header-section">
            <div className="solvencia-number">No. {solvencia.numeroSolvencia}</div>
            <div className="crest-placeholder"></div>
            <div className="municipal-title">
              MUNICIPALIDAD DE MARCOVIA
            </div>
            <div className="municipal-subtitle">
              DEPARTAMENTO DE CHOLUTECA, HONDURAS
            </div>
            <div className="solvencia-type-box">
              SOLVENCIA DE IMPUESTOS PERSONALES MUNICIPALES
            </div>
          </div>

          <div className="intro-text">
            <p>
              La Municipalidad de Marcovia, Departamento de Choluteca, Honduras, hace constar que:
            </p>
          </div>

          <div className="info-section">
            <div className="info-row">
              <div className="info-label">Nombre del Contribuyente:</div>
              <div className="info-value">{solvencia.nombreContribuyente}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Número de Identidad:</div>
              <div className="info-value">{solvencia.numeroIdentidad}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Aldea:</div>
              <div className="info-value">{solvencia.aldea}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Barrio/Colonia:</div>
              <div className="info-value">{solvencia.barrioColonia}</div>
            </div>
          </div>

          <div className="qr-section">
            <QRCodeSVG value={qrData} size={100} />
          </div>

          <div className="recibo-section">
            <div className="recibo-row">
              <div className="recibo-label">Número de Recibo:</div>
              <div className="recibo-value-box">{solvencia.numeroRecibo}</div>
            </div>
            <div className="recibo-row">
              <div className="recibo-label">Valor del Recibo:</div>
              <div className="recibo-value-box">L. {parseFloat(solvencia.valorRecibo).toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </div>

          <div className="intro-text" style={{ marginTop: '30px', clear: 'both' }}>
            <p>
              Se certifica que el contribuyente mencionado se encuentra al día con el pago de sus obligaciones 
              tributarias municipales hasta la fecha de emisión de la presente solvencia.
            </p>
          </div>

          <div className="date-section">
            <p>Marcovia, {fechaActual}</p>
          </div>

          <div className="signatures-section">
            <div className="signature-box">
              <div className="signature-line"></div>
              <div className="signature-label">Firma del Alcalde</div>
            </div>
            <div className="signature-box">
              <div className="signature-line"></div>
              <div className="signature-label">Sello de la Municipalidad</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}