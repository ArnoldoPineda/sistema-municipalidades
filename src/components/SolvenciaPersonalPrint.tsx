import { useEffect, useState } from 'react'

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
  const fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const añoActual = new Date().getFullYear()

  return (
    <div className="print-container" style={{ 
      display: 'block',
      fontFamily: 'Arial, sans-serif'
    }}>
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0.75in;
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
        .document-wrapper {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 20px;
          background: white;
        }
        .header-section {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        .emblem-left {
          width: 100px;
          height: 100px;
          border: 3px solid #d4af37;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .emblem-right {
          width: 100px;
          height: 100px;
          border: 3px solid #2563eb;
          border-radius: 50%;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .title-section {
          flex: 1;
          text-align: center;
        }
        .document-title {
          font-size: 16px;
          font-weight: bold;
          text-transform: uppercase;
          margin: 0;
          letter-spacing: 1px;
          line-height: 1.4;
        }
        .certificate-number {
          color: #dc2626;
          font-weight: bold;
          font-size: 14px;
          margin-top: 15px;
          text-align: center;
        }
        .intro-text {
          text-align: justify;
          margin: 30px 0 20px 0;
          line-height: 1.8;
          font-size: 12px;
        }
        .contribuyente-name {
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          margin: 25px 0;
          letter-spacing: 1px;
          color: #000;
        }
        .payment-details {
          text-align: justify;
          margin: 25px 0;
          line-height: 1.8;
          font-size: 12px;
        }
        .date-section {
          text-align: center;
          margin: 50px 0 20px 0;
          font-size: 12px;
        }
        .date-underline {
          text-decoration: underline;
        }
      `}</style>

      <div className="document-wrapper">
        {/* Header con emblemas y título */}
        <div className="header-section">
          <div className="emblem-left"></div>
          <div className="title-section">
            <div className="document-title">
              CONSTANCIA DE PAGO DE IMPUESTOS PERSONALES MUNICIPALES
            </div>
            <div className="certificate-number">
              N°. {solvencia.numeroSolvencia}
            </div>
          </div>
          <div className="emblem-right"></div>
        </div>

        {/* Intro Text */}
        <div className="intro-text">
          El suscrito, <strong>HACE CONSTAR:</strong> Que el contribuyente
        </div>

        {/* Contribuyente Name */}
        <div className="contribuyente-name">
          {solvencia.nombreContribuyente}
        </div>

        {/* Payment Details */}
        <div className="payment-details">
          Ha pagado sus Impuestos Municipales correspondientes al año {añoActual} <strong>ARTÍCULO No. 77</strong> (Según reforma por decreto 48-91). Toda persona natural pagará anualmente un impuesto personal único, sobre sus ingresos anuales en el municipio en que lo perciba.
        </div>

        {/* Date */}
        <div className="date-section">
          MARCOVIA, CHOLUTECA <span className="date-underline">{fechaActual.split(' ').map(word => word.toUpperCase()).join(' ')}</span>
        </div>
      </div>
    </div>
  )
}