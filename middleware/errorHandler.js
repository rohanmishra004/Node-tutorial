const { logEvent } = require('./logEvents')
const errorHandler = (err, req, res, next) => {
    logEvent(`${err.name}:${err.message}`,'errorLog.txt')
    console.log(err.stack)
    res.status(500).send(error.message)
}



module.exports = { errorHandler };