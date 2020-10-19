//const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');
var fs = require("fs");
var http = require("http");
var url = require("url");
var v = require("victor");
var Player = require("./server/player");
var World = require("./server/world");
//let count = 0; // an attempt to have a variable be modified by multiple nodes.
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
    console.log(`Player ${socket.id} connected`);
    socket.emit("init", socket.id);
    socket.on('hey', data => {
        console.log('hey', data);
      });
    socket.on('keys' ,(keys, id , mopr, mPos) => {
        var data = new v(0,0);
        if(mopr){
          console.log("Mouse is pressed on client:", id);
        }
        let movespeed = 2;
        if(keys.w){
            data.y += -1*movespeed;
        } if(keys.s){
            data.y += 1*movespeed;
        } if(keys.a){
            data.x += -1*movespeed;
        } if(keys.d){
            data.x += 1*movespeed;
        }
        world.updatePlayer(data, id , mPos);
        socket.emit('updateworld', world.getMetadata(id));
    });
    socket.on('disconnect', (reason) => {
      console.log(`Player ${socket.id} disconnected`);
        world.removePlayer(socket.id);
    });
  });

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});