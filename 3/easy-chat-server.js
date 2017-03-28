var net = require('net')
var events = require('events')

var channel = new events.EventEmitter()
channel.clients = {}
channel.subscription = {}

channel.on('join', (id, client) => {
    channel.clients[id] = client
    channel.subscription[id] = (sensorId, message) => {
        if(id!==sensorId){
            channel.clients[id].write(message)
        }
    }
    channel.on('broadcast', channel.subscription[id])
})

channel.on('shutdown', ()=> {
    channel.emit('broadcast', '', 'The chat has been shutdown\n')
    channel.removeAllListeners('broadcast')
})

channel.on('leave', (id) => {
    channel.removeListener('broadcast', channel.subscription[id])
    channel.emit('broadcast', id, id+' has left the chat\n')
})


var server = net.createServer((client) => {
    var id = client.remoteAddress + ':' + client.remotePort
    client.on('data', (data) => {
        data = data.toString()
        if(data==='shutdown\r\n'){
            channel.emit('shutdown')
        }
        channel.emit('broadcast', id, data)
    })
    client.on('close', () => {
        channel.emit('leave', id)
    })

})

server.on('connection', (client) => {
    var id = client.remoteAddress + ':' + client.remotePort
    channel.emit('join', id, client)
})

server.listen(8888)