/**
 * Script para generar componentes en Figma usando la API
 * 
 * REQUISITOS:
 * 1. Instalar dependencias: npm install
 * 2. Crear archivo .env con:
 *    FIGMA_ACCESS_TOKEN=tu_token_aqui
 *    FIGMA_FILE_KEY=tu_file_key_aqui
 * 3. Ejecutar: npm run generate-components
 * 
 * NOTA: Este script es una guía. Necesitarás adaptarlo según
 * la estructura exacta de tu archivo de Figma.
 */

require('dotenv').config();

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_KEY) {
  console.error('❌ Error: Faltan variables de entorno');
  console.log('Crea un archivo .env con:');
  console.log('FIGMA_ACCESS_TOKEN=tu_token');
  console.log('FIGMA_FILE_KEY=tu_file_key');
  process.exit(1);
}

// Especificaciones de componentes desde el JSON
const componentsSpec = require('../figma-components-spec.json');

/**
 * Función para crear un botón en Figma
 */
function createButtonSpec(type, config) {
  return {
    name: `Button/${type}`,
    type: 'COMPONENT',
    layoutMode: 'HORIZONTAL',
    paddingLeft: config.paddingX,
    paddingRight: config.paddingX,
    paddingTop: config.paddingY,
    paddingBottom: config.paddingY,
    itemSpacing: 0,
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'FIXED',
    counterAxisAlignItems: 'CENTER',
    fills: [{ type: 'SOLID', color: hexToRgb(config.background) }],
    cornerRadius: config.borderRadius,
    effects: [],
    characters: type === 'Primary' ? 'Button' : type,
    style: {
      fontFamily: 'Inter',
      fontSize: config.fontSize || 16,
      fontWeight: 400,
      fillStyleId: config.textColor
    }
  };
}

/**
 * Función para crear un input en Figma
 */
function createInputSpec(type, config) {
  return {
    name: `Input/${type}`,
    type: 'FRAME',
    layoutMode: 'VERTICAL',
    paddingLeft: config.paddingX,
    paddingRight: config.paddingX || config.paddingRight,
    paddingTop: config.paddingY,
    paddingBottom: config.paddingY,
    fills: [{ type: 'SOLID', color: hexToRgb(config.background) }],
    strokes: [{ type: 'SOLID', color: hexToRgb(config.states.default.border) }],
    strokeWeight: 1,
    cornerRadius: config.borderRadius
  };
}

/**
 * Función para crear una card en Figma
 */
function createCardSpec(type, config) {
  return {
    name: `Card/${type}`,
    type: 'FRAME',
    layoutMode: 'VERTICAL',
    paddingLeft: config.padding,
    paddingRight: config.padding,
    paddingTop: config.padding,
    paddingBottom: config.padding,
    fills: [{ type: 'SOLID', color: hexToRgb(config.background) }],
    strokes: [{ type: 'SOLID', color: hexToRgb(config.border.split(' ')[2]) }],
    strokeWeight: 1,
    cornerRadius: config.borderRadius,
    effects: [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 1 },
      radius: 3
    }]
  };
}

/**
 * Convertir hex a RGB
 */
function hexToRgb(hex) {
  if (hex === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

/**
 * Generar especificaciones para todos los componentes
 */
function generateAllComponents() {
  const specs = {
    buttons: [],
    inputs: [],
    cards: [],
    badges: [],
    tables: [],
    modal: []
  };

  // Botones
  Object.entries(componentsSpec.components.buttons).forEach(([type, config]) => {
    specs.buttons.push(createButtonSpec(type, config));
  });

  // Inputs
  Object.entries(componentsSpec.components.inputs).forEach(([type, config]) => {
    specs.inputs.push(createInputSpec(type, config));
  });

  // Cards
  Object.entries(componentsSpec.components.cards).forEach(([type, config]) => {
    specs.cards.push(createCardSpec(type, config));
  });

  return specs;
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Generando especificaciones de componentes...\n');

  const specs = generateAllComponents();

  console.log('✅ Especificaciones generadas:');
  console.log(`   - ${specs.buttons.length} botones`);
  console.log(`   - ${specs.inputs.length} inputs`);
  console.log(`   - ${specs.cards.length} cards\n`);

  console.log('📋 NOTA: Este script genera las especificaciones.');
  console.log('   Para crear los componentes en Figma, necesitarás:');
  console.log('   1. Usar la API de Figma directamente');
  console.log('   2. O crear los componentes manualmente siguiendo');
  console.log('      las especificaciones en ESPECIFICACIONES-COMPONENTES.md\n');

  console.log('📄 Especificaciones guardadas en:');
  console.log('   - figma-components-spec.json');
  console.log('   - ESPECIFICACIONES-COMPONENTES.md\n');

  // Guardar especificaciones generadas
  const fs = require('fs');
  fs.writeFileSync(
    'generated-components-specs.json',
    JSON.stringify(specs, null, 2)
  );

  console.log('✅ Archivo generated-components-specs.json creado');
}

// Ejecutar
main().catch(console.error);



