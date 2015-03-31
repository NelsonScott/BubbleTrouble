(function(){
  var Game = BubbleTrouble.Game = function(context){
    this.context = context;
    this.mainChar = new BubbleTrouble.MainChar(this);
    this.bindKeys();
  }

  Game.DIM_X = 600;
  Game.DIM_Y = 300;
  Game.FLOOR = 0.15;
  Game.WALL = 0.01;
  Game.UPPER_BOUND = 0;
  Game.LOWER_BOUND = (1 - Game.FLOOR)*Game.DIM_Y;
  Game.LEFT_BOUND = Game.WALL*Game.DIM_X;
  Game.RIGHT_BOUND = (1 - Game.WALL)*Game.DIM_X;

  Game.MOVES = {
    "left": -1,
    "right": 1,
    "a": -1,
    "d": 1
  };

  Game.prototype.bindKeys = function(){
    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);

    var that = this;
    function keyDown(e) {
      if (e.keyCode == "37") {
        that.mainChar.walkingLeft = true;
      } else if (e.keyCode == "39") {
        that.mainChar.walkingRight = true;
      } else if (e.keyCode == "32"){
        console.log("Spacebar pressed.");
      }
    }

    function keyUp(e) {
      if (e.keyCode == "37") {
        that.mainChar.walkingLeft = false;
      } else if (e.keyCode == "39") {
        that.mainChar.walkingRight = false;
      }
    }
  }

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(obj){
      obj.move();
    })
  };

  Game.prototype.draw = function(){
    var that = this;
    this.drawBackground();
    this.allObjects().forEach(function(obj){
      obj.draw();
    });
  }

  Game.prototype.allObjects = function() {
    var all = [];
    all.push(this.mainChar);
    return all;
  }

  Game.prototype.drawBackground = function(){
    this.context.fillStyle = "blue";
    this.context.fillRect(0,0, Game.DIM_X, Game.DIM_Y);

    this.context.fillStyle = "grey";
    // floor
    this.context.fillRect(0, Game.LOWER_BOUND, Game.DIM_X, Game.DIM_Y);
    // walls
    this.context.fillRect(0, 0, Game.LEFT_BOUND, Game.DIM_Y);
    this.context.fillRect(Game.RIGHT_BOUND, 0, Game.DIM_X, Game.DIM_Y);
  }
})()
