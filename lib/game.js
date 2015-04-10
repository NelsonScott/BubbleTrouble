(function(){
  var Game = BubbleTrouble.Game = function(context){
    this.context = context;
    this.backgroundImg = BubbleTrouble.Images.level1BG;
    this.level = 0;
    this.arrows = [];
    this.bubbles = [];
    this.mainChar = new BubbleTrouble.MainChar(this);
    this.bindKeys();
    BubbleTrouble.Sounds.music.volume = 0.15;
  }

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FLOOR = 30;
  Game.WALL = 10;
  Game.UPPER_BOUND = 40;
  Game.LOWER_BOUND = Game.DIM_Y - Game.FLOOR;
  Game.LEFT_BOUND = Game.WALL;
  Game.RIGHT_BOUND = Game.DIM_X - Game.WALL;

  Game.prototype.checkState = function(){
    if (this.bubbles.length < 1){
      this.level++;
      BubbleTrouble.Levels.load(this.level, this);
    }
  }

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(obj){
      obj.move();
    })
  };

  Game.prototype.checkCollisions = function(){
    var allObjs = this.allObjects().slice(0);
    allObjs.forEach(function(first){
      allObjs.forEach(function(second){
        if (first === second) return;

        first.handlePossibleCollision(second);
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

  Game.prototype.addBubbles = function(options){
    var pos, vel, mult, col, bubble;

    for (var i = 0; i < options.NumOfBubbles; i++){
      pos = options.posArr[i];
      vel = options.vels[i];
      mult = options.bubbleMultiplier;
      col = options.color;
      this.addObject(new BubbleTrouble.Bubble(pos, vel, this.makeRadius(mult), col, this));
    }
  }

  Game.prototype.makeRadius = function(multiplier){
    return BubbleTrouble.Bubble.MIN_RADIUS*Math.pow(2, multiplier);
  }

  Game.prototype.drawBackground = function(){
    this.context.drawImage(
      this.backgroundImg,
      0,
      0,
      Game.DIM_X,
      Game.DIM_Y
    )

    this.drawFloorAndCeiling();
    this.drawWalls();
  }

  Game.prototype.drawFloorAndCeiling = function(){
    this.context.fillStyle = this.context.createPattern(BubbleTrouble.Images.floor, "repeat");
    this.context.fillRect(0, Game.LOWER_BOUND, Game.DIM_X, Game.DIM_Y);

    this.context.fillStyle = this.context.createPattern(BubbleTrouble.Images.ceiling, "repeat");
    this.context.fillRect(0, 0, Game.DIM_X, Game.UPPER_BOUND);
  }

  Game.prototype.drawWalls = function(){
    this.drawWall(0);
    this.drawWall(Game.RIGHT_BOUND);
  }

  Game.prototype.drawWall = function(startX){
    this.context.drawImage(
      BubbleTrouble.Images.wall,
      0,
      0,
      BubbleTrouble.Images.wall.width,
      BubbleTrouble.Images.wall.height,
      startX,
      0,
      Game.WALL,
      Game.LOWER_BOUND
    );
  }

  Game.prototype.gameOver = function(){
    $(".gameover").fadeIn(800);
  }

  Game.prototype.restartGame = function(context){
    this.arrows = [];
    this.bubbles = [];
    this.mainChar = new BubbleTrouble.MainChar(this);
    this.level = 0;
  }

  Game.prototype.bindKeys = function(){
    $(".restart").on("click", this.restartGame.bind(this));
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

})()
