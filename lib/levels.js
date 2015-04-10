(function(){
  var Levels = BubbleTrouble.Levels = function(){
    this.levelCap = 2;
  }

  Levels.load = function(level, game){
    var options = {};

    switch(level){
      case 1:
        BubbleTrouble.Sounds.startSound.play();
        this.levelOne(game, options);
        break;
      case 2:
        BubbleTrouble.Sounds.startSound.play();
        this.levelTwo(game, options);
        break;
      default:
        console.log("You Won!");
        break;
    }
  }

  Levels.levelOne = function(game, options){
    options.NumOfBubbles = 2;
    options.color = "red";
    options.posArr = [
      this.makePosition(0, 0),
      this.makePosition(0, 0)
      ];
    options.vels = [
      [-5, 0],
      [5, 0]
    ];
    options.bubbleMultiplier = 3;
    game.addBubbles(options);
  }

  Levels.levelTwo = function(game, options){
    options.NumOfBubbles = 3;
    options.color = "blue";
    options.posArr = [
      this.makePosition(BubbleTrouble.Game.DIM_X/2, 0),
      this.makePosition(-BubbleTrouble.Game.DIM_X/2, 0),
      this.makePosition(0, 0)
      ];
    options.vels = [
      [5, 0],
      [-5, 0],
      [0, 0]
    ];
    options.bubbleMultiplier = 2;
    game.addBubbles(options);

  }

  Levels.makeRandomPosition = function(){
    return [Math.rand(BubbleTrouble.Game.DIM_X), BubbleTrouble.Game.DIM_Y/2];
  }

  Levels.makePosition = function(xOffset, yOffset){
    return [BubbleTrouble.Game.DIM_X/2 - xOffset, BubbleTrouble.Game.DIM_Y/2 - yOffset];
  }
})()
