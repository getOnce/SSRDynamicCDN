const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
module.exports = function (webpackEnv, publicPath = '/myapp/') {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';
    const imageInlineSizeLimit = 10000;
    return {
        target: ['web'],
        stats: 'errors-warnings',
        mode: isEnvProduction
            ? 'production'
            : isEnvDevelopment && 'development',
        entry: resolveApp('src/browser/index.tsx'),
        output: {
            path: resolveApp(`dist${publicPath}`),
            filename: 'static/js/app.js',
            chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
            assetModuleFilename: 'static/media/[name].[hash][ext]',
            publicPath: 'auto',
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            type: 'asset',
                            parser: {
                                dataUrlCondition: {
                                    maxSize: imageInlineSizeLimit,
                                },
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
                                        name: 'static/media/[name].[hash].[ext]',
                                    },
                                },
                            ],
                            issuer: {
                                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                            },
                        },
                        // Process application JS with Babel.
                        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                        {
                            test: /\.(js|mjs|jsx|ts|tsx)$/,
                            include: resolveApp('src/browser'),
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve(
                                    'babel-preset-react-app/webpack-overrides',
                                ),
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
                            test: /\.css$/,
                            exclude: /\.module\.css$/,
                            use: [
                                {
                                    loader: MiniCssExtractPlugin.loader,
                                },
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        importLoaders: 1,
                                        sourceMap: false,
                                        modules: {
                                            mode: 'icss',
                                        },
                                    },
                                },
                            ],
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `static/css/app.css`,
                chunkFilename: `static/css/[name].css`,
            }),
        ],
    };
};
