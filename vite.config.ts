import {defineConfig} from 'vite'
import {resolve} from 'path'

export default defineConfig({
    // Dynamic base path for GitHub Pages deployment
    base: process.env.VITE_BASE_PATH || '/',

    // Development server configuration
    server: {
        port: 3000,
        open: true,
    },

    // Root directory for dev server (demo folder)
    root: 'demo',

    // Build configuration (for demo build, not library build)
    build: {
        outDir: '../dist-demo',
        emptyOutDir: true,
    },

    // Path resolution
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },

    // TypeScript configuration
    esbuild: {
        target: 'es2022',
    },

    // Public directory
    publicDir: '../public',
})