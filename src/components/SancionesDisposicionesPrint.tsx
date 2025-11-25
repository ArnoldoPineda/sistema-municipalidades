interface SancionesDisposicionesPrintProps {
  permiso: {
    numeroRecibo: string
    valorRecibo: string
  }
}

export default function SancionesDisposicionesPrint({ permiso }: SancionesDisposicionesPrintProps) {

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
          text-align: center;
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
    </div>
  )
}





