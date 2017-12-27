(function(){
  var Game = BubbleTrouble.Game = function(context) {
    this.context = context;
    this.backgroundImg = BubbleTrouble.Images.level1BG;
    this.level = 0;
    this.arrows = [];
    this.bubbles = [];
    this.mainChar = new BubbleTrouble.MainChar(this);
    this.playing = true;
    this.bindKeys();
    BubbleTrouble.Sounds.music.volume = 0.15;
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FLOOR = 30;
  Game.WALL = 10;
  Game.UPPER_BOUND = 40;
  Game.LOWER_BOUND = Game.DIM_Y - Game.FLOOR;
  Game.LEFT_BOUND = Game.WALL;
  Game.RIGHT_BOUND = Game.DIM_X - Game.WALL;
  Game.LEVEL_PAUSE_TIME = 1500;

  Game.prototype.step = function () {
    if (!this.playing) { return; }

    this.checkState();
    this.moveObjects();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.checkState = function() {
    if (this.bubbles.length < 1) {
      this.startNextLevel();
    }
  };

  Game.prototype.startNextLevel = function () {
    this.level++;
    BubbleTrouble.Levels.load(this.level, this);

    var that = this;
    this.pause(Game.LEVEL_PAUSE_TIME, function() {
      that.displayLevel();
      that.draw();
    });
  };

  Game.prototype.pause = function (time, callback) {
    this.playing = false;
    BubbleTrouble.Sounds.music.pause();

    if (callback) {
      callback();
    }

    var that = this;
    setTimeout(function(){
      that.playing = true;
      BubbleTrouble.Sounds.music.play();
    }, time);
  };

  Game.prototype.displayLevel = function () {
    this.context.fillStyle = "gold";
    this.context.font = "60px Apple Chancery";

    var txt = "Level " + this.level;
    var txtWidth = this.context.measureText(txt).width;
    this.context.fillText(txt, BubbleTrouble.Game.DIM_X/2 - txtWidth/2, BubbleTrouble.Game.DIM_Y * 0.25);
  };

  Game.prototype.resetLevel = function () {
    this.arrows = [];
    this.bubbles = [];
    BubbleTrouble.Levels.load(this.level, this);
    this.pause(Game.LEVEL_PAUSE_TIME);
    this.draw();
    this.displayLevel();
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(obj){
      obj.move();
    });
  };

  Game.prototype.checkCollisions = function(){
    var allObjs = this.allObjects().slice(0);
    allObjs.forEach(function(first){
      allObjs.forEach(function(second){
        if (first === second) return;

        first.handlePossibleCollision(second);
      });
    });
  };

  Game.prototype.draw = function(){
    var that = this;
    this.drawBackground();
    this.allObjects().forEach(function(obj){
      obj.draw();
    });
  };

  Game.prototype.allObjects = function(){
    return [this.mainChar].concat(this.bubbles).concat(this.arrows);
  };

  Game.prototype.addObject = function(obj){
    if (obj instanceof BubbleTrouble.Bubble){
      this.bubbles.push(obj);
    } else if (obj instanceof BubbleTrouble.Arrow) {
      this.arrows.push(obj);
    }
  };

  Game.prototype.remove = function(obj){
    if (obj instanceof BubbleTrouble.Bubble){
      this.bubbles.splice(this.bubbles.indexOf(obj), 1);
    } else if (obj instanceof BubbleTrouble.Arrow) {
      this.arrows.splice(this.arrows.indexOf(obj), 1);
    }
  };

  Game.prototype.addBubbles = function(options){
    var pos, vel, mult, col, bubble;

    for (var i = 0; i < options.NumOfBubbles; i++){
      pos = options.posArr[i];
      vel = options.vels[i];
      mult = options.bubbleMultiplier;
      col = options.color;
      this.addObject(new BubbleTrouble.Bubble(pos, vel, this.makeRadius(mult), col, this));
    }
  };

  Game.prototype.makeRadius = function(multiplier){
    return BubbleTrouble.Bubble.MIN_RADIUS * Math.pow(2, multiplier);
  };

  Game.prototype.drawBackground = function(){
    this.context.drawImage(
      this.backgroundImg,
      0,
      0,
      Game.DIM_X,
      Game.DIM_Y
    );
    this.drawFloorAndCeiling();
    this.drawWalls();
    this.drawLives();
  };

  Game.prototype.drawLives = function () {
    var lifeWidth = BubbleTrouble.Images.life.width;
    var startX = Game.RIGHT_BOUND - lifeWidth*this.mainChar.extraLives;

    for (var i = 0; i < this.mainChar.extraLives; i++){
      this.context.drawImage(
        BubbleTrouble.Images.life,
        startX,
        Game.UPPER_BOUND + 10
      );
      startX += lifeWidth;
    }
  };

  Game.prototype.drawFloorAndCeiling = function(){
    this.context.fillStyle = this.context.createPattern(BubbleTrouble.Images.floor, "repeat");
    this.context.fillRect(0, Game.LOWER_BOUND, Game.DIM_X, Game.DIM_Y);

    this.context.fillStyle = this.context.createPattern(BubbleTrouble.Images.ceiling, "repeat");
    this.context.fillRect(0, 0, Game.DIM_X, Game.UPPER_BOUND);
  };

  Game.prototype.drawWalls = function(){
    this.drawWall(0);
    this.drawWall(Game.RIGHT_BOUND);
  };

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
  };

  Game.prototype.gameOver = function(){
    this.playing = false;
    $(".gameover").fadeIn(800);
  };

  Game.prototype.restartGame = function(context){
    this.arrows = [];
    this.bubbles = [];
    this.mainChar = new BubbleTrouble.MainChar(this);
    this.level = 0;
    $(".gameover").hide();
    this.playing = true;
  };

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
  };

})();
