(function(){
  var Arrow = BubbleTrouble.Arrow = function(pos, game){
    this.width = 4;
    this.height = 368;
    this.pos = pos.slice(0);
    this.pos[0] += game.mainChar.width*.40;
    this.game = game;
    this.context = game.context;
  }

  Arrow.Y_DELTA = 10;
  Arrow.inherits(BubbleTrouble.MovingObject);

  Arrow.prototype.move = function(){
    this.pos[1] -= Arrow.Y_DELTA;

    if (this.pos[1] < BubbleTrouble.Game.UPPER_BOUND){
      this.game.remove(this);
    }
  }

  Arrow.prototype.draw = function(){
    this.context.drawImage(
      BubbleTrouble.Images.arrow,
      0,
      0,
      this.width,
      this.height,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height);
  }

  Arrow.prototype.collidedWith = function(other){
    return BubbleTrouble.Util.RectCircleCollided(this, other);
  }

})()
