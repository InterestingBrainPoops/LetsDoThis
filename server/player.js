let v = require("victor");

function Player(id){
    this.pos = new v(0,0);
    this.id = id;
    this.mPos = new v(0,0);
    this.mPtime = 0;
    this.updatepos = function(pos, mPos){
        this.pos.add(pos);
        this.mPos.copy(mPos)
    }
}
module.exports = Player;