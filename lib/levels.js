(function(){
  var Levels = BubbleTrouble.Levels = function(){
    this.levelCap = 2;
    this.DIM_X = BubbleTrouble.Game.DIM_X;
    this.DIM_Y = BubbleTrouble.Game.DIM_Y;
  }

  Levels.load = function(level, game){
    var options = {};

    switch(level){
      case 1:
        this.levelOne(game, options);
        break;

      case 2:
        this.levelTwo(game, options);
        break;
      default:
        console.log("You Win!");
        break;
    }
  }

  Levels.levelOne = function(game, options){
    options.NumOfBubbles = 2;
    options.posArr = [
      this.makePosition(0, 0),
      this.makePosition(0, 0)
      ];
    options.vels = [[-5, 0], [5, 0]];
    options.bubbleMultiplier = 3;
    game.addBubbles(options);
  }

  Levels.levelTwo = function(game, options){
    options.NumOfBubbles = 3;
    options.posArr = [
      this.makePosition()
    ]
  }

  Levels.makeRandomPosition = function(){
    return [Math.rand(this.DIM_X), this.DIM_Y/2];
  }

  Levels.makePosition = function(xOffset, yOffset){
    return [this.DIM_X/2 - xOffset, this.DIM_Y/2 - yOffset];
  }
})()
