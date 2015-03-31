(function(){
  var Arrow = BubbleTrouble.Arrow = function(pos, game){
    this.pos = pos.slice(0);
    this.pos[0] += game.mainChar.width*.40;
    this.game = game;
    this.context = game.context;
    this.img = new Image();
    this.img.src = "images/arrow.png";
    this.width = 4;
    this.height = 37;
  }

  Arrow.Y_DELTA = 5;
  Arrow.inherits(BubbleTrouble.MovingObject);

  Arrow.prototype.move = function(){
    this.height += Arrow.Y_DELTA;
  }

  Arrow.prototype.draw = function(){
    this.context.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.pos[0],
      this.pos[1] - this.height,
      this.width,
      this.height);
  }
})()
