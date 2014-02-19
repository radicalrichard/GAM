var speed = 20,
		direction = null

function render(){
	console.log(direction)

	if(direction){
		var updatespeed = (direction == 'left' || direction == 'top') ? -speed : speed

		if(direction == 'left' || direction == 'right') {
			$('#box').css({left: '+=' + updatespeed})
		} else {
			$('#box').css({top: '+=' + updatespeed})
		}
	}
}




$(function(){

	function update(dir){
		direction = dir
	}
	
	$('body').on('keydown', function( e ) {
	  if(e.which == 39) update('right')
	 	if(e.which == 37)	update('left')
	  if(e.which == 40)	update('down')
	  if(e.which == 38)	update('top')
  })

  $('body').on('keyup', function(e){
  	direction = null
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