const Player = require("./player");

//var Player = require("./player");
function World(){
    this.players = {};
    this.addPlayer = function(id){
        this.players[id] = new Player(id);
    }
    this.updatePlayer = function(data, id){
        this.players[id].updatepos(data);
    }
    this.getMetadata = function(){
        let ret = {};
        for(var key in this.players) {
            var value = this.players[key];
            ret[key] = value.pos;
            // do something with "key" and "value" variables
        }
        console.log("Got here");
        return ret;
    }
    this.removePlayer = function(id){
        delete this.players[id];
    }
}
module.exports = World;