const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const developmentMode = process.argv[2] === 'serve';
const devTool = developmentMode ? 'eval' : 'source-map';

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
    devtool: devTool
    ,
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