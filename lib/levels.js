(function(){
  var Levels = BubbleTrouble.Levels = function(){
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
      case 3:
        BubbleTrouble.Sounds.startSound.play();
        this.levelThree(game, options);
        break;
      case 4:
        BubbleTrouble.Sounds.startSound.play();
        this.levelFour(game, options);
        break;
      default:
        game.gameOver();
        break;
    }
  }

  Levels.levelOne = function(game, options){
    game.backgroundImg = BubbleTrouble.Images.level1BG;
    options.NumOfBubbles = 2;
    options.color = "red";
    options.posArr = [
      this.makePosition(.5, .5),
      this.makePosition(.5, .5)
      ];
    options.vels = [ [-5, 0], [5, 0] ];
    options.bubbleMultiplier = 3;
    game.addBubbles(options);
  }

  Levels.levelTwo = function(game, options){
    game.backgroundImg = BubbleTrouble.Images.level2BG;
    options.NumOfBubbles = 3;
    options.color = "blue";
    options.posArr = [
      this.makePosition(0, 0.5),
      this.makePosition(1, 0.5),
      this.makePosition(0.5, 0.5)
      ];
    options.vels = [ [5, 0], [-5, 0], [0, 0] ];
    options.bubbleMultiplier = 2;
    game.addBubbles(options);
  }

  Levels.levelThree = function(game, options){
    game.backgroundImg = BubbleTrouble.Images.level3BG;
    options.NumOfBubbles = 2;
    options.color = "#69ef72";
    options.posArr = [
      this.makePosition(0, 0.75),
      this.makePosition(1, 0.75),
    ];
    options.vels = [ [5, 0],[-5, 0] ];
    options.bubbleMultiplier = 2;
    game.addBubbles(options);

    options.NumOfBubbles = 2;
    options.color = "#d254bb";
    options.posArr = [
      this.makePosition(0, 0.25),
      this.makePosition(1, 0.25),
    ];
    options.vels = [ [5, 0], [-5, 0] ];
    options.bubbleMultiplier = 3;
    game.addBubbles(options);
  }

  Levels.levelFour = function(game, options){
    game.backgroundImg = BubbleTrouble.Images.level4BG;
    options.NumOfBubbles = 5;
    options.color = "#005247";
    options.posArr = [
      this.makePosition(0.2, 0.2),
      this.makePosition(0.4, 0.4),
      this.makePosition(0.6, 0.6),
      this.makePosition(0.8, 0.8),
      this.makePosition(1, 1)
    ];
    options.vels = [ [5, 0], [5, 0], [5, 0], [5, 0], [5, 0] ];
    options.bubbleMultiplier = 1;
    game.addBubbles(options);

  }

  Levels.makeRandomPosition = function(){
    return [Math.rand(BubbleTrouble.Game.DIM_X), BubbleTrouble.Game.DIM_Y/2];
  }

  Levels.makePosition = function(xPercent, yPercent){
    return [BubbleTrouble.Game.DIM_X*xPercent, BubbleTrouble.Game.DIM_Y*yPercent];
  }
})()
