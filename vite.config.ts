import { defineConfig } from 'vite'
// import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
import mkCert from 'vite-plugin-mkcert'

type Config = {
  mode: string
  command: string
  isSsrBuild: boolean
  isPreview: boolean
}

// https://vite.dev/config/
export default async (config: Config) => {
  const env = {
    DEV: config.mode === 'development',
    PROD: config.mode === 'production',
  }

  return defineConfig({
    define: {
      'process.env': env,

      // Content-Security-Policy Error Fix for vue-i18n
      // https://stackoverflow.com/questions/77288512/vite-vue-3-built-project-content-security-policy-error-csp-script-src-self
      __INTLIFY_JIT_COMPILATION__: true,
    },
    plugins: [react(), commonjs(), mkCert()],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: {
        // '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
}
