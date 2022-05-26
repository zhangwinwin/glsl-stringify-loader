const webpack = require('../utils/readWebpack')
jest.setTimeout(10000);
describe('glsl-loader', () => {
    test('glsl file with local & external dependencies', async () => {
        const stats = await webpack('config.js', 'entry.js');
        expect(stats.indexOf('#define GLSLIFY 1')).toBeTruthy();
        expect(stats.indexOf('vec3 hello =')).toBeTruthy();
    })
})