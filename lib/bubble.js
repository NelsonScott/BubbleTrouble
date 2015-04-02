(function(){
  var Bubble = BubbleTrouble.Bubble = function(pos, vel, r, game){
    this.context = game.context;
    BubbleTrouble.MovingObject.call(this, pos, vel, r, Bubble.COLOR, game);
  }

  Bubble.MIN_RADIUS = 6;
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
    if (pos[1] > BubbleTrouble.Game.LOWER_BOUND - this.r) {
      pos[1] = BubbleTrouble.Game.LOWER_BOUND - this.r;
      this.vel[1] *= -1;
    }

    if (pos[1] < BubbleTrouble.Game.UPPER_BOUND + this.r){
      this.game.remove(this);
    }
  }

  Bubble.prototype.wrapX = function(pos){
    if (pos[0] < BubbleTrouble.Game.LEFT_BOUND + this.r){
      pos[0] = BubbleTrouble.Game.LEFT_BOUND + this.r;
      this.vel[0] *= -1;
    }

    if (pos[0] > BubbleTrouble.Game.RIGHT_BOUND - this.r){
      pos[0] = BubbleTrouble.Game.RIGHT_BOUND - this.r;
      this.vel[0] *= -1;
    }
  }

  Bubble.prototype.handlePossibleCollision = function(other){
    if (!this.collidedWith(other)) return;

    if (other instanceof BubbleTrouble.MainChar){
      other.relocate();
      this.game.remove(this);
    } else if (other instanceof BubbleTrouble.Arrow){
      this.popBubble(other);
    }
  }

  Bubble.prototype.collidedWith = function(other){
    return BubbleTrouble.Util.RectCircleCollided(other, this);
  }

  Bubble.prototype.popBubble = function(other){
    this.game.remove(other);
    this.r > Bubble.MIN_RADIUS ? this.split() : this.game.remove(this);
  }

  Bubble.prototype.split = function(){
    var leftPos = this.pos.slice(0);
    var rightPos = this.pos.slice(0);
    this.game.addObject(new BubbleTrouble.Bubble(leftPos, [-3.5, -12], this.r/2, this.game));
    this.game.addObject(new BubbleTrouble.Bubble(rightPos, [3.5, -12], this.r/2, this.game));
    this.game.remove(this);
  }
})()
