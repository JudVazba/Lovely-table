// vite.config.ts

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/uxDataTable.ts'),
      name: 'LovelyTable',
      fileName: (format) => `uxDataTable.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [
        'lit', 
        'lit/decorators.js', 
        'lit/directives/repeat.js', 
        'lit/directives/class-map.js',
        'lit/directives/style-map.js'
      ],
      output: {
        globals: {
          lit: 'Lit',
          'lit/decorators.js': 'LitDecorators',
          'lit/directives/repeat.js': 'LitRepeat',
          'lit/directives/class-map.js': 'LitClassMap',
          'lit/directives/style-map.js': 'LitStyleMap'
        }
      }
    }
  }
});