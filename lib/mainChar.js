(function(){
  var MainChar = BubbleTrouble.MainChar = function(game){
    this.game = game;
    this.context = game.context;
    this.uprightImg = new Image();
    this.uprightImg.src = "images/mainUpright.png";
    this.width = 23;
    this.height = 37;
  }

  MainChar.prototype.draw = function(){
    this.context.drawImage(
      this.uprightImg,
      0,
      0,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height);
  }
})()
