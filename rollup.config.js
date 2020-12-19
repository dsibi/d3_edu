import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const watch = process.env.ROLLUP_WATCH

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        globals: {
            'vega': 'vega',
            'vega-lite': 'vegaLite',
            'vega-lite-api': 'vl',
            'vega-tooltip': 'vegaTooltip',
            'd3': 'd3'
        }
    },
    onwarn: function(warning, warn) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') return;
        warn(warning);
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        resolve({
            browser: true
        }),
        babel({
            presets: [
                ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            babelHelpers: 'bundled'
        }),
        commonjs(),
        watch && serve('dist'),
        watch && livereload()
    ],
    watch: {
        clearScreen: false
    }
}