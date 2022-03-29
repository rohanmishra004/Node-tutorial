const logEvents = require('./logEvents')

const EventEmitter = require('events')

class Emitter extends EventEmitter { };

const myEmitter = new Emitter(); //initiating a new object from class
myEmitter.on('log', (msg) => logEvents(msg));

myEmitter.emit('log', 'Log event emitted');

