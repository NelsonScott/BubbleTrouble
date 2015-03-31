(function(){
  var Game = BubbleTrouble.Game = function(context){
    this.context = context;
  }

  Game.DIM_X = 600;
  Game.DIM_Y = 300;
  Game.FLOOR = 0.15;
  Game.WALL = 0.01;

  Game.LOWER_BOUND = (1 - Game.FLOOR)*Game.DIM_Y;
  Game.LEFT_BOUND = Game.WALL*Game.DIM_X;
  Game.RIGHT_BOUND = (1 - Game.WALL)*Game.DIM_X;

  Game.prototype.draw = function(){
    var that = this;
    this.drawBackground(this.context);
    this.allObjects().forEach(function(obj){
      obj.draw(that.context);
    });
  }

  Game.prototype.allObjects = function() {
    var all = [];
    all.push(new BubbleTrouble.MovingObject([Game.DIM_X/2,Game.DIM_Y/2], [0,0], 5, "red", this))
    all.push(new BubbleTrouble.MainChar(this));
    return all;
  }

  Game.prototype.drawBackground = function(context){
    // bg img
    context.fillStyle = "blue";
    context.fillRect(0,0, Game.DIM_X, Game.DIM_Y);

    context.fillStyle = "grey";
    // floor
    context.fillRect(0, Game.LOWER_BOUND, Game.DIM_X, Game.DIM_Y);
    // walls
    context.fillRect(0, 0, Game.LEFT_BOUND, Game.DIM_Y);
    context.fillRect(Game.RIGHT_BOUND, 0, Game.DIM_X, Game.DIM_Y);
  }
})()
