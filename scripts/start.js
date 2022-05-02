process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack.config');
const devConfigFactory = require('../config/webpackDevServer.config');
const config = configFactory('development');
const compiler = webpack(config);

const devServer = new WebpackDevServer(
    devConfigFactory('development'),
    compiler,
);
devServer.startCallback(() => {
    console.log(`静态资源CDN: http://127.0.0.1:1000/myapp/`);
});
