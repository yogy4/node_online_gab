var events = require('events')
var eventEmitter = new events.EventEmitter()

var listener1 = function listener1(){
    console.log('listener1 executed')
}

var listener2 = function listener2(){
    console.log('listener2 executed')
}

eventEmitter.addListener('connection', listener1)
eventEmitter.on('connection', listener2)
var evenListener = require('events').EventEmitter.listenerCount(eventEmitter,'connection')
console.log(evenListener + "Listener(s) listening to connection event")
eventEmitter.emit('connection')
eventEmitter.removeListener('connection', listener1)
console.log("listener1 will not listen now")
eventEmitter.emit('connection')
evenListener = require('events').EventEmitter.listenerCount(eventEmitter, 'connection')
console.log(evenListener + "Listener(s) listening to connection event")
console.log("program ended")