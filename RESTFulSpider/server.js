var servi = require('servi'),
	app = new servi(true);

var getDropTime = null;

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

app.route('/schedule', getSchedule);
app.route('/evil/plan', getSchedule);

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

			getDropTime = now;

			dropTime = Math.round(now.getTime() / 1000);

			break;
		case 'minute(s)':
			var minute = parseInt(request.params.time) + now.getMinutes();

			// console.log(minute);

			now.setMinutes(minute);

			getDropTime = now;

			dropTime = Math.round(now.getTime() / 1000);

			break;
		case 'second(s)':
			var second = parseInt(request.params.time) + now.getSeconds();

			// console.log(second);

			now.setSeconds(second);

			getDropTime = now;	

			dropTime = Math.round(now.getTime() / 1000);

			break;
		default:
			break;
	}

	console.log(dropTime);

	var responseString = "Spider will drop at " + getDropTime + "!"; 

	request.respond(responseString);
}

function dropAtTime (request) {
	var now = new Date();
	var then = new Date();
	var dropTime;

	then.setHours(parseInt(request.params.hour));
	then.setMinutes(parseInt(request.params.min));
	then.setSeconds(parseInt(request.params.second));

	if(then.getTime() < now.getTime()){
		then.setHours(then.getHours()+24);
	}

	getDropTime = then;

	dropTime = Math.round(then.getTime() / 1000);

	console.log(dropTime);

	var responseString = "Spider will drop at " + getDropTime + "!"; 

	request.respond(responseString);
}

function getSchedule (request) {
	var responseString = "Spider will drop at " + getDropTime + "!"; 

	request.respond(responseString);
}

