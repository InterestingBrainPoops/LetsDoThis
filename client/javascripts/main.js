var v = Victor;
var me;
var myid;
var myworld;
let pos = new v(0,0);
let mX = 0;
let mY = 0;
let mPos = new Victor();
let mp = 0;
worlddisplay = function(metadata, id){
  for(var key in metadata) {
    if(key != 'bPos'){
      var value = metadata[key];
      if(key != id){
        fill(255,255,255);
      }else{
        fill(252, 244, 3);
      }
      ellipse(value.pos.x-15, value.pos.y-15, 30,30);
      line(value.gunPos.x1.x, value.gunPos.x1.y, value.gunPos.x2.x,value.gunPos.x2.y);
    }else if(key == 'bPos'){
      for(let x = 0; x < metadata.bPos.length; x++){
        fill(0,0,0);
        //console.log(metadata.bPos);
        ellipse(metadata.bPos[x].x-10, metadata.bPos[x].y-10, 20,20);
      }
    }
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
});
socket.on('init',( id )=> {
  myid = id;
  socket.emit('keys', keys, myid, mp, new Victor(mX,mY));
});
socket.on('updateworld',(world) =>{
  myworld = world;
  socket.emit('keys',keys, myid, mp, new Victor(mX, mY));
});

let keys = {};
let counter = 0;
setInterval(() => {
  ++counter;
  socket.emit('hey', { counter }); // the object will be serialized for you
  console.log(counter);
}, 1000);
let inp;
let button;
setup = function(){
  createCanvas(800,800);
  ellipseMode(CORNER);
  //createCanvas(800,800);
  background(255,0,0);
  inp = createInput('').attribute("placeholder", "Write Name Here");
  //inp.input(myInputEvent);
  button = createButton('Submit Name');
  inp.size(200,30);
  inp.position(300,200-15);
  button.size(120, 30);
  button.position(400-60, 250-15);
  button.mousePressed(changeBG);

}
function changeBG(){
  inp.remove();
  button.remove();
  //console.log(inp.value());
  socket.emit("nameInit", inp.value());
}
draw = function(){
  background(255,0,0);
  worlddisplay(myworld, myid);
  mX = mouseX;
  mY = mouseY;
  mp = mouseIsPressed;
}
function keyPressed() {
  keys[key.toString().toLowerCase()] = true;
  //return false;
}
function keyReleased(){
  keys[key.toString().toLowerCase()] = false;
  return false;
}