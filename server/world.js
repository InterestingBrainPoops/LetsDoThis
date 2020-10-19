const Player = require("./player");
var v = require("victor");
function World(){
    this.players = {};
    this.addPlayer = function(id){
        this.players[id] = new Player(id);
    }
    this.updatePlayer = function(data, id, mPos){
        this.players[id].updatepos(data, mPos);
    }
    this.getMetadata = function(id){
        let ret = {};
        for(var key in this.players) {
            var value = this.players[key];
            ret[key] = {};
            if(key == id){
                ret[key].pos = new v(400,400);
            }else{
                let diff = (v(400,400)).subtract(this.players[id].pos.clone());
                let cpos = value.pos.clone();
                ret[key].pos = (cpos.clone().add(diff.clone()));
            }
            ret[key].gunPos = {x1:this.players[key].mPos.clone().subtract(v(400,400)).normalize().multiply(v(15,15)).add(ret[key].pos), x2:this.players[key].mPos.clone().subtract(v(400,400)).normalize().multiply(v(30,30)).add(ret[key].pos)};
        }
        return ret;
    }
    this.removePlayer = function(id){
        delete this.players[id];
    }
}
module.exports = World;