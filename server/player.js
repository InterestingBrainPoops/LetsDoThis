let v = require("victor");

function Player(id, name){
    this.name = name;
    this.pos = new v(0,0);
    this.id = id;
    this.mPos = new v(0,0);
    this.mPtime = 0;
    this.vel = new v(0,0);
    this.score = 0;
    this.updateData = function(vel, mPos){
        this.vel = (vel);
        this.mPos.copy(mPos)
    }
    this.step = function(){
        this.pos.add(this.vel);
        this.score += 1;
    }
}
module.exports = Player;