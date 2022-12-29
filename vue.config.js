const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  transpileDependencies: true,
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  devServer: process.env.NODE_ENV === 'development' ? {allowedHosts: 'all'} : {},   // 允许所有域名访问，内网穿透时使用
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    name: 'vue-xx',
    externals: {
      /**
       * externals 对象属性解析。
       *  基本格式：
       *     '包名' : '在项目中引入的名字'
       *
       */
      // vue: 'vue',
      // '@doxlab/atomleaf': 'atomleaf',
      // 'ant-design-vue': 'Antd',
    },
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve('./node_modules/vue'),
      },
    },
  },
  chainWebpack(config) {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
})
