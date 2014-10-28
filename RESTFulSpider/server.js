
var servi = require('servi'),
	app = new servi(true);

var dropAtHour, dropAtMinute, dropAtSecond;
var dropTimeInSeconds;

var dropped = true;

app.port(8080);
app.serveFiles('public');

// let the user know you started:
console.log('Server is listening on port 8080');

app.route('/', sendIndex);
app.route('/in/:time/:units', dropInTime);
app.route('/at/:hour/:min/:second', dropAtTime);

app.start();
app.listen(8080);

function dropAtTimer() {
	var now = new Date();

	hoursUntilDrop = Math.abs(dropAtHour - now.getHours());
	minutesUntilDrop = Math.abs(dropAtMinute - now.getMinutes());
	secondsUntilDrop = Math.abs(dropAtSecond - now.getSeconds());	

	console.log(hoursUntilDrop);
	console.log(minutesUntilDrop);
	console.log(secondsUntilDrop);

	if(hoursUntilDrop === 0 && minutesUntilDrop === 0 && secondsUntilDrop < 1){
		console.log('dropping!');
		dropped = true;
	}
}

function dropInTimer() {
	if(!dropped){
		dropTimeInSeconds--;

		if(dropTimeInSeconds < 1){
			console.log('dropping!');
			dropped = true;
		}		
	}
}

function sendIndex (request) {
	request.serveFile('/index.html');
}

function dropInTime (request) {
	dropped = false;

	switch(request.params.units){
		case 'hour(s)':
			dropTimeInSeconds = request.params.time * 3600; 
			console.log('spider will drop in ' + dropTimeInSeconds + ' seconds!');
			break;
		case 'minute(s)':
			dropTimeInSeconds = request.params.time * 60;
			console.log('spider will drop in ' + dropTimeInSeconds + ' seconds!');
			break;
		case 'second(s)':
			dropTimeInSeconds = request.params.time;
			console.log('spider will drop in ' + dropTimeInSeconds + ' seconds!');
			break;
		default:
			break;
	}

	setInterval(dropInTimer, 1000);
}

function dropAtTime (request) {
	dropped = false;

	dropAtHour = request.params.hour;
	dropAtMinute = request.params.min;
	dropAtSecond = request.params.second;

	setInterval(dropAtTimer, 1000);

	request.respond('success');
}

function getSchedule (request) {
	// body...
}
