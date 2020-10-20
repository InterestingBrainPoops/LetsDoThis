let v = require("victor");
function Bullet(dir, initpos){
    //console.log(initpos);
    this.dir = dir;
    this.pos = initpos;
    //console.log(this.pos);
    this.update = function(){
        //console.log(dir);
        this.pos.add(this.dir.clone().multiply(v(5,5)));
        //console.log(this.pos);
    }
    this.getRelCoords = function(thePos){
        let diff = (v(400,400)).subtract(thePos.clone());
        let cpos = this.pos.clone();
        ret = (cpos.clone().add(diff.clone()));
        //console.log(ret);
        return ret;
    }
}
module.exports = Bullet;