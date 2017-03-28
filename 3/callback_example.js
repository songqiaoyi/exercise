var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res) {
    if(req.url === '/') {
        getTitles(res)
    } else {
        res.end('Server Error')
    }
})

server.listen(3000, '127.0.0.1')

function getTitles(res) {
    fs.readFile('./title.json', function(err, data) {
        if(err) return hadError(err)
        var titles = JSON.parse(data.toString())
        getTemplate(titles, res)
    })
}

function getTemplate(titles, res) {
    fs.readFile('./template.html', function(err, data) {
        if(err) return hadError(err)
        formatHtml(data.toString(), titles, res)
    })
}

function formatHtml(html, titles, res) {
    var tmpl = html.replace('%', titles.join('</li><li>'))
    res.writeHead(200, {'Content-Type': 'html/plain'})
    res.end(tmpl)
}

function hadError(err) {
    console.error(err)
    res.end('Server Error')
}