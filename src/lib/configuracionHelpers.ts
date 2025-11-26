import { useConfiguracionStore } from '@/store/configuracionStore'

export const getTamañoFirmaStyle = (tamaño: 'pequeño' | 'mediano' | 'grande') => {
  switch (tamaño) {
    case 'pequeño':
      return { width: '150px', height: '60px' }
    case 'mediano':
      return { width: '200px', height: '80px' }
    case 'grande':
      return { width: '250px', height: '100px' }
    default:
      return { width: '200px', height: '80px' }
  }
}

export const useConfiguracionPrint = () => {
  const { configuracion } = useConfiguracionStore()
  
  return {
    firmas: configuracion?.firmas || {
      alcalde: null,
      juez: null,
      jefeCatastro: null
    },
    logos: configuracion?.logos || {
      logoAlcaldia: null,
      logoSegundo: null
    },
    estilo: configuracion?.estilo || {
      permisosOperacion: { estilo: 'vertical', tamañoFirma: 'mediano' },
      permisosConstruccion: { estilo: 'vertical', tamañoFirma: 'mediano' },
      solvencias: { estilo: 'vertical', tamañoFirma: 'mediano' }
    }
  }
}






