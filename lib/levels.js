(function(){
  var Levels = BubbleTrouble.Levels = function(){
    this.levelCap = 2;
  }

  Levels.load = function(level, game){
    switch(level){
      case 1:
        this.levelOne(game);
        break;
    }
  }

  Levels.levelOne = function(game){
    var options = {};
    options.NumOfBubbles = 1;
    options.posArr = [
      this.makePosition(0, 0)
      ];
    options.vels = [[-5, 0]];
    options.bubbleMultiplier = 0;
    game.addBubbles(options);
  }

  Levels.makeRandomPosition = function(){
    return [Math.rand(BubbleTrouble.Game.DIM_X), BubbleTrouble.Game.DIM_Y/2];
  }

  Levels.makePosition = function(xOffset, yOffset){
    return [BubbleTrouble.Game.DIM_X/2 - xOffset, BubbleTrouble.Game.DIM_Y/2 - yOffset];
  }
})()
