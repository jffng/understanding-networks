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

	// console.log(Math.round(now.getTime()/1000));

	var dropTime;

	switch(request.params.units){
		case 'hour(s)':
			var hour = parseInt(request.params.time) + now.getHours();

			// console.log(hour);

			now.setHours(hour);

			dropTime = Math.round(now.getTime() / 1000);

			break;
		case 'minute(s)':
			var minute = parseInt(request.params.time) + now.getMinutes();

			// console.log(minute);

			now.setMinutes(minute);

			dropTime = Math.round(now.getTime() / 1000);

			break;
		case 'second(s)':
			var second = parseInt(request.params.time) + now.getSeconds();

			// console.log(second);

			now.setSeconds(second);

			dropTime = Math.round(now.getTime() / 1000);

			break;
		default:
			break;
	}

	console.log(dropTime);

	request.respond("OK");
}

function dropAtTime (request) {
	var now = new Date();

	var dropTime;

	now.setHours(parseInt(request.params.hour));
	now.setMinutes(parseInt(request.params.min));
	now.setSeconds(parseInt(request.params.second));

	dropTime = Math.round(now.getTime() / 1000);

	console.log(dropTime);

	request.respond("OK");

}

function getSchedule (request) {
	// body...
}

