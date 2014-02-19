var speed = 20,
		direction = {
			right: false,
			left: false,
			up: false,
			down: false
		},
		velocity = 0



function render(){
	console.log(velocity)
	var moving = false
	for(key in direction){
		if(direction[key]){
			moving = true
			move(key)
		}
	}
	if(velocity > 0 && !moving) velocity -= 0.5
}

function move(dir){
	if(velocity < speed) velocity += 0.5
	var updatespeed = (dir == 'left' || dir == 'up') ? -velocity : velocity

	if(dir == 'left' || dir == 'right') {
		$('#box').css({left: '+=' + updatespeed})
	} else {
		$('#box').css({top: '+=' + updatespeed})
	}

}



$(function(){

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

function gameloop(){
	requestAnimFrame(gameloop);
	render();
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
})();

gameloop();