var Lazor = function(x, y){
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.width = 1;
    this.height = 2;
    this.$el = $('<div>').addClass('lazor').css({
      left: this.x,
      top: this.y
    }).appendTo($('#game'));

};

Lazor.prototype.update = function() {
  this.y -= this.speed;
  this.$el.css({top: this.y});
  if(this.y < 0){
    this.remove();
  }
};

Lazor.prototype.remove = function() {
  this.$el.remove();
  Game.lazors.shift();
};

var updateLazors = function(){
  for(i=0;i<Game.lazors.length;i++){
    var lazor = Game.lazors[i];
    lazor.update();
  }
};
