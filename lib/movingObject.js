(function(){
  var MovingObject = BubbleTrouble.MovingObject = function(pos, vel, r, color, game){
    this.pos = pos;
    this.vel = vel;
    this.r = r;
    this.color = color;
    this.game = game;
  }

  MovingObject.prototype.draw = function(context){
      context.beginPath();
      context.arc(this.pos[0], this.pos[1], this.r, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 0.5;
      context.strokeStyle = 'black';
      context.stroke();
  }

  MovingObject.prototype.wrap = function(pos){
    pos[0] = Math.min(pos[0], BubbleTrouble.Game.RIGHT_BOUND - this.width);
    pos[0] = Math.max(pos[0], BubbleTrouble.Game.LEFT_BOUND);
  }
})()
