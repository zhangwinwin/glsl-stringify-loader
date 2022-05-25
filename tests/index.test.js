const wepback = require('../utils/readWebpack')

describe('glsl-loader', () => {
    test('glsl file with local & external dependencies', () => {
        wepback('config.js', 'entry.js').then(data => {
            
        })
    })
})