let v = require("victor");

function Player(id){
    this.pos = new v(0,0);
    this.id = id;
    this.updatepos = function(pos){
        this.pos.add(pos);
    }
}
module.exports = Player;