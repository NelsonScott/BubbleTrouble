(function(){
  var Arrow = BubbleTrouble.Arrow = function(pos, game){
    this.pos = pos.slice(0);
    this.pos[0] += game.mainChar.width*.40;
    this.game = game;
    this.context = game.context;
  }

  Arrow.IMG = new Image();
  Arrow.IMG.src = "images/arrow.png";
  Arrow.Y_DELTA = 5;
  Arrow.WIDTH = 4;
  Arrow.HEIGHT = 368;
  Arrow.inherits(BubbleTrouble.MovingObject);

  Arrow.prototype.move = function(){
    this.pos[1] -= Arrow.Y_DELTA;
  }

  Arrow.prototype.draw = function(){
    this.context.drawImage(
      Arrow.IMG,
      0,
      0,
      Arrow.WIDTH,
      Arrow.HEIGHT,
      this.pos[0],
      this.pos[1],
      Arrow.WIDTH,
      Arrow.HEIGHT);
  }
})()
