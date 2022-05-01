const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
module.exports = function(publicPath = '/myapp/'){
  return {
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    compress: true,
    static: {
      directory: resolveApp('public'),
      publicPath
    },
    client: {
      webSocketURL: {
        // Enable custom sockjs pathname for websocket connection to hot reloading server.
        // Enable custom sockjs hostname, pathname and port for websocket connection
        // to hot reloading server.
        hostname: '0.0.0.0',
        pathname: '/ws',
        port: 1000,
      },
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    host: '0.0.0.0',
    port: 1000
  }
}