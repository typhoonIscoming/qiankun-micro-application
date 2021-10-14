/* eslint-disable */
const path = require('path')

const FileManagerPlugin = require('filemanager-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const smp = new SpeedMeasurePlugin();
const resolve = function (dir) {
    return path.join(__dirname, dir)
}
const projectName = 'seckill'
const outputDir = 'dist'
const port = process.env.port || process.env.npm_config_port || 8080;

const prodVersion = '0.0.1'
const { name } = require("./package.json");

let webpackConfig = {
    entry: {
        app: resolve('src/main.ts'),
    },
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: projectName,
    resolve: {
        alias: {
            '@': resolve('src')
        },
        extensions: ['.js', '.vue', '.json', '.ts'],
    },
    output: {
        library: `${name}-[name]`,
        libraryTarget: "umd",
        jsonpFunction: `webpackJsonp_${name}`
    },
    externals: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') ? {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
    } : {},
    plugins: [
        new HtmlWebpackPlugin({
            title: '微应用',
            url: '.',
            filename: 'index.html',
            template:  path.resolve(__dirname, './public/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                favicon: path.resolve('public/favicon.png')
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // chunksSortMode: "dependency"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
        ],
    },
}
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    webpackConfig = smp.wrap(webpackConfig)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? './' : '',
    productionSourceMap: false,
    assetsDir: 'static',
    parallel: false,
    // parallel: require('os').cpus().length > 1,
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
            sass: {
                additionalData: `@import "~@/assets/styles/variable.scss";`
            },
            postcss: {
                plugins: [
                    require('autoprefixer')({
                        grid: 'autoplace'
                    }),
                    // require('postcss-pxtorem')({
                    //     rootValue: 100, // 换算的基数
                    //     // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
                    //     // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                    //     selectorBlackList: [".van-"],
                    //     propList: ["*"],
                    //     exclude: /node_modules/,
                    // }),
                ]
            }
        },
    },
    devServer: {
        port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_URL || '',
                changeOrigin: true,
                ws: true,
                secure: false,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    configureWebpack: webpackConfig,
    chainWebpack(config) {
        config.resolve.alias
        .set("@", resolve("src"))
        config.when(process.env.NODE_ENV !== 'development',
            (configure) => {
                configure
                    .optimization.splitChunks({
                        chunks: 'all',
                        maxSize: 60000, // 把提取出来的模块打包生成的文件大小不能超过maxSize值，如果超过了，要对其进行分割并打包生成新的文件。单位为字节，默认为0，表示不限制大小
                        maxInitialRequests: 4, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件），默认为4
                        automaticNameDelimiter: '-', // 打包生成的js文件名的分割符，默认为~
                        // name: 'chunk',打包生成js文件的名称
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial' // only package third parties that are initially dependent
                            },
                            commons: {
                                name: 'chunk-components',
                                test: resolve('src/components'), // can customize your rules
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true,
                            },
                            // validate: {
                            //     chunks: 'all',
                            //     name: 'chunk-vee-validate',
                            //     test: /[\\/]node_modules[\\/]vee-validate[\\/]/,
                            //     minChunks: 1,
                            //     priority: 15,
                            //     reuseExistingChunk: true,
                            //     maxSize: 51200,
                            // },
                        }
                    })
                // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
                configure.optimization.runtimeChunk('single')

                // if (process.env.NODE_ENV === 'production') {
                //     config.plugin('compressionPlugin').use(new CompressionPlugin({
                //         filename: '[path].gz[query]',
                //         algorithm: 'gzip',
                //         test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 匹配文件名
                //         exclude: /favicon.*/,
                //         threshold: 10240, // 对超过10k的数据压缩
                //         minRatio: 0.8,
                //         deleteOriginalAssets: true // 删除源文件
                //     }))
                // }
            }
        )
    }
}
