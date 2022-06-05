const webpack = require('../utils/readWebpack')
jest.setTimeout(10000);
describe('glsl-stringify-loader', () => {
    test('glsl file with local & external dependencies', async () => {
        const stats = await webpack('config.js', 'entry.js');
        expect(stats.indexOf('gl_FragColor =')).toBeTruthy();
        expect(stats.indexOf('vec3 hello =')).toBeTruthy();
    })
})