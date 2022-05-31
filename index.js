'use strict';

const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');
const promiseilfy = require('./utils/promiseilfy');
const readFile = promiseilfy(fs.readFile)
const reg = /#require "([.\/\w_-]+)"/gi;

function match (source) {
    const requires = [];
    let match = reg.exec(source);

    while (match != null) {
        requires.push({
            path: match[1],
            target: match[0],
            content: ''
        });
        match = reg.exec(source);
    }
    return requires;
}

function parse(loader, source, context, cb) {
    handleRequire(loader, source, context, match(source), cb);
}

function handleRequire(loader, source, context, requires, cb) {
    if (requires.length === 0) return cb(null, source);

    const req = requires.pop();
    
    const res = promiseilfy(loader.resolve)
    res(context, './' + req.path).then(resolved => {
        loader.addDependency(resolved);
        readFile(resolved, 'utf-8').then(src => {
            parse(loader, src, path.dirname(resolved), function(err, bld) {
                if (err) {
                    return cb(err);
                }

                source = source.replace(req.target, bld);
                handleRequire(loader, source, context, requires, cb);
            });
        }).catch(err => {
            return cb(err);
        })
    }).catch(err => {
        return cb(err);
    })
}

module.exports = function(source) {
    this.cacheable();
    const cb = this.async();
    parse(this, source, this.context, function(err, bld) {
        if (err) {
            return cb(err);
        }

        cb(null, 'module.exports = ' + JSON.stringify(bld));
    });
};
