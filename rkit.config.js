const path = require('path')
const proEnv = require('./build/prod.env')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  lintOnSave: process.env.NODE_ENV !== 'production',
  assetsDir: proEnv.OUT_PATH,
  publicPath: process.env.NODE_ENV === 'production' ? `//static.yuanzidai.com/tfstatic-${proEnv.BUSINESS_TYPE}/${proEnv.PROJECT_NAME}` : '/',
  filenameHashing: true,
  productionSourceMap: false,
  projectName: proEnv.PROJECT_NAME,
  syncHost: [
      '10.12.17.48',
      '10.12.17.75'
  ],
  businessType: proEnv.BUSINESS_TYPE,
  skipCodeReview: true,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: '时光金科pc模版',
      chunks: ['index']
    }
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    allowedHosts: 'all',
    // proxy: {
    //     '/api': {
    //         target: "http://localhost:8081/",
    //         ws: true,
    //         changeOrigin: true
    //     }
    // }
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      devServer.app.all(/^\/api/, (_, response) => {
        const apiFile = path.join(__dirname, _.path + '.json')
        return response.sendFile(apiFile)
      })
      return middlewares
    }
  }
})
