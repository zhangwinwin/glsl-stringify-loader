module.exports = function (callback) {
    return function promisified () {
        const args = [].slice.call(arguments);
        return new Promise((resolve, rejcect) => {
            args.push((err, result) => {
                if (err) return rejcect(err);
                if (arguments.length <= 2) resolve(result)
                else resolve([].slice.call(arguments, 1))
            })
        })
        callback.apply(null, args);
    }
}