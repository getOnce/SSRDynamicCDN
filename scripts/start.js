process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const nodemon = require('nodemon');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack.config');
const ssrConfigFactory = require('../config/webpack.ssr');
const devConfigFactory = require('../config/webpackDevServer.config');
const config = configFactory('development');

const nodemonConfig = require('../package.json').nodemonConfig;
let nodemonProcessInstance;
const compiler = webpack(config);
compiler.watch({}, () => {
    webpack(ssrConfigFactory(`development`), () => {
        console.log(`ssr compiled .......`);
        if (nodemonProcessInstance) {
            nodemonProcessInstance.restart();
        }
    });
});
const devServer = new WebpackDevServer(
    devConfigFactory('development'),
    compiler,
);
devServer.startCallback(() => {
    console.log(`静态资源CDN: http://127.0.0.1:1000/myapp/`);
    if (!nodemonProcessInstance)
        nodemonProcessInstance = nodemon(nodemonConfig);
});
