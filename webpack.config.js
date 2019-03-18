var Encore = require('@symfony/webpack-encore');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    .setOutputPath('public/')
    .setPublicPath('/')
    .cleanupOutputBeforeBuild()
    .addEntry('app', './src/loader.js')
    .enableSassLoader()
    .enablePreactPreset()
    .enableVersioning(Encore.isProduction())
    .enableSourceMaps(!Encore.isProduction())
    .enablePostCssLoader((options) => {
        options.config = {
            path: 'postcss.config.js'
        };
    })
    .addPlugin(new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        alwaysWriteToDisk: true
    }))
    .addPlugin(new HtmlWebpackHarddiskPlugin())
    .addPlugin(new CopyWebpackPlugin([
        {
            from: 'src/images/sharer.png',
            to: 'images/sharer.png',
        },
    ]))
    .addPlugin(new FaviconsWebpackPlugin({
        logo: './src/images/favicon.png',
        prefix: 'meta-icons-[hash]/',
        emitStats: false,
        statsFilename: 'iconstats-[hash].json',
        persistentCache: true,
        inject: true,
        background: '#fff',
        title: 'Simulation Pass Numérique',
        icons: {
            android: true,
            appleIcon: true,
            favicons: true,
            firefox: true,
            appleStartup: false,
            coast: false,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false
        }
    }))
;

module.exports = Encore.getWebpackConfig();
