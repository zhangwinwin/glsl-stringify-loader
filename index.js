const fsPromises = require('fs').promises
const dirname = require('path').dirname
const promisify = require('util').promisify

const REG = /#require "([.\/\w_-]+)"/gi

function match (source) {
    const requires = []
    let match = REG.exec(source)

    while (match) {
        requires.push({
            path: match[1],
            target: match[0]
        })
        match = REG.exec(source)
    }
    return Promise.resolve(requires)
}

function handleRequire (loader, source, context, requires) {
    return new Promise((resolve, reject) => {
        if (requires.length === 0)
            return resolve(source)

        const req = requires.pop()
        let path = ''

        const loaderRes = promisify(loader.resolve)
        return loaderRes(context, './' + req.path)
        .then(result => {
            loader.addDependency(result)
            path = dirname(result)
            return fsPromises.readFile(result, 'utf-8')
        })
        .then(result => parse(loader, result, path))
        .then(result => {
            source = source.replace(req.target, result)
            return handleRequire(loader, source, context, requires)
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

function parse (loader, source, context) {
    return match(source)
    .then(requires => handleRequire(loader, source, context, requires))
}

module.exports = function (source) {
    this.cacheable();
    const cb = this.async();
    parse(this, source, this.context)
    .catch(err => cb(err))
    .then(res => {
        cb(null, 'module.exports = ' + JSON.stringify(res))
    })
}
