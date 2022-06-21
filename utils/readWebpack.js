const path = require('path')
const MemoryFileSystem = require('memory-fs');
const requireFromString = require('require-from-string')
const webpack = require('webpack');

const CONFIGROOT = path.join(__dirname, '..', 'configs')

module.exports = function readwebpack (configs, entry) {
    return new Promise((resolve, reject) => {
        const config = require(path.resolve(CONFIGROOT, configs))
        config.entry = path.resolve(CONFIGROOT, entry)
        if (!config.output) config.output = {}
        Object.assign(config.output, {
            path: '/',
            filename: 'bundle.js',
            libraryTarget: 'umd'
        })

        const compiler = webpack(config)
        const memfs = new MemoryFileSystem()
        compiler.outputFileSystem = memfs
        compiler.run((err, stats) => {
            if (err) return reject(err)
            if (stats.compilation.errors && stats.compilation.errors.length > 0) {
                return reject(stats.compilation.errors[0])
            }
            const bundleContent = String(memfs.readFileSync('/bundle.js'))
            const output = requireFromString(bundleContent).trim()
            resolve(output)
        })
    })
}