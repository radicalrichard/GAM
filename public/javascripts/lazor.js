var Lazor = function(x, y){
    this.x = x;
    this.y = y;
    this.speed = 10;
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
  if(this.checkCollisions()) {
    this.remove();
  }
  if(this.y < 0){
    this.remove();
  }
};

Lazor.prototype.remove = function() {
  this.$el.remove();
  Game.lazors.shift();
};

Lazor.prototype.checkCollisions = function(){
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    if (this.x < enemy.x + enemy.width  && this.x + this.width  > enemy.x &&
      this.y < enemy.y + enemy.height && this.y + this.height > enemy.y) {
      enemy.death();
      return true;
    }
  }
};


var updateLazors = function(){
  for(i=0;i<Game.lazors.length;i++){
    var lazor = Game.lazors[i];
    lazor.update();
  }
};
