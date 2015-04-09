(function(){
  var Game = BubbleTrouble.Game = function(context){
    this.context = context;
    this.arrows = [];
    this.bubbles = [];
    this.mainChar = new BubbleTrouble.MainChar(this);
    this.bubbleRadius = 6;
    this.NumOfBubbles = 1;
    this.bubbleMultiplier = 3;
    this.addBubbles(this.NumOfBubbles);
    this.bindKeys();
    BubbleTrouble.Sounds.music.volume = 0.15;
  }

  Game.makeImage = function(source){
    var img = new Image();
    img.src = source;
    return img;
  }

  Game.CEILING_IMG = Game.makeImage("Images/spikes.png");
  Game.FLOOR_IMG = Game.makeImage("Images/floor.png");
  Game.WALL_IMG = Game.makeImage("Images/wall2.png");
  Game.BG_IMG = Game.makeImage("Images/level1.jpg");
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FLOOR = 30;
  Game.WALL = 10;
  Game.UPPER_BOUND = 40;
  Game.LOWER_BOUND = Game.DIM_Y - Game.FLOOR;
  Game.LEFT_BOUND = Game.WALL;
  Game.RIGHT_BOUND = Game.DIM_X - Game.WALL;

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
      if (e.keyCode == "37" || e.keyCode == "65") {
        that.mainChar.walkingLeft = true;
      } else if (e.keyCode == "39" || e.keyCode == "68") {
        that.mainChar.walkingRight = true;
      } else if (e.keyCode == "32"){
        that.mainChar.fireArrow();
      }
    }

    function keyUp(e) {
      if (e.keyCode == "37" || e.keyCode == "65") {
        that.mainChar.walkingLeft = false;
      } else if (e.keyCode == "39" || e.keyCode == "68") {
        that.mainChar.walkingRight = false;
      }
    }
  }

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(obj){
      obj.move();
    })
  };

  Game.prototype.checkCollisions = function(){
    var that = this;
    this.allObjects().forEach(function(first){
      that.allObjects().forEach(function(second){
        if (first !== second){
          first.handlePossibleCollision(second);
        }
      })
    })
  }

  Game.prototype.draw = function(){
    var that = this;
    this.drawBackground();
    this.allObjects().forEach(function(obj){
      obj.draw();
    });
  }

  Game.prototype.allObjects = function(){
    return [this.mainChar].concat(this.bubbles).concat(this.arrows);
  }

  Game.prototype.addObject = function(obj){
    if (obj instanceof BubbleTrouble.Bubble){
      this.bubbles.push(obj);
    } else if (obj instanceof BubbleTrouble.Arrow) {
      this.arrows.push(obj);
    }
  }

  Game.prototype.remove = function(obj){
    if (obj instanceof BubbleTrouble.Bubble){
      this.bubbles.splice(this.bubbles.indexOf(obj), 1);
    } else if (obj instanceof BubbleTrouble.Arrow) {
      this.arrows.splice(this.arrows.indexOf(obj), 1);
    }
  }

  Game.prototype.addBubbles = function(n){
    for (var i = 0; i < n; i++){
      var xCoord = BubbleTrouble.Util.rand(Game.DIM_X);
      this.addObject(new BubbleTrouble.Bubble([xCoord, Game.DIM_Y/2], [-5, 0], this.bubbleRadius*Math.pow(2, this.bubbleMultiplier), this));
    }
  }

  Game.prototype.drawBackground = function(){
    this.context.drawImage(
      Game.BG_IMG,
      0,
      0,
      Game.DIM_X,
      Game.DIM_Y
    )

    this.drawFloorAndCeiling();
    this.drawWalls();
  }

  Game.prototype.drawFloorAndCeiling = function(){
    this.context.fillStyle = this.context.createPattern(Game.FLOOR_IMG, "repeat");
    this.context.fillRect(0, Game.LOWER_BOUND, Game.DIM_X, Game.DIM_Y);

    this.context.fillStyle = this.context.createPattern(Game.CEILING_IMG, "repeat");
    this.context.fillRect(0, 0, Game.DIM_X, Game.UPPER_BOUND);
  }

  Game.prototype.drawWalls = function(){
    this.drawWall(0);
    this.drawWall(Game.RIGHT_BOUND);
  }

  Game.prototype.drawWall = function(startX){
    this.context.drawImage(
      Game.WALL_IMG,
      0,
      0,
      Game.WALL_IMG.width,
      Game.WALL_IMG.height,
      startX,
      0,
      Game.WALL,
      Game.LOWER_BOUND
    );
  }
})()
