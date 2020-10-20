const Player = require("./player");
var v = require("victor");
var b = require("./bullet");
function World(){
    this.players = {};
    this.bullets = [];
    this.addPlayer = function(id){
        this.players[id] = new Player(id);
    }
    this.updatePlayer = function(data, id, mPos){
        this.players[id].updatepos(data, mPos);
    }
    this.shoot = function(id, time){
        let t0 = this.players[id].mPtime;
        this.players[id].mPtime = time;
        this.bullets.push(new b(this.players[id].mPos.clone().subtract(v(400,400)).normalize(), this.players[id].pos.clone()));
        //console.log(this.bullets[time]);
        console.log(`${ id } Shot a bullet, time since last: ${time-t0}`);
    }
    this.pruneBullets = function(){
        let poplist = [];
        for(let x = 0; x < this.bullets.length; x++){
            let temp = this.bullets[x];
            if(temp.pos.x >= 400 || temp.pos.x <= -400 || temp.pos.y >= 400 || temp.pos.y <= -400){
                console.log("This actually got reached");
                poplist.push(x);
            }
        }
        poplist.reverse();
        for(let x = 0; x < poplist.length; x++){
            this.bullets.splice(x,1);
        }
    }
    this.getMetadata = function(id){
        let ret = {};
        for(var key in this.players) {
            let value = this.players[key];
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
        ret.bPos = [];
        //console.log(this.bullets[0]);
        for(let x = 0; x < this.bullets.length; x++){
            //console.log(x);
            //console.log(this.bullets[x].getRelCoords(this.players[id].pos.clone()));
            ret.bPos.push(this.bullets[x].getRelCoords(this.players[id].pos.clone()));
        }
        //console.log(Object.keys(ret));
        return ret;
    }
    this.updateBullets = function(){
        //console.log(this.bullets.length);
        //console.log("UpdateBullets Called.");
        for(let x = 0; x < this.bullets.length; x++){
            //console.log(this.bullets[x]);
            this.bullets[x].update();
        }
    }
    this.removePlayer = function(id){
        delete this.players[id];
    }
}
module.exports = World;