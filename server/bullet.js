let v = require("victor");
function Bullet(dir, initpos){
    this.dir = dir;
    this.pos = initpos;
    this.update = function(){
        this.pos.add(this.dir.clone().multiply(5));
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