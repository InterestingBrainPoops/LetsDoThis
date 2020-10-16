var v = Victor;
var me;
var myid;
var myworld;
let pos = new v(0,0);
worlddisplay = function(metadata, id){
  for(var key in metadata) {
    var value = metadata[key];
    if(key != id){

      fill(255,255,255);
      
    }else{
      fill(252, 244, 3);
      
      //print("got here");
    }
    ellipse(value.x-15, value.y-15, 30,30);
    // do something with "key" and "value" variables
  }
}
const $events = document.getElementById('events');

        const newItem = (content) => {
          const item = document.createElement('li');
          item.innerText = content;
          return item;
        };
        
        const socket = io();

socket.on('connect', () => {
  $events.appendChild(newItem('connect'));
});
socket.on('move', (move) => {
  me.updatepos(move);
  socket.emit('keys', keys);
  //print("got here");
});
socket.on('init',( id )=> {
  myid = id;
  socket.emit('keys', keys, myid);
});
socket.on('updateworld',(world) =>{
  myworld = world;
  socket.emit('keys',keys,  myid)
});

let keys = {};
let counter = 0;
setInterval(() => {
  ++counter;
  socket.emit('hey', { counter }); // the object will be serialized for you
  console.log(counter);
}, 1000);
setup = function(){
  createCanvas(800,800);
}
draw = function(){
  background(255,0,0, 100);
  worlddisplay(myworld, myid);
  //print(keyCode);
}
function keyPressed() {
  keys[key.toString().toLowerCase()] = true;
  print(key.toString());
  return false;
}
function keyReleased(){
  keys[key.toString().toLowerCase()] = false;
  return false;
}