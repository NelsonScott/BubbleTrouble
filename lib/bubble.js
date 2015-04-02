(function(){
  var Bubble = BubbleTrouble.Bubble = function(pos, game){
    this.context = game.context;
    BubbleTrouble.MovingObject.call(this, pos, Bubble.VELOCITY, Bubble.RADIUS, Bubble.COLOR, game);
    this.oldTime = new Date().getTime();
  }

  Bubble.VELOCITY = [0, 0];
  Bubble.RADIUS = 5;
  Bubble.COLOR = "red";
  Bubble.GRAVITY = 0.6125;
  Bubble.inherits(BubbleTrouble.MovingObject);

  Bubble.prototype.move = function(){
    this.vel[1] += Bubble.GRAVITY;
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.wrap(this.pos);
  }

  Bubble.prototype.wrap = function(pos){
    // first make it bounce up and down
    if (pos[1] > BubbleTrouble.Game.LOWER_BOUND) {
      pos[1] = BubbleTrouble.Game.LOWER_BOUND;
      this.oldTime = new Date().getTime();
      this.vel[1] *= -1;
    }
  }
})()
