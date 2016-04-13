var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var staticFolder = path.resolve(__dirname, 'assets');
var languages = require('./app/i18n/languages');
var momentFilter = languages.map(function (lang) { return lang.iso; }).join('|');

module.exports = {
    content: __dirname,
    entry: [
        './ui.jsx',
    ],
    output: {
        path: staticFolder,
        publicPath: 'http://localhost:8080/assets/',
        filename: 'app.js'
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /(\.jsx|\.js)$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png' },
            { test: /\.jpg$/, loader: 'url?limit=10000&mimetype=image/jpeg' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /(\.scss)$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox') }
        ]
    },
    toolbox: {
        theme: path.join(__dirname, 'app/theme.scss')
    },
    postcss: [autoprefixer],
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, new RegExp(momentFilter)),
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEVELOPMENT__: true,
            __DEVTOOLS__: false,
            __USE_GA__: false,
            __GA_ID__: null
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
        })
    ]
};
