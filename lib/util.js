(function () {
  if (typeof BubbleTrouble == "undefined"){
    BubbleTrouble = {};
  }

  if (typeof BubbleTrouble.Util == "undefined") {
    BubbleTrouble.Util = {};
  };

  var Util = BubbleTrouble.Util;

  Util.randomVec = function (length) {
    var x = Math.random() * length;
    var y = Math.random() * length;
    return [x, y];
  };

  Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return this.scale(vec, 1 / norm);
  };

  Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  Util.randomVec = function (length) {
    var deg = 2 * Math.PI * Math.random();

    return this.scale([Math.sin(deg), Math.cos(deg)], length);
  };

  Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  Util.rand = function(range){
    return Math.round(Math.random()*range);
  }

  Function.prototype.inherits = function (ParentClass) {
    function Surrogate(){};
    Surrogate.prototype = ParentClass.prototype;
    this.prototype = new Surrogate();
  };

})();
