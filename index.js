//const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');
const { performance } = require("perf_hooks");
console.log(performance.now());
var fs = require("fs");
var http = require("http");
var url = require("url");
var v = require("victor");
var Player = require("./server/player");
var World = require("./server/world");
var Bullet = require("./server/bullet");
let t0; // the beginning of the frame loop;

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
      let script = fs.readFileSync("./player.js", "utf8");
      res.write(script);
  }
  res.end();
});

const io = require('socket.io')(httpServer, {
  pingInterval : 10
});

io.on('connect', socket => {
    let counter = 0;
    
    socket.on('nameInit', (name) =>{
      console.log(`Player ${socket.id} AKA ${name} connected`);
      world.addPlayer(socket.id, name);
      socket.emit("init", socket.id);
    });
    socket.on('hey', data => {
        console.log('hey', data);
      });
    socket.on('keys' ,(keys, id , mopr, mPos) => {
        var data = new v(0,0);
        if(mopr){
          if(performance.now() - world.players[id].mPtime >= 100){
            world.shoot(id, performance.now());
          }
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
        world.updatePlayerData(id, data , mPos);
        //console.log(world.getLeaderboard());
        socket.emit('updateState', world.getMetadata(id), world.getLeaderboard());
    });
    socket.on('disconnect', (reason) => {
      console.log(`Player ${socket.id} disconnected`);
        world.removePlayer(socket.id);
    });

  });
  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 8000;
  }
  
httpServer.listen(port, () => {
  console.log('go to http://localhost:3000');
});

async function main(){
while(true){
 t0 = performance.now();
 world.pruneBullets();
 world.updateBullets();
 world.updatePlayers();
 //console.log("This hopefully got called");
 //do the time.sleep here to satisfy approx. 60 updates per second. DO NOT RUN UNTIL THIS GETS EITHER UNCOMMENTED OR IMPLEMENTED!
 //console.log(performance.now()-t0);

 if((1000/60)-(t0-performance.now()) > 0){
 	await new Promise(resolve => setTimeout(resolve, (1000/60)-(performance.now()-t0)));
 }
}
}
main();