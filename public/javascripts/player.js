var Player = function(){
	this.maxspeed = 20;
	this.dx = 0;
	this.dy = 0;
	this.accel = 0.5;
	this.$el = $('#box');
	this.width = this.$el.width();
	this.height = this.$el.height();
	this.x = 500;
	this.y = 200;
};

Player.prototype.update = function(){
	// Accelerate
	for(key in direction){
		if(direction[key]){
			if(key === 'right') this.dx += this.accel;
			if(key === 'left') this.dx -= this.accel;
			if(key === 'up') this.dy -= this.accel;
			if(key === 'down') this.dy += this.accel;
			moving = true;
		}
	}

	if(this.dx > 0) this.dx -= Game.friction;
	if(this.dx < 0) this.dx += Game.friction;
	if(this.dy > 0) this.dy -= Game.friction;
	if(this.dy < 0) this.dy += Game.friction;

	if(this.dx > this.maxspeed) this.dx = this.maxspeed;
	if(this.dx < -this.maxspeed) this.dx = -this.maxspeed;
	if(this.dy > this.maxspeed) this.dy = this.maxspeed;
	if(this.dy < -this.maxspeed) this.dy = -this.maxspeed;

	this.x += this.dx;
	this.y += this.dy;

	Game.withinBounds(this);

	this.$el.css({top: this.y, left: this.x});
};

Player.prototype.checkCollisions = function(enemy){
	if (this.x < enemy.x + enemy.width  && this.x + this.width  > enemy.x &&
    this.y < enemy.y + enemy.height && this.y + this.height > enemy.y) {
		this.$el.addClass('ded');
		setTimeout(function(){
			Game.end();
		}, 2000);

		return true;
	} else{
		return false;
	}
};

Player.prototype.shoot = function(){
	Game.lazors.push(new Lazor(this.x + (this.width/2), this.y));
};
