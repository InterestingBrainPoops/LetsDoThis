let v = require("victor");

function Player(id){
    this.pos = new v(0,0);
    this.id = id;
    this.mPos = new v(0,0);
    this.mPtime = 0;
    this.vel = new v(0,0);
    this.updateData = function(vel, mPos){
        this.vel = (vel);
        this.mPos.copy(mPos)
    }
    this.step = function(){
        this.pos.add(this.vel);
    }
}
module.exports = Player;