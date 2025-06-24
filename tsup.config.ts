import {defineConfig} from 'tsup';
import pkg from './package.json';

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['esm'],
    target: 'node18',
    platform: 'node',
    bundle: true,
    minify: true,
    sourcemap: true,
    clean: false, // We handle cleaning in package.json script
    shims: false,
    splitting: false,
    external: [
        // Don't bundle Node.js built-ins
        'child_process',
        'fs',
        'path',
        'url'
    ],
    onSuccess: async () => {
        console.log(`\n${pkg.description} v${pkg.version} bundled successfully!\n`);
    }
});