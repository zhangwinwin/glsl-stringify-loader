const wepback = require('../utils/readWebpack')
jest.setTimeout(10000);
describe('glsl-loader', () => {
    test('glsl file with local & external dependencies', () => {
        return wepback('config.js', 'entry.js').then(data => {
            expect(data.indexOf('#define GLSLIFY 1')).toBeTruthy();
            expect(data.indexOf('vec3 hello =')).toBeTruthy();
        })
    })
})