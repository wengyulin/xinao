const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy(
      '/api',
      {
        target: 'http://10.39.0.71:8111/',
        changeOrigin: true,
        pathRewrite: {'/api' : ''},
        logLevel: 'debug'
      }
    )
  )
};
