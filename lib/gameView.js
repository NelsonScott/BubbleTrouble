(function(){
  if (typeof BubbleTrouble == "undefined"){
    BubbleTrouble = {};
  }

  var GameView = BubbleTrouble.GameView = function(game){
    this.game = game;
  }

  GameView.FPS = 32;

  GameView.prototype.start = function(){
    var that = this;
    setInterval( function() {
    that.game.moveObjects();
    that.game.draw();
    that.game.checkCollisions();
    // that.game.checkState();
    }, 1000/GameView.FPS);
  }
})()
