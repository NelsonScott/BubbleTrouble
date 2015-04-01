(function(){
  var Game = BubbleTrouble.Game = function(context){
    this.context = context;
    this.wallImg = new Image();
    this.wallImg.src = "images/wall2.png";
    this.floorImg = new Image();
    this.floorImg.src = "images/floor.png";
    this.ceilingImg = new Image();
    this.ceilingImg.src = "images/spikes.png";
    this.allObjects = [];
    this.mainChar = new BubbleTrouble.MainChar(this);
    this.allObjects.push(this.mainChar);
    this.bindKeys();
  }

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
      if (e.keyCode == "37") {
        that.mainChar.walkingLeft = true;
      } else if (e.keyCode == "39") {
        that.mainChar.walkingRight = true;
      } else if (e.keyCode == "32"){
        that.mainChar.fireArrow();
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
    this.allObjects.forEach(function(obj){
      obj.move();
    })
  };

  Game.prototype.draw = function(){
    var that = this;
    this.drawBackground();
    this.allObjects.forEach(function(obj){
      obj.draw();
    });
  }

  Game.prototype.addObject = function(obj){
    this.allObjects.push(obj);
  }

  Game.prototype.drawBackground = function(){
    this.context.fillStyle = "blue";
    this.context.fillRect(0,0, Game.DIM_X, Game.DIM_Y);

    this.drawTopAndBottom();
    this.drawWalls();
  }

  Game.prototype.drawTopAndBottom = function(){
    this.context.fillStyle = this.context.createPattern(this.floorImg, "repeat");
    this.context.fillRect(0, Game.LOWER_BOUND, Game.DIM_X, Game.DIM_Y);

    this.context.fillStyle = this.context.createPattern(this.ceilingImg, "repeat");
    this.context.fillRect(0, 0, Game.DIM_X, Game.UPPER_BOUND);
  }

  Game.prototype.drawWalls = function(){
    this.drawWall(0);
    this.drawWall(Game.RIGHT_BOUND);
  }

  Game.prototype.drawWall = function(startX){
    this.context.drawImage(
      this.wallImg,
      0,
      0,
      this.wallImg.width,
      this.wallImg.height,
      startX,
      0,
      Game.WALL,
      Game.LOWER_BOUND
    );
  }
})()
