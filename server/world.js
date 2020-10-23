const Player = require("./player");
var v = require("victor");
var b = require("./bullet");
function sort_object(obj) {
    items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    sorted_obj={}
    $.each(items, function(k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return(sorted_obj)
} 
function World(){
    this.players = {};
    this.bullets = [];
    this.addPlayer = function(id, name){
        this.players[id] = new Player(id, name);
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
        let ne = [];
        for(let x = 0; x < this.bullets.length; x++){
            var temp = this.bullets[x];
            //console.log(temp.pos);
            if(!((temp.pos.x >= 400 || temp.pos.x <= -400 )||( temp.pos.y >= 400 || temp.pos.y <= -400))){
                ne.push(this.bullets[x]);
            }
            //     for(var val in this.players){
            //         //console.log(this.bullets[x].pos);
            //         console.log(Object.keys(this.bullets).length);
            //         if(this.players[val].pos.clone().subtract(temp.pos.clone()).length() > 17 && !((temp.pos.x >= 400 || temp.pos.x <= -400 )||( temp.pos.y >= 400 || temp.pos.y <= -400))){
            //             ne.push(this.bullets[x]);
            //         }
            //     }

        }
        this.bullets = ne;
        //poplist.reverse();
        //for(let x = 0; x < poplist.length; x++){
         //   this.bullets.splice(x,1);
        //}
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
    this.getLeaderboard = function(){
        let ret = {};
        //let scores = []; 
        //let names = [];
        for(let x = 0; x < Object.keys(this.players).length; x++){
            let value = this.players[Object.keys(this.players)[x]];
            //console.log(value);
            ret[value.name] = value.score;
        }
        var items = Object.keys(ret).map(function(key) {
            return [key, ret[key]];
          });
          
          // Sort the array based on the second element
          items.sort(function(first, second) {
            return second[1] - first[1];
          });
          var keys = Object.keys(ret);

        //Get the number of keys - easy using the array 'length' property
        var i, len = keys.length; 

//Sort the keys. We can use the sort() method because 'keys' is an array
        keys.sort(function(a, b){return b-a}); 

//This array will hold your key/value pairs in an ordered way
//it will be an array of objects
        var sortedDict = [];

//Now let's go throught your keys in the sorted order
        for (i = 0; i < len; i++)
        {
            //get the current key
            k = keys[i];
        
            //show you the key and the value (retrieved by accessing dict with current key)
            //alert(k + ':' + ret[k]);
        
            //Using the array 'push' method, we add an object at the end of the result array
            //It will hold the key/value pair
            sortedDict.push({name: k, score:ret[k]});
        }
          // Create a new array with only the first 5 items
          return sortedDict.splice(0,10);
          
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
    this.updatePlayers = function(){
        for(x in this.players){
            //console.log(x);
            this.players[x].step();
        }
    }
    this.updatePlayerData = function(id, data, mPos){
        this.players[id].updateData(data, mPos);
    }
}
module.exports = World;