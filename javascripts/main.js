let pos = new p5.Vector(0,0);
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
  pos.add(move.x, move.y);
  socket.emit('keys', keys);
  //print("got here");
});
let keys = {};
let counter = 0;
setInterval(() => {
  ++counter;
  socket.emit('hey', { counter }); // the object will be serialized for you
  console.log(counter);
}, 1000);
setup = function(){
  createCanvas(300,300);
}
draw = function(){
  background(255,0,0);
  rect(pos.x-15, pos.y -15, 30, 30);
  //print(keyCode);
}
function keyPressed() {
  keys[key.toString().toLowerCase()] = true;
  return false;
}
function keyReleased(){
  keys[key.toString().toLowerCase()] = false;
  return false;
}