const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:{
        bundle:'./src/index.js',
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase:path.join(__dirname, 'src')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.html$/,
                use:[
                    'html-loader'
                ]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:'src/index.html'
        })
    ]
}