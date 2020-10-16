//const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');
var fs = require("fs");
var http = require("http");
var url = require("url");
var v = require("victor");
var Player = require("./player");
var World = require("./world");
let count = 0; // an attempt to have a variable be modified by multiple nodes.
let world = new World();
const httpServer = http.createServer((req, res) => {
  // serve the index.html file
  var pathname = url.parse(req.url).pathname;
  res.writeHead(200);
  if(pathname == "/"){
      let html = fs.readFileSync("./client/index.html", "utf8");
      res.write(html);
  }else if (pathname == "/main.js"){
      let script = fs.readFileSync("./client/javascripts/main.js", "utf8");
      res.write(script);
  }else if (pathname == "/player.js"){
      let script = fs.readFileSync("./player.js");
      res.write(script);
  }
  res.end();
});

const io = require('socket.io')(httpServer);

io.on('connect', socket => {
    let counter = 0;
    world.addPlayer(socket.id);
    console.log("Connected");
    socket.emit("init", socket.id);
    //socket.emit('move', new v(0,0));
    socket.on('hey', data => {
        console.log('hey', data);
        //print("A thing happened and p5 is working.");
        count ++;
        console.log(count);
      });
    socket.on('keys' ,(keys, id) => {
        var data = new v(0,0);
        if(keys.w){
            data.y += -1;
        } if(keys.s){
            data.y += 1;
        } if(keys.a){
            data.x += -1;
        } if(keys.d){
            data.x += 1;
        }
        world.updatePlayer(data, id);
        socket.emit('updateworld', world.getMetadata());
    });
    socket.on('disconnect', (reason) => {
      if (reason === 'io client disconnect') {
        world.removePlayer(socket.id);
      }
      // else the socket will automatically try to reconnect
    });
  });

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});