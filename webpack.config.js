var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

//process.env.BABEL_ENV = TARGET;

module.exports = {
    content: __dirname,
    entry: [
        "./index.jsx",
    ],
    output: {
        path: __dirname,
        filename: "bundle.js"
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
            { test: /\.css$/, loader: "style!css" },
            { test: /(\.jsx|\.js)$/, loader: "babel", exclude: /node_modules/ },
            { test: /(\.scss|\.css)$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox') }
        ]
    },
    toolbox: {
        theme: path.join(__dirname, 'app/theme.scss')
    },
    postcss: [autoprefixer],
    plugins: [
        new ExtractTextPlugin('react-toolbox.css', { allChunks: true }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        })
    ]
};
