(function(){
  var Sounds = BubbleTrouble.Sounds = function(){};

  Sounds.music = new Audio("Sounds/dramaticMusic.mp3");
  Sounds.music.volume = 0.3;
  Sounds.music.loop = true;
  Sounds.music.play();
  Sounds.popSound = new Audio("Sounds/pop.wav");
})()
