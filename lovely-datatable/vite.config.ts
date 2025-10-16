// vite.config.ts (DE TU PROYECTO DE PRUEBA/DEMO)

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Desactivamos la limpieza solo para asegurar que los archivos del build de la librería no se borren
  build: {
    emptyOutDir: false, 
    
    // CONFIGURACIÓN CLAVE PARA MÚLTIPLES PÁGINAS (Rollup Options)
    rollupOptions: {
      input: {
        // 1. Entrada principal
        main: resolve(__dirname, 'index.html'),
        
        // 2. Entradas de las demos (¡AÑADE TODAS LAS QUE NECESITES AQUÍ!)
        demo_pastel: resolve(__dirname, 'demos/demo-pastel.html'),
        demo_dark: resolve(__dirname, 'demos/demo-dark.html'),
        demo_max: resolve(__dirname, 'demos/demo-max-columns.html'), 
        
        // Si tienes más, sigue la misma estructura:
        // otro_demo: resolve(__dirname, 'demos/nombre-del-archivo.html'),
      }
    }
  }
});