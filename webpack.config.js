var Encore = require('@symfony/webpack-encore');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

Encore
    .setOutputPath('public/')
    .setPublicPath('/')
    .cleanupOutputBeforeBuild()
    .addEntry('app', './src/loader.js')
    .enableSassLoader()
    .enablePreactPreset()
    .enableVersioning(Encore.isProduction())
    .enableSourceMaps(!Encore.isProduction())
	.addPlugin(new HtmlWebpackPlugin({
		template: 'src/index.ejs',
		alwaysWriteToDisk: true
	}))
	.addPlugin(new HtmlWebpackHarddiskPlugin())
	.addPlugin(new FaviconsWebpackPlugin({
		logo: './src/images/favicon.png',
		prefix: 'meta-icons-[hash]/',
		emitStats: false,
		statsFilename: 'iconstats-[hash].json',
		persistentCache: true,
		inject: true,
		background: '#fff',
		title: 'Simule ta taxe',
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
