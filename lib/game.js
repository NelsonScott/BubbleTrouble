(function(){
  var Game = BubbleTrouble.Game = function(context){
    this.context = context;
  }

  Game.DIM_X = 600;
  Game.DIM_Y = 300;
  Game.FLOOR = 0.85;
  Game.WALL = 0.01;

  Game.prototype.draw = function(){
    var that = this;
    this.drawBackground(this.context);
    this.allObjects().forEach(function(obj){
      obj.draw(that.context);
    });
  }

  Game.prototype.allObjects = function() {
    return [].concat(new BubbleTrouble.MovingObject([Game.DIM_X/2,Game.DIM_Y/2], [0,0], 5, "red", this));
  }

  Game.prototype.drawBackground = function(context){
    context.fillStyle = "blue";
    context.fillRect(0,0, Game.DIM_X, Game.DIM_Y);

    context.fillStyle = "grey";
    context.fillRect(0, Game.FLOOR*Game.DIM_Y, Game.DIM_X, Game.DIM_Y);
    context.fillRect(0, 0, Game.WALL*Game.DIM_X, Game.DIM_Y);
    context.fillRect((1 - Game.WALL)*Game.DIM_X, 0, Game.DIM_X, Game.DIM_Y);
  }
})()
