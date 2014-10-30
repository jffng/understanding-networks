var servi = require('servi'),
	app = new servi(true);

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
	var now = new Date();

	var dropTime;

	switch(request.params.units){
		case 'hour(s)':
			var hour = request.params.time + now.getHours();

			now = now.setHours(hour);

			dropTime = Math.round(now.getTime() / 1000);

			break;
		case 'minute(s)':
			var minute = request.params.time + now.getMinutes();

			now = now.setMinutes(minute);

			dropTime = Math.round(now.getTime() / 1000);

			break;
		case 'second(s)':
			var second = request.params.time + now.getSeconds();

			now = now.setSeconds(second);

			dropTime = Math.round(now.getTime() / 1000);

			break;
		default:
			break;
	}

	console.log(dropTime);
}

function dropAtTime (request) {
	var now = new Date();

	var dropTime;

	now.setHours(request.params.hour);
	now.setMinutes(request.params.min);
	now.setSeconds(request.params.second);

	dropTime = Math.round(now.getTime() / 1000);

	console.log(dropTime);
}

function getSchedule (request) {
	// body...
}

////////////////////////////////////////////////////////////////////////////////////
///																				////
///								TIMER FUNCTIONS									////
///																				////
////////////////////////////////////////////////////////////////////////////////////

// function dropTimer (argument) {
// 	if(droppingIn){

// 	} else if (droppingAt){

// 	}
// }

// function dropAtTimer() {
// 	if(droppingAt){
// 		var now = new Date();



// 		hoursUntilDrop = Math.abs(dropAtHour - now.getHours());
// 		minutesUntilDrop = Math.abs(dropAtMinute - now.getMinutes());
// 		secondsUntilDrop = Math.abs(dropAtSecond - now.getSeconds());	

// 		// console.log(hoursUntilDrop);
// 		// console.log(minutesUntilDrop);
// 		// console.log(secondsUntilDrop);

// 		if(hoursUntilDrop === 0 && minutesUntilDrop === 0 && secondsUntilDrop < 1){
// 			console.log('dropping!');
// 			droppingAt = false;
// 		}
// 	}
// }

// function dropInTimer() {
// 	if(droppingIn){
// 		dropTimeInSeconds--;

// 		if(dropTimeInSeconds < 1){
// 			console.log('dropping!');
// 			droppingIn = false;
// 		}		
// 	}
// }
