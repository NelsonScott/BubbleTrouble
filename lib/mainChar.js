(function(){
  var MainChar = BubbleTrouble.MainChar = function(game){
    this.pos = [BubbleTrouble.Game.DIM_X/2, BubbleTrouble.Game.LOWER_BOUND];
    this.game = game;
    this.context = game.context;
    this.uprightImg = new Image();
    this.uprightImg.src = "images/mainUpright.png";
    this.walkingLeftImg = new Image();
    this.walkingLeftImg.src = "images/mainWalkingLeft.png";
    this.walkingRightImg = new Image();
    this.walkingRightImg.src = "images/mainWalkingRight.png";
    this.width = 25;
    this.height = 37;
    this.frame = 0;
    this.frameLimit = 2;
  }

  MainChar.inherits(BubbleTrouble.MovingObject);

  MainChar.prototype.move = function() {
    if (this.walkingLeft){
      this.pos[0] += -5;
    } else if (this.walkingRight){
      this.pos[0] += 5;
    }
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
    this.drawMain(this.uprightImg, 0);
  }

  MainChar.prototype.walk = function(direction){
    if (direction == "left"){
      this.drawMain(this.walkingLeftImg, this.width*this.frame);
    } else {
      this.drawMain(this.walkingRightImg, this.width*this.frame);
    }
    this.frame = (this.frame + 1) % this.frameLimit;
  }
  
  MainChar.prototype.drawMain = function(img, startX){
    this.context.drawImage(
      img,
      startX,
      0,
      this.width,
      this.height,
      this.pos[0],
      this.pos[1] - this.height,
      this.width,
      this.height);
  }
})()
