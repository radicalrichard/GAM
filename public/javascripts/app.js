var maxspeed = 20,
		loopId = null,
		direction = {
			right: false,
			left: false,
			up: false,
			down: false
		},
		dx = 0,
		dy = 0,
		accel = 0.5,
		friction = 0.1,
		ticks = 0

var enemies = []

for(i=0;i<3;i++){
	enemies.push(new Enemy())
}

function updateEnemies(){
	if(Math.floor(Math.random() * 20) == 1) enemies.push(new Enemy())
	
	for(i=0;i<enemies.length;i++){
		var enemy = enemies[i]
		enemy.y += enemy.speed
		enemy.$el.css({left: enemy.x, top: enemy.y})
		if(enemy.y > $(window).height()){
			destroyEnemy(enemy, i)
		}
		if(checkCollisions(enemy)) destroyEnemy(enemy, i)
	}
}

function checkCollisions(enemy){
	var x = $('#box').offset().left
	var y = $('#box').offset().top
	var width = $('#box').width()
	var height = $('#box').height()

	if (x < enemy.x + enemy.width  && x + width  > enemy.x &&
    y < enemy.y + enemy.height && y + height > enemy.y) {
		cancelAnimationFrame(loopId);
		$('#menu')
			.append('last score was ' + $('#score').text())
			.fadeIn()
		$('#score').text(0)
		return true
	} else{
		return false
	}
}

function destroyEnemy(enemy, i){
	enemy.death()
	enemies.splice(i, 1)
}

function updatePlayer(){
	// Accelerate
	for(key in direction){
		if(direction[key]){
			if(key === 'right') dx += accel
			if(key === 'left') dx -= accel
			if(key === 'up') dy -= accel
			if(key === 'down') dy += accel
			moving = true
		}
	}

	if(dx > 0) dx -= friction
	if(dx < 0) dx += friction
	if(dy > 0) dy -= friction
	if(dy < 0) dy += friction

	if(dx > maxspeed) dx = maxspeed
	if(dx < -maxspeed) dx = -maxspeed
	if(dy > maxspeed) dy = maxspeed
	if(dy < -maxspeed) dy = -maxspeed

	if(dx !== 0){
		$('#box').css({left: '+=' + dx})
	}

	if(dy !== 0){
		$('#box').css({top: '+=' + dy})
	}
}

function updateCounter(){
	ticks++
	if(ticks % 25 == 0){
		$('#score').text( Number($('#score').text())+1 )
	}
}


$(document).ready(function(){

	$('#start').on('click', function(event){
		$('#game').removeClass('hidden')
		$('#menu').hide()
		gameloop()
	})

	$('body').on('keydown', function( e ) {
	  if(e.which == 39) direction.right = true
	 	if(e.which == 37)	direction.left = true
	  if(e.which == 40)	direction.down = true
	  if(e.which == 38)	direction.up = true
  })

  $('body').on('keyup', function(e){
  	if(e.which == 39) direction.right = false
	 	if(e.which == 37)	direction.left = false
	  if(e.which == 40)	direction.down = false
	  if(e.which == 38)	direction.up = false
  })

})

function render(){
	updateEnemies()	
	updatePlayer()
	updateCounter()
}

// Main Loop
function gameloop(){
	loopId = requestAnimFrame(gameloop)
	render()
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60)
        };
})();
