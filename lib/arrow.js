(function(){
  var Arrow = BubbleTrouble.Arrow = function(pos, game){
    this.width = 4;
    this.height = 368;
    this.pos = pos.slice(0);
    this.pos[0] += game.mainChar.width*.40;
    this.game = game;
    this.context = game.context;
  }

  Arrow.IMG = new Image();
  Arrow.IMG.src = "Images/arrow.png";
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
      Arrow.IMG,
      0,
      0,
      this.width,
      this.height,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height);
  }

  Arrow.prototype.handlePossibleCollision = function(other){
    // if (!(other instanceof BubbleTrouble.Bubble)) return;
    //
    // if (this.collidedWith(other)){
    //   this.game.remove(this);
    //   other.pop();
    // }
  }

  Arrow.prototype.collidedWith = function(other){
    return BubbleTrouble.Util.RectCircleCollided(this, other);
  }

})()
