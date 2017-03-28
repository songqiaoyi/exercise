var request = require('request');
var fs = require('fs')
var path = require('path')

const url = 'http://up.photo.baidu.com/Pic/upload?pid=vip'

var req = request.post({url}, function(err, body) {
      if (!err) {
        console.log(body.body)
      } else {
        console.log(err)
      }
});

var form = req.form();

form.append('file', fs.createReadStream(path.join(__dirname, '/abc.png')))
// form.append('pid', 'vip')