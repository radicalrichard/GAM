var Enemy = function(){
	this.x = Math.floor(Math.random() * ($(window).width() + 1));
	this.y = -100;
	this.width = 25;
	this.height = 25;
	this.speed = Math.floor(Math.random() * 4) + 2;
	this.$el = $('<div>').addClass('enemy').css({
		left: this.x,
		top: this.y
	}).appendTo($('#game'));

	this.death = function(){
		this.$el.remove();
	};
};
