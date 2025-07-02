import {defineConfig} from 'tsup';
import _ from 'lodash';
import pkg from './package.json';
import {generateBanner} from "@phucbm/banner";

// Extract the package name without namespace
const getPackageName = (fullName: string): string => {
    return fullName.includes('/') ? fullName.split('/')[1] : fullName;
};

const packageName = getPackageName(pkg.name);
const globalName = _.upperFirst(_.camelCase(packageName));

const banner = generateBanner(pkg);

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
        entry: {[packageName]: 'src/umd.ts'},
        outDir: 'dist',
        format: ['iife'],
        target: 'es2020',
        platform: 'browser',
        globalName: globalName,
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
        entry: {[packageName]: 'src/umd.ts'},
        outDir: 'dist',
        format: ['iife'],
        target: 'es2020',
        platform: 'browser',
        globalName: globalName,
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
            console.log(`   • dist/${packageName}.js`);
            console.log(`   • dist/${packageName}.min.js`);
            console.log(`   • dist/index.d.ts\n`);
        }
    }
]);