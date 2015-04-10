(function(){
  var MainChar = BubbleTrouble.MainChar = function(game){
    this.width = 25;
    this.height = 37;
    this.pos = [BubbleTrouble.Game.DIM_X/2, BubbleTrouble.Game.LOWER_BOUND - this.height];
    this.game = game;
    this.context = game.context;
    this.frame = 0;
  }

  MainChar.FRAME_LIMIT = 2;
  MainChar.inherits(BubbleTrouble.MovingObject);

  MainChar.prototype.move = function() {
    if (this.walkingLeft){
      this.pos[0] += -5;
    } else if (this.walkingRight){
      this.pos[0] += 5;
    }

    this.wrap(this.pos);
  }

  MainChar.prototype.draw = function(){
    if (this.walkingLeft){
      this.walk("left");
    } else if (this.walkingRight){
      this.walk("right");
    } else {
      this.stand();
    }
  }

  MainChar.prototype.stand = function(){
    this.drawMain(BubbleTrouble.Images.charWalkUpright, 0);
  }

  MainChar.prototype.walk = function(direction){
    if (direction == "left"){
      this.drawMain(BubbleTrouble.Images.charWalkLeft, this.width*this.frame);
    } else {
      this.drawMain(BubbleTrouble.Images.charWalkRight, this.width*this.frame);
    }
    this.frame = (this.frame + 1) % MainChar.FRAME_LIMIT;
  }

  MainChar.prototype.drawMain = function(img, startX){
    this.context.drawImage(
      img,
      startX,
      0,
      this.width,
      this.height,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height);
  }

  MainChar.prototype.fireArrow = function(){
    if (this.game.arrows.length < 1){
      this.game.addObject(new BubbleTrouble.Arrow(this.pos, this.game));
    }
  }

  MainChar.prototype.collidedWith = function(other){
    return BubbleTrouble.Util.RectCircleCollided(this, other);
  }

  MainChar.prototype.relocate = function(){
    this.pos[0] = Math.rand(BubbleTrouble.Game.DIM_X);
  }
})()
