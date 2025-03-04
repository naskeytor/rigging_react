import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs/promises';
import * as path from 'path';

const certPath = '/app/certs';

async function loadCerts() {
  try {
    const key = await fs.readFile(`${certPath}/key.pem`);
    const cert = await fs.readFile(`${certPath}/cert.pem`);
    return { key, cert };
  } catch (error) {
    console.warn('⚠️ No se encontraron certificados SSL, usando HTTP en lugar de HTTPS.');
    return {};
  }
}

export default defineConfig(async () => {
  const ssl = await loadCerts();

  return {
    server: {
      https: ssl,
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'https://server:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});