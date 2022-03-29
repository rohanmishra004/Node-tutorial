const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

//creating a login events
const logEvents = async (message) => {
    const dateTime = `${ format(new Date(), 'dd/MM/yyyy \t HH:mm:ss')}`;
    const logItem = `\n${dateTime}\t${uuid()}\t${message}`
    console.log(logItem)

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromise.appendFile(path.join(__dirname,'logs','LogFile.txt'), logItem)
        // testing
    } catch (err) {
        console.log(err)
    }
}

module.exports = logEvents
