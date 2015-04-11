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
      that.game.step();
    }, 1000/GameView.FPS);
  }
})()
