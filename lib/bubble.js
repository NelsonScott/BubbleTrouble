(function(){
  var Bubble = BubbleTrouble.Bubble = function(pos, game){
    this.context = game.context;
    BubbleTrouble.MovingObject.call(this, pos, Bubble.VELOCITY.slice(0), Bubble.RADIUS, Bubble.COLOR, game);
  }

  Bubble.VELOCITY = [-5, 0];
  Bubble.RADIUS = 6;
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
      this.game.remove(this);
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

  Bubble.prototype.handlePossibleCollision = function(other){
    if ((other instanceof BubbleTrouble.MainChar) && this.collidedWith(other)){
      other.relocate();
      this.game.remove(this);
    } else if ((other instanceof BubbleTrouble.Arrow) && this.collidedWith(other)){
      this.game.remove(other);
      this.game.remove(this);
    }
  }

  Bubble.prototype.collidedWith = function(other){
    return BubbleTrouble.Util.RectCircleCollided(other, this);
  }

})()
