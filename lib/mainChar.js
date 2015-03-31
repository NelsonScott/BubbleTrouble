(function(){
  var MainChar = BubbleTrouble.MainChar = function(game){
    this.game = game;
    this.context = game.context;
    this.mainImage = new Image();
    this.mainImage.src = "images/mainUpright.png";
    this.width = 23;
    this.height = 37;
  }

  MainChar.prototype.draw = function(){
    this.context.drawImage(
      this.mainImage,
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
