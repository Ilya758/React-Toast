import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { babel } from '@rollup/plugin-babel';
import svg from 'rollup-plugin-svg-import';

const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  plugins: [
    alias({
      resolve: [
        '.png',
        '.svg',
        '.jpeg',
        '.jpg',
        '.json',
        '.html',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
      ],
      entries: [
        {
          find: '@src',
          replacement: path.join(__dirname, './src/'),
        },
        {
          find: '@images',
          replacement: path.join(__dirname, './src/assets/'),
        },
      ],
    }),
  ],
  external: ['success', 'error', 'info', 'warn', 'close'].map(
    el => `@images/svg/icon-${el}.svg`
  ),
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      // exports: 'named',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react', '@babel/preset-env'],
    }),
    resolve(),
    peerDepsExternal(),
    svg({
      stringify: true,
    }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
};
