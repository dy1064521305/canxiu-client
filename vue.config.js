const { environment } = require('./config/environment.js')

module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: environment.baseURL,
		ws: true,
		changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
  }
}