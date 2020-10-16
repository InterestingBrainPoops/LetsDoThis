const Player = require("./player");

//var Player = require("./player");
var v = require("victor");
function World(){
    this.players = {};
    this.addPlayer = function(id){
        this.players[id] = new Player(id);
    }
    this.updatePlayer = function(data, id){
        this.players[id].updatepos(data);
    }
    this.getMetadata = function(id){
        let ret = {};
        for(var key in this.players) {
            var value = this.players[key];
            // ret[key] = value.pos;
            if(key == id){
                ret[key] = new v(400,400);
            }else{
                let diff = (v(400,400)).subtract(this.players[id].pos.clone());
                let cpos = value.pos.clone();
                ret[key] = (cpos.clone().add(diff.clone()));
                //console.log((v(200,200)).subtract(this.players[id].pos.clone()));
            }
            // do something with "key" and "value" variables
        }
        //console.log("Got here");
        return ret;
    }
    this.removePlayer = function(id){
        delete this.players[id];
    }
}
module.exports = World;