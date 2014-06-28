var direction = {
			right: false,
			left: false,
			up: false,
			down: false
		};

$game = $('#game');

var Game = {
	loopId: null,

	ticks: 0,

	friction: 0.1,

	player: new Player(),

	stars: [],

	lazors: [],

	end: function(){
		cancelAnimationFrame(Game.loopId);
		$('#menu')
			.append('last score was ' + $('#score').text())
			.fadeIn();
		$('#score').text(0);
		for(i=0;i<enemies.length;i++){
			destroyEnemy(enemies[i], i);
		}
	},

	render: function(){
		updateEnemies();
		this.player.update();
		updateCounter();
		updateStars();
		updateLazors();
	},

	start: function(){
		$('#box').removeClass('ded');
		Game.loop();
	},

	// Main Loop
	loop: function(){
		Game.loopId = requestAnimFrame(Game.loop);
		Game.render();
	},

	withinBounds: function(el){
		var shipBottom = el.y + el.height,
				shipRight = el.x + el.width;
		var screenBottom = $game.height(),
				screenRight = $game.width();

		// Bottom
		if(shipBottom >= screenBottom){
			el.y = screenBottom - el.height - 5;
			el.dy = 0;
			return false;
		}

		// Top
		if(el.y <= 0){
			el.y = 5;
			el.dy = 0;
			return false;
		}

		// Right
		if(shipRight >= screenRight){
			el.x = screenRight - el.width - 5;
			el.dx = 0;
			return false;
		}

		// Left
		if(el.x <= 0){
			el.x = 5;
			el.dx = 0;
			return false;
		}

		return true;
	}
}; // End GAME functions

//stars n shit -------------------------------------------------------
var Star = function(){
	this.x = Math.floor(Math.random() * ($game.width() + 1));
	this.y = -100;
	this.width = 100;
	this.height = 100;
	this.speed = Math.floor(Math.random() * 6) + 5;
	this.$el = $('<div>').addClass('star').css({
		left: this.x,
		top: this.y,
	}).appendTo($game);

	this.death = function(){
		this.$el.remove();
	};
};

function updateStars(){
	if(Math.floor(Math.random() * 8) == 1) Game.stars.push(new Star());

	for(i=0;i<Game.stars.length;i++){
		var star = Game.stars[i];
		star.y += star.speed;
		star.$el.css({left: star.x, top: star.y});
		if(star.y > $game.height()){
			destroyStar(star, i);
		}
	}
}
for(i=0;i<3;i++){
	Game.stars.push(new Star());
}
function destroyStar(star, i){
	star.death();
	Game.stars.splice(i, 1);
} // End Stars functions


// Enemies ----------------------------------------------------------
var enemies = [];

for(i=0;i<3;i++){
	enemies.push(new Enemy());
}

function updateEnemies(){
	if(Math.floor(Math.random() * 10) == 1) enemies.push(new Enemy());

	for(i=0;i<enemies.length;i++){
		var enemy = enemies[i];
		enemy.y += enemy.speed;
		enemy.$el.css({left: enemy.x, top: enemy.y});
		if(enemy.y > $game.height()){
			destroyEnemy(enemy, i);
		}
		if(Game.player.checkCollisions(enemy)) destroyEnemy(enemy, i);
	}
}

function destroyEnemy(enemy, i){
	enemy.death();
	enemies.splice(i, 1);
}

function updateCounter(){
	Game.ticks++;
	if(Game.ticks % 25 === 0){
		$('#score').text( Number($('#score').text())+1 );
	}
}
//End Enemies Functions

// keybindings on docRDY-------------------------------------------------
$(document).ready(function(){
	$('#start').on('click', function(event){
		//$('#game').removeClass('hidden');
		$('#menu').hide();
		Game.start();
	});

	$('body').on('keydown', function( e ) {
	  if(e.which == 39) direction.right = true;
	 	if(e.which == 37)	direction.left = true;
	  if(e.which == 40)	direction.down = true;
	  if(e.which == 38)	direction.up = true;
  });

  $('body').on('keyup', function(e){
  	if(e.which == 39) direction.right = false;
	 	if(e.which == 37)	direction.left = false;
	  if(e.which == 40)	direction.down = false;
	  if(e.which == 38)	direction.up = false;
		if(e.which == 32)	Game.player.shoot();
  });

}); // End keybindings


// shim layer with setTimeout fallback--------------------------------
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
})();
