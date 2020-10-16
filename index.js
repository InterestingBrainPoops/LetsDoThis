//const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');
var fs = require("fs");
var http = require("http");
var url = require("url");
var v = require("victor");
var Player = require("./server/player");
var World = require("./server/world");
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
    console.log(`Player ${socket.id} connected`);
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
        let movespeed = 3;
        if(keys.w){
            data.y += -1*movespeed;
        } if(keys.s){
            data.y += 1*movespeed;
        } if(keys.a){
            data.x += -1*movespeed;
        } if(keys.d){
            data.x += 1*movespeed;
        }
        world.updatePlayer(data, id);
        socket.emit('updateworld', world.getMetadata(id));
    });
    socket.on('disconnect', (reason) => {
      console.log(`Player ${socket.id} disconnected`);
        world.removePlayer(socket.id);
      
      // else the socket will automatically try to reconnect
    });
  });

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});