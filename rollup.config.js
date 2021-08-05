import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { terser } from "rollup-plugin-terser";

const input = 'packages/index.ts';
const isProd = process.env.NODE_ENV;

const outputDir =  isProd? 'dist/' : 'example/dist/';
const fn = 'index';


const basePlugins = [ // 打包插件
  resolve(), // 查找和打包node_modules中的第三方模块
  commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
  typescript({ // 解析TypeScript
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
      },
    },
  }), 
]

const devPlugins = [];
const prodPlugins = [
  terser()  // 压缩文件
];

const plugins = [...basePlugins].concat(isProd ? prodPlugins : devPlugins);

const configs = [
  {
    input,// 打包入口
    output: { // 打包出口
      file: `${outputDir}${fn}.js`, 
      // file: 'dist/index.js', 
      format: 'esm', 
      globals: {
        'vue': 'Vue'
      }
    },
    plugins: plugins,
    external: [
      'vue',
      'vue-router',
    ],
  },
  {
    input,
    output: {
      file: `${outputDir}${fn}.d.ts`,
      format: 'esm',
    },
    plugins: [
      dts(),
    ],
    external: [
      'vue',
    ],
  }
];


export default configs
