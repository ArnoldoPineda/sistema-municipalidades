import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

interface PermisoConstruccionPrintProps {
  permiso: {
    id: string
    concedePermisoA: string
    numeroIdentidad: string
    claveCatastral: string
    paraConstruir: string
    fechaCreacion: string
    ubicacion?: string
    presupuesto?: string
    nombreConstructor?: string
    numeroRecibo?: string
    valorRecibo?: string
  }
  soloPermiso?: boolean
}

export default function PermisoConstruccionPrint({ permiso, soloPermiso = false }: PermisoConstruccionPrintProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })


  const numeroPermiso = permiso.id.padStart(5, '0')

  // Generar texto para QR Code
  const qrData = JSON.stringify({
    tipo: 'Permiso de Construcción',
    numero: numeroPermiso,
    solicitante: permiso.concedePermisoA,
    fecha: permiso.fechaCreacion
  })

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
        .permit-border {
          border: 10px solid #4a5568;
          border-image: none;
          padding: 30px;
          background: white;
          max-width: 8.5in;
          margin: 0 auto;
          position: relative;
          box-shadow: 0 0 0 2px #2d3748;
        }
        .permit-content {
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
          margin-bottom: 15px;
          letter-spacing: 1px;
        }
        .permit-type-box {
          border: 3px solid #000;
          padding: 15px;
          margin: 20px auto;
          display: inline-block;
          font-size: 20px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .permit-number {
          position: absolute;
          top: -5px;
          left: 10px;
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
        .solicitante-name {
          font-size: 24px;
          font-weight: bold;
          color: #0066CC;
          text-transform: uppercase;
          text-align: center;
          margin: 25px 0;
          letter-spacing: 1px;
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
          min-width: 220px;
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
          margin-top: -80px;
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
        .expiration-date {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          font-weight: bold;
        }
        .sanciones-section, .disposiciones-section {
          margin: 30px 0;
        }
        .section-title {
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          text-decoration: underline;
          margin-bottom: 15px;
          color: #1a202c;
        }
        .recibo-section {
          margin-top: 50px;
          padding-top: 30px;
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
          min-width: 100px;
        }
        .recibo-value-box {
          border: 1px solid #2d3748;
          padding: 8px 15px;
          min-width: 200px;
          font-size: 12px;
          background: #f9fafb;
          display: inline-block;
        }
        .section-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .section-list li {
          margin-bottom: 12px;
          padding-left: 20px;
          position: relative;
          line-height: 1.6;
          font-size: 12px;
          text-align: justify;
        }
        .section-list li:before {
          content: "•";
          position: absolute;
          left: 0;
          font-weight: bold;
          font-size: 16px;
        }
      `}</style>

      <div className="permit-border">
        <div className="permit-content">
          {/* Header */}
          <div className="header-section">
            <div className="permit-number">N° {numeroPermiso}</div>
            <div className="crest-placeholder"></div>
            <div className="municipal-title">
              ALCALDÍA MUNICIPAL DE MARCOVIA, CHOLUTECA
            </div>
            <div className="crest-placeholder"></div>
            
            <div className="permit-type-box">
              PERMISO DE CONSTRUCCIÓN
            </div>
          </div>

          {/* Intro Text */}
          <div className="intro-text" style={{ marginBottom: '15px' }}>
            El Suscrito Jefe del departamento de Catastro Municipal
          </div>

          {/* Solicitante Name */}
          <div className="solicitante-name" style={{ fontSize: '20px', marginBottom: '20px' }}>
            Concede permiso a: {permiso.concedePermisoA}
          </div>

          {/* QR Code */}
          <div className="qr-section">
            {mounted && (
              <QRCodeSVG value={qrData} size={100} />
            )}
          </div>

          {/* Information Fields */}
          <div className="info-section">
            <div className="info-row">
              <div className="info-label">No. de identidad:</div>
              <div className="info-value">{permiso.numeroIdentidad}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Clave catastral:</div>
              <div className="info-value">{permiso.claveCatastral}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Para construir:</div>
              <div className="info-value">{permiso.paraConstruir}</div>
            </div>
          </div>

          {/* Descripción de la Obra */}
          <div className="info-section" style={{ marginTop: '30px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '15px', textTransform: 'uppercase' }}>
              DESCRIPCIÓN DE LA OBRA:
            </div>
            {permiso.ubicacion && (
              <div className="info-row">
                <div className="info-label">Ubicación:</div>
                <div className="info-value">{permiso.ubicacion}</div>
              </div>
            )}
            {permiso.presupuesto && (
              <div className="info-row">
                <div className="info-label">Presupuesto en lps.:</div>
                <div className="info-value">
                  {parseFloat(permiso.presupuesto).toLocaleString('es-HN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
            )}
            {permiso.nombreConstructor && (
              <div className="info-row">
                <div className="info-label">Nombre del constructor:</div>
                <div className="info-value">{permiso.nombreConstructor}</div>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="date-section">
            MARCOVIA, CHOLUTECA {fechaActual.split(' ').map(word => word.toUpperCase()).join(' ')}
          </div>

          {/* Signature */}
          <div className="signatures-section" style={{ justifyContent: 'flex-start', marginTop: '40px' }}>
            <div className="signature-box" style={{ width: '300px' }}>
              <div className="signature-line"></div>
              <div className="signature-label">Vo.Bo. Jefe de catastro</div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda Página - Anulaciones, Disposiciones y Recibo (solo si no es soloPermiso) */}
      {!soloPermiso && (
        <div className="permit-border" style={{ marginTop: '20px', pageBreakBefore: 'always' }}>
          <div className="permit-content">
            {/* Este Permiso Será Anulado */}
            <div className="sanciones-section">
              <h3 className="section-title" style={{ textAlign: 'left', textDecoration: 'none' }}>
                ESTE PERMISO SERÁ ANULADO POR LO SIGUIENTE:
              </h3>
              <ul className="section-list">
                <li>
                  Que el valor reportado sea inferior al valor real de la obra de construcción.
                </li>
                <li>
                  En caso de no cumplir con la zonificación, el alineamiento o construir en zona de área verde, 
                  si este fuera el caso la construcción le será demolida y los gastos correrán por cuenta del 
                  propietario de la obra.
                </li>
              </ul>
            </div>

            {/* Disposiciones */}
            <div className="disposiciones-section">
              <h3 className="section-title" style={{ textAlign: 'left', textDecoration: 'none' }}>
                DISPOSICIONES
              </h3>
              <ul className="section-list">
                <li>
                  Una vez terminada la obra, tiene 30 días para declarar las mejoras, caso contrario se 
                  sancionará conforme a ley.
                </li>
                <li>
                  Este permiso debe de estar visible en el sitio de la construcción.
                </li>
                <li>
                  Este permiso tiene vigencia de un (1) año después de la fecha de emisión.
                </li>
              </ul>
            </div>

            {/* Información del Recibo */}
            {(permiso.numeroRecibo || permiso.valorRecibo) && (
              <div className="recibo-section">
                <div className="recibo-row">
                  <span className="recibo-label">Recibo No.</span>
                  <span className="recibo-value-box">{permiso.numeroRecibo || 'N/A'}</span>
                </div>
                <div className="recibo-row">
                  <span className="recibo-label">por Lps.</span>
                  <span className="recibo-value-box">
                    {permiso.valorRecibo 
                      ? parseFloat(permiso.valorRecibo).toLocaleString('es-HN', { 
                          minimumFractionDigits: 2, 
                          maximumFractionDigits: 2 
                        })
                      : '0.00'
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

