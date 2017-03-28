var fs = require('fs'),
    events = require('events'),
    util = require('util'),
    watchDir = './watch',
    processDir = './done'

function Watcher(watchDir, processDir) {
    this.watchDir = watchDir
    this.processDir = processDir
}

util.inherits(Watcher, events.EventEmitter)

Watcher.prototype.watch = function() {
    var watcher = this;
    fs.readdir(watcher.watchDir, function(err, files) {
        if (err) return console.error(err)
        for (var index in files) {
            watcher.emit('process', files[index])
        }
    })
}

Watcher.prototype.start = function() {
    var watcher = this;
    fs.watch(watcher.watchDir, function() {
        watcher.watch()
    })
}

var watcher = new Watcher(watchDir, processDir)
watcher.on('process', function(file) {
    var watchFile = watcher.watchDir + '/' + file
    var processFile = watcher.processDir + '/' + file.toLowerCase()
    fs.rename(watchFile, processFile, function(err) {
        if (err) return console.error(err)
    })
})

watcher.start()