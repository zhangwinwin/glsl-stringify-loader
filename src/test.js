const wepback = require('../utils/readWebpack')

wepback('config.js', 'entry.js').then(data => {
    console.log(data)
})