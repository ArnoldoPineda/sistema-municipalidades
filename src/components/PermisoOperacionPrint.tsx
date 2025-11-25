import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useConfiguracionPrint, getTamañoFirmaStyle } from '@/lib/configuracionHelpers'

interface PermisoOperacionPrintProps {
  permiso: {
    id: string
    nombreNegocio: string
    propietario: string
    aldea: string
    barrioColonia: string
    direccion: string
    rtnEmpresa: string
    identidad: string
    actividadesEconomicas: string[]
    numeroRecibo: string
    valorRecibo: string
    fechaCreacion: string
  }
  soloPermiso?: boolean
}

export default function PermisoOperacionPrint({ permiso, soloPermiso = false }: PermisoOperacionPrintProps) {
  const [mounted, setMounted] = useState(false)
  const { firmas, logos, estilo } = useConfiguracionPrint()
  const tamañoFirma = getTamañoFirmaStyle(estilo.permisosOperacion.tamañoFirma)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const fechaVencimiento = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

  const numeroPermiso = permiso.id.padStart(5, '0')

  // Generar texto para QR Code
  const qrData = JSON.stringify({
    tipo: 'Permiso de Operación',
    numero: numeroPermiso,
    negocio: permiso.nombreNegocio,
    propietario: permiso.propietario,
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
        .business-name {
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
      `}</style>

      <div className="permit-border">
        <div className="permit-content">
          {/* Header */}
          <div className="header-section">
            <div className="permit-number">N° {numeroPermiso}</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', margin: '15px 0' }}>
              {logos.logoAlcaldia ? (
                <img src={logos.logoAlcaldia} alt="Logo Alcaldía" className="w-20 h-20 object-contain" />
              ) : (
                <div className="crest-placeholder"></div>
              )}
              {logos.logoSegundo && (
                <img src={logos.logoSegundo} alt="Logo Segundo" className="w-20 h-20 object-contain" />
              )}
            </div>
            <div className="municipal-title">
              ALCALDÍA MUNICIPAL DE MARCOVIA, CHOLUTECA
            </div>
            
            <div className="permit-type-box">
              PERMISO DE OPERACIÓN
            </div>
          </div>

          {/* Intro Text */}
          <div className="intro-text">
            Habiendo cumplido con los requisitos establecido en el reglamento que 
            institucionaliza el proceso de emisión y obtención del permiso de operación 
            simplificado, se le otorga el presente permiso a:
          </div>

          {/* Business Name */}
          <div className="business-name">
            {permiso.nombreNegocio}
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
              <div className="info-label">PROPIETARIO:</div>
              <div className="info-value">{permiso.propietario}</div>
            </div>
            <div className="info-row">
              <div className="info-label">ALDEA:</div>
              <div className="info-value">{permiso.aldea}</div>
            </div>
            <div className="info-row">
              <div className="info-label">BARRIO/COLONIA:</div>
              <div className="info-value">{permiso.barrioColonia}</div>
            </div>
            <div className="info-row">
              <div className="info-label">DIRECCIÓN ACTUAL:</div>
              <div className="info-value">{permiso.direccion}</div>
            </div>
            {permiso.rtnEmpresa && (
              <div className="info-row">
                <div className="info-label">RTN DE LA EMPRESA:</div>
                <div className="info-value">{permiso.rtnEmpresa}</div>
              </div>
            )}
            <div className="info-row">
              <div className="info-label">IDENTIDAD:</div>
              <div className="info-value">{permiso.identidad}</div>
            </div>
            <div className="info-row">
              <div className="info-label">ACTIVIDAD(ES) ECONÓMICA(S):</div>
              <div className="info-value">
                {permiso.actividadesEconomicas.join(', ')}
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="date-section">
            MARCOVIA, CHOLUTECA {fechaActual.split(' ').map(word => word.toUpperCase()).join(' ')}
          </div>

          {/* Signatures */}
          <div className="signatures-section">
            <div className="signature-box">
              {firmas.alcalde ? (
                <img 
                  src={firmas.alcalde} 
                  alt="Firma Alcalde" 
                  style={tamañoFirma}
                  className="object-contain mx-auto"
                />
              ) : (
                <div className="signature-line"></div>
              )}
              <div className="signature-label">Alcalde municipal</div>
            </div>
            <div className="signature-box">
              {firmas.juez ? (
                <img 
                  src={firmas.juez} 
                  alt="Firma Juez" 
                  style={tamañoFirma}
                  className="object-contain mx-auto"
                />
              ) : (
                <div className="signature-line"></div>
              )}
              <div className="signature-label">Juez de justicia municipal</div>
            </div>
          </div>

          {/* Expiration Date */}
          <div className="expiration-date">
            Fecha de vencimiento: {fechaVencimiento}
          </div>
        </div>
      </div>

      {/* Segunda Página - Sanciones, Disposiciones y Recibo (solo si no es soloPermiso) */}
      {!soloPermiso && (
        <div className="permit-border" style={{ marginTop: '20px', pageBreakBefore: 'always' }}>
          <div className="permit-content">
            {/* Sanciones y Multas */}
            <div className="sanciones-section">
              <h3 className="section-title">SANCIONES Y MULTAS</h3>
              <ul className="section-list">
                <li>
                  Por no cumplir con sus pagos mensuales según declaración presentada o tasación de oficio.
                </li>
                <li>
                  Por incumplimiento de las normas establecidas para el funcionamiento de los negocios, 
                  estipuladas en el Plan de Arbitrios Municipal vigente.
                </li>
                <li>
                  Por alterar el orden y la tranquilidad pública, el bienestar general, la moral y las buenas costumbres.
                </li>
              </ul>
            </div>

            {/* Disposiciones */}
            <div className="disposiciones-section">
              <h3 className="section-title">DISPOSICIONES</h3>
              <ul className="section-list">
                <li>
                  Este permiso debe de estar visible en el negocio.
                </li>
                <li>
                  Si usted cierra su negocio debe de notificarlo al departamento de administración 
                  tributaria de la municipalidad.
                </li>
                <li>
                  Si traspasa su negocio a otra persona o cambia de domicilio debe de notificarlo a la municipalidad.
                </li>
                <li>
                  Este permiso vence el 31 de diciembre del año solicitado, se debe de renovar en el mes de enero.
                </li>
              </ul>
            </div>

            {/* Información del Recibo */}
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
          </div>
        </div>
      )}
    </div>
  )
}

