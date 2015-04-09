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
    options.posArr = [[BubbleTrouble.Util.rand(BubbleTrouble.Game.DIM_X), BubbleTrouble.Game.DIM_Y/2]];
    options.vels = [[-5, 0]];
    options.bubbleMultiplier = 3;
    game.addBubbles(options);
  }
})()
