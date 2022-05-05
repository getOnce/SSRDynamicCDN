// (1)

const fs = require('fs');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
module.exports = function (webpackEnv, publicPath = '/myapp/') {
    const isEnvProduction = webpackEnv === 'production';
    const imageInlineSizeLimit = 10000;
    return {
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            modules: [resolveApp('node_modules')],
        },
        mode: isEnvProduction ? 'production' : 'development',
        name: 'ssr-node',
        // (2)
        target: 'node',
        // (3)
        entry: [resolveApp('src/browser/ssr.tsx')],
        externals: [webpackNodeExternals()],
        output: {
            filename: 'app.js',
            // (5)
            path: resolveApp('dist/ssr'),
            libraryExport: 'default',
            libraryTarget: 'commonjs2',
            // chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
            assetModuleFilename: 'static/media/[name].[hash][ext]',
            publicPath,
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: /\.s?([ac])ss$/,
                            exclude: /(node_modules)/,
                            use: ['ignore-loader'],
                            sideEffects: true,
                        },
                        // Process application JS with Babel.
                        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                        {
                            test: /\.(js|mjs|jsx|ts|tsx)$/,
                            include: resolveApp('src/browser'),
                            loader: require.resolve('babel-loader'),
                            options: {
                                // customize: require.resolve(
                                //     'babel-preset-react-app/webpack-overrides',
                                // ),
                                presets: [
                                    [
                                        require.resolve(
                                            'babel-preset-react-app',
                                        ),
                                        {
                                            runtime: 'automatic',
                                        },
                                    ],
                                ],

                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,
                                compact: isEnvProduction,
                            },
                        },
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            type: 'asset',
                            parser: {
                                dataUrlCondition: {
                                    maxSize: imageInlineSizeLimit,
                                },
                            },
                            generator: {
                                // http://127.0.0.1:1000/myapp/static/js/../../static/media/test.6e21fa0ad5fbb98bff28.jpg
                                emit: false,
                                filename: `${publicPath.slice(
                                    1,
                                )}static/js/../../static/media/[name].[hash][ext]`,
                            },
                        },
                        {
                            test: /\.svg$/,
                            use: [
                                {
                                    loader: require.resolve('@svgr/webpack'),
                                    options: {
                                        prettier: false,
                                        svgo: false,
                                        svgoConfig: {
                                            plugins: [{ removeViewBox: false }],
                                        },
                                        titleProp: true,
                                        ref: true,
                                    },
                                },
                                {
                                    loader: require.resolve('file-loader'),
                                    options: {
                                        name: `static/media/[name].[hash].[ext]`,
                                        postTransformPublicPath: (p) => {
                                            const relativePublicPath =
                                                publicPath.slice(1);
                                            return `${p.replace(
                                                'static/media/',
                                                relativePublicPath +
                                                    'static/js/../../static/media/',
                                            )}`;
                                        },
                                    },
                                },
                            ],
                            issuer: {
                                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                            },
                        },
                    ],
                },
            ],
        },
    };
};
