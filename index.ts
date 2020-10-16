//const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');
var fs = require("fs");
var http = require("http");
var url = require("url");
const httpServer = require('http').createServer((req, res) => {
  // serve the index.html file
  var pathname = url.parse(req.url).pathname;
  res.writeHead(200);
  if(pathname == "/"){
      let html = fs.readFileSync("index.html", "utf8");
      res.write(html);
  }else if (pathname == "/main.js"){
      let script = fs.readFileSync("./javascripts/main.js");
      res.write(script);
  }
  res.end();
});

const io = require('socket.io')(httpServer);

io.on('connect', socket => {
    let counter = 0;
    console.log("Connected");
    socket.emit('move', {x:0, y:0});
    socket.on('hey', data => {
        console.log('hey', data);
      });
    socket.on('keys' ,(keys) => {
        var data = {x:0, y:0};
        if(keys.w){
            data.y += -1;
        } if(keys.s){
            data.y += 1;
        } if(keys.a){
            data.x += -1;
        } if(keys.d){
            data.x += 1;
        }
        socket.emit('move', data);
    })
  });

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});