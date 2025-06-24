import {defineConfig} from 'tsup';
import pkg from './package.json';

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * @license ${pkg.license}
 */
`;

export default defineConfig([
    // ESM build
    {
        entry: ['src/index.ts'],
        outDir: 'dist',
        format: ['esm'],
        target: 'es2020',
        platform: 'browser',
        bundle: true,
        minify: false,
        sourcemap: true,
        dts: true,
        clean: true,
        outExtension: () => ({js: '.js'}),
        banner: {js: banner},
        onSuccess: async () => console.log('✅ ESM build completed')
    },

    // ESM minified build
    {
        entry: ['src/index.ts'],
        outDir: 'dist',
        format: ['esm'],
        target: 'es2020',
        platform: 'browser',
        bundle: true,
        minify: true,
        sourcemap: true,
        dts: false,
        clean: false,
        outExtension: () => ({js: '.min.js'}),
        banner: {js: banner},
        onSuccess: async () => console.log('✅ ESM minified build completed')
    },

    // UMD build
    {
        entry: {'magnetic-button': 'src/umd.ts'},
        outDir: 'dist',
        format: ['iife'],
        target: 'es2020',
        platform: 'browser',
        globalName: 'MagneticButton',
        bundle: true,
        minify: false,
        sourcemap: true,
        dts: false,
        clean: false,
        outExtension: () => ({js: '.js'}),
        banner: {js: banner},
        onSuccess: async () => console.log('✅ UMD build completed')
    },

    // UMD minified build
    {
        entry: {'magnetic-button': 'src/umd.ts'},
        outDir: 'dist',
        format: ['iife'],
        target: 'es2020',
        platform: 'browser',
        globalName: 'MagneticButton',
        bundle: true,
        minify: true,
        sourcemap: true,
        dts: false,
        clean: false,
        outExtension: () => ({js: '.min.js'}),
        banner: {js: banner},
        onSuccess: async () => {
            console.log('✅ UMD minified build completed');
            console.log(`\n🎉 ${pkg.description} v${pkg.version} - All builds completed successfully!\n`);
            console.log(`📦 Generated files:`);
            console.log(`   • dist/index.js`);
            console.log(`   • dist/index.min.js`);
            console.log(`   • dist/magnetic-button.js`);
            console.log(`   • dist/magnetic-button.min.js`);
            console.log(`   • dist/index.d.ts\n`);
        }
    }
]);
