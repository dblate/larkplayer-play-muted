var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'larkplayer-play-muted',
        libraryTarget: 'umd'
    },
    externals: {
        larkplayer: {
            commonjs: 'larkplayer',
            commonjs2: 'larkplayer',
            amd: 'larkplayer',
            root: 'larkplayer'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        plugins: [
                            ["babel-plugin-transform-react-jsx", {
                                "pragma": "Component.createElement"
                            }]
                        ]
                    }
                }
            }
        ]
    }
};