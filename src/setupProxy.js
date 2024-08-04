const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5050', // 后端服务器地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  )
}