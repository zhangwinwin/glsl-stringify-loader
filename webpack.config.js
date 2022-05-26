const path = require('path')

module.exports = {
    mode: 'production',
    input: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.glsl$/,
            exclude: [/node_modules/],
            use: [
                path.resolve(__dirname, './index.js')
            ]
        }]
    }
}