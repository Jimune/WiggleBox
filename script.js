var MOVE_SPEED = 10;

setInterval(function() {
	if (Math.random() > 0.95) {
		document.getElementById("box").style.animation = "wiggle 0.7s infinite";
		setTimeout(function() {document.getElementById("box").style.animation = null;}, 1000)
	}		
}, 1000);

function move(mouseX, mouseY) {
	var ele = document.getElementById("box");
	var left = ele.offsetLeft + (ele.width / 2);
	var top = ele.offsetTop + (ele.height / 2);
	
	var dist_x = mouseX - left;
	var dist_y = mouseY - top;
	var dist_x_sq = dist_x * dist_x;
	var dist_y_sq = dist_y * dist_y;
	var range = Math.sqrt(dist_x_sq + dist_y_sq);
	
	if (range <= 50) {
		range = (range + MOVE_SPEED) * (100/range);
		var range_sq = range * range;
		var sq_sum = dist_x_sq + dist_y_sq;
		
		var rangepart = range_sq / sq_sum;
		var offsetX = Math.sqrt(rangepart * (dist_x_sq / sq_sum));
		var offsetY = Math.sqrt(rangepart * (dist_y_sq / sq_sum));
		
		if (dist_x < 0) {
			if (ele.offsetLeft + ele.width + offsetX > window.innerWidth - 10) ele.style.left = window.innerWidth - 10 - ele.width;
			else ele.style.left = ele.offsetLeft + offsetX;
		} else {
			if (ele.offsetLeft - offsetX < 10) ele.style.left = 10;
			else ele.style.left = ele.offsetLeft - offsetX;
		}
		
		if (dist_y < 0) {
			if (ele.offsetTop + ele.height + offsetY > window.innerHeight - 10) ele.style.top = window.innerHeight - 10 - ele.height;
			else ele.style.top = ele.offsetTop + offsetY;
		} else {
			if (ele.offsetTop - offsetY < 10) ele.style.top = 10;
			else ele.style.top = ele.offsetTop - offsetY;
		}
	}
}

document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    move(event.pageX, event.pageY);
}