(function(){
  var keyBindings = BubbleTrouble.keyBindings = function(game) {
    this.game = game;
  };

  keyBindings.prototype.bindKeys = function(){
    var game = this.game;

    $(".restart").on("click", game.restartGame.bind(game));
    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);

    function keyDown(e) {
      // left arrow or 'a'
      if (e.keyCode == "37" || e.keyCode == "65") {
        game.mainChar.walkingLeft = true;
      } // right arrow or 'd'
      else if (e.keyCode == "39" || e.keyCode == "68") {
        game.mainChar.walkingRight = true;
      } // spacebar
      else if (e.keyCode == "32") {
        game.mainChar.fireArrow();
      }
      else if (e.keyCode == "80") {
        game.playing = !game.playing;
      }
    }

    function keyUp(e) {
      if (e.keyCode == "37" || e.keyCode == "65") {
        game.mainChar.walkingLeft = false;
      } else if (e.keyCode == "39" || e.keyCode == "68") {
        game.mainChar.walkingRight = false;
      }
    }
  };
})();
