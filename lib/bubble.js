(function(){
  var Bubble = BubbleTrouble.Bubble = function(pos, game){
    this.context = game.context;
    BubbleTrouble.MovingObject.call(this, pos, Bubble.VELOCITY.slice(0), Bubble.RADIUS, Bubble.COLOR, game);
  }

  Bubble.VELOCITY = [-5, 0];
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
    this.wrapY(pos);
    this.wrapX(pos);
  }

  Bubble.prototype.wrapY = function(pos){
    if (pos[1] > BubbleTrouble.Game.LOWER_BOUND) {
      pos[1] = BubbleTrouble.Game.LOWER_BOUND;
      this.vel[1] *= -1;
    }

    if (pos[1] < BubbleTrouble.Game.UPPER_BOUND){
      // remove self
    }
  }

  Bubble.prototype.wrapX = function(pos){
    if (pos[0] < BubbleTrouble.Game.LEFT_BOUND){
      pos[0] = BubbleTrouble.Game.LEFT_BOUND;
      this.vel[0] *= -1;
    }

    if (pos[0] > BubbleTrouble.Game.RIGHT_BOUND){
      pos[0] = BubbleTrouble.Game.RIGHT_BOUND;
      this.vel[0] *= -1;
    }
  }

  Bubble.prototype.handleCollision = function(other){
    if (other instaceof BubbleTrouble.MainChar){
      other.relocate();
      this.game.remove(this);
    }
  }
})()
