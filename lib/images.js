(function(){
  var Images = BubbleTrouble.Images = {};

  Images.makeImage = function(source){
    var img = new Image();
    img.src = source;
    return img;
  }

  Images.ceiling = Images.makeImage("Images/spikes.png");
  Images.floor = Images.makeImage("Images/floor.png");
  Images.wall = Images.makeImage("Images/wall2.png");
  Images.level1BG = Images.makeImage("Images/level1.jpg");
  Images.level2BG = Images.makeImage("Images/level2.jpg");

  Images.charWalkLeft = Images.makeImage("Images/mainWalkingLeft.png");
  Images.charWalkRight = Images.makeImage("Images/mainWalkingRight.png");
  Images.charWalkUpright = Images.makeImage("Images/mainUpright.png");
  Images.life = Images.makeImage("Images/heart.png");

  Images.arrow = Images.makeImage("Images/arrow.png");
})()
