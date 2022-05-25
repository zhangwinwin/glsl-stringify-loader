const path = require('path')

module.exports = {
    target: 'node',
    mode: 'production',
    module: {
        rules: [{
            test: /\.glsl$/,
            exclude: [/node_modules/],
            use: [
                path.resolve(__dirname, '../index.js')
            ]
        }]
    }
}