var servi = require('servi'),
	app = new servi(true);

var dropAtHour, dropAtMinute, dropAtSecond;
var dropTimeInSeconds;

var dropped = true;

////////////////////////////////////////////////////////////////////////////////////
///																				////
///							INIT SERVI, SETUP ROUTES							////
///																				////
////////////////////////////////////////////////////////////////////////////////////

app.port(8080);
app.serveFiles('public');

app.route('/', sendIndex);

app.route('/in/:time/:units', dropInTime);

app.route('/at/:hour/:min/:second', dropAtTime);
// app.route('/at*')

// app.route('/schedule', getSchedule);
// app.route('/evil/plan', getSchedule);

app.start();
app.listen(8080);

////////////////////////////////////////////////////////////////////////////////////
////																			////
////							ROUTE HANDLERS									////
////																			////
////////////////////////////////////////////////////////////////////////////////////

function sendIndex (request) {
	request.serveFile('/index.html');
}

function dropInTime (request) {
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

	droppingIn = true;
	droppingAt = false;

	setInterval(dropInTimer, 1000);
}

function dropAtTime (request) {
	dropAtHour = request.params.hour;
	dropAtMinute = request.params.min;
	dropAtSecond = request.params.second;

	droppingAt = true;
	droppingIn = false;

	setInterval(dropAtTimer, 1000);

	request.respond('success');
}

function getSchedule (request) {
	// body...
}

////////////////////////////////////////////////////////////////////////////////////
///																				////
///								TIMER FUNCTIONS									////
///																				////
////////////////////////////////////////////////////////////////////////////////////

function dropTimer (argument) {
	if(droppingIn){

	} else if (droppingAt){

	}
}

function dropAtTimer() {
	if(droppingAt){
		var now = new Date();

		hoursUntilDrop = Math.abs(dropAtHour - now.getHours());
		minutesUntilDrop = Math.abs(dropAtMinute - now.getMinutes());
		secondsUntilDrop = Math.abs(dropAtSecond - now.getSeconds());	

		// console.log(hoursUntilDrop);
		// console.log(minutesUntilDrop);
		// console.log(secondsUntilDrop);

		if(hoursUntilDrop === 0 && minutesUntilDrop === 0 && secondsUntilDrop < 1){
			console.log('dropping!');
			droppingAt = false;
		}
	}
}

function dropInTimer() {
	if(droppingIn){
		dropTimeInSeconds--;

		if(dropTimeInSeconds < 1){
			console.log('dropping!');
			droppingIn = false;
		}		
	}
}
