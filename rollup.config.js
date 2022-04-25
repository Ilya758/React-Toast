import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { babel } from '@rollup/plugin-babel';
import url from '@rollup/plugin-url';
const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  plugins: [],
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
    },
  ],
  plugins: [
    alias({
      entries: [
        {
          find: '@src',
          replacement: path.join(__dirname, './src'),
        },
        {
          find: '@images',
          replacement: path.resolve(__dirname, './src/assets'),
        },
      ],
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react', '@babel/preset-env'],
    }),
    url(),
    resolve(),
    peerDepsExternal(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
};
