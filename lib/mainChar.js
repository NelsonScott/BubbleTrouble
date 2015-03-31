(function(){
  var MainChar = BubbleTrouble.MainChar = function(game){
    this.vel = 0;
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
  }

  MainChar.inherits(BubbleTrouble.MovingObject);
  //TODO dry these up, add animation logic
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
    this.context.drawImage(
      this.uprightImg,
      0,
      0,
      this.width,
      this.height,
      this.pos[0],
      this.pos[1] - this.height,
      this.width,
      this.height);
  }

  MainChar.prototype.walk = function(direction){
    if (direction == "left"){
      this.context.drawImage(
        this.walkingLeftImg,
        0,
        0,
        this.width,
        this.height,
        this.pos[0],
        this.pos[1] - this.height,
        this.width,
        this.height);
    } else {
      this.context.drawImage(
        this.walkingRightImg,
        0,
        0,
        this.width,
        this.height,
        this.pos[0],
        this.pos[1] - this.height,
        this.width,
        this.height);
    }
  }
})()
