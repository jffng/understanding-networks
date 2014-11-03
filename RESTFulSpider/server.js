var servi = require('servi'),
	app = new servi(true);

var getDropTime;

var schedule = [];

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

app.route('/schedule', getSchedule);
app.route('/evil/plan', getSchedule);

app.route('/up', pullUp);
app.route('/down', dropDown);

// app.route('*', redirect);

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

			// getDropTime = now;

			// dropTime = Math.round(now.getTime() / 1000);

			break;
		case 'minute(s)':
			var minute = parseInt(request.params.time) + now.getMinutes();

			// console.log(minute);

			now.setMinutes(minute);

			// getDropTime = now;

			// dropTime = Math.round(now.getTime() / 1000);

			break;
		case 'second(s)':
			var second = parseInt(request.params.time) + now.getSeconds();

			// console.log(second);

			now.setSeconds(second);

			// dropTime = Math.round(now.getTime() / 1000);

			break;
		default:
			break;
	}

	getDropTime = now;

	dropTime = Math.round(now.getTime() / 1000 );

	if(schedule.length == 0) schedule.push(dropTime);
	else {
		for(var i = 0; i < schedule.length; i++){
			if(schedule[i] != dropTime) schedule.push(dropTime);
			// else console.log("ALREADY HERE");		
		}
	}

	// console.log(dropTime);

	var responseString = "Spider will drop on " + now.toDateString() +  
										", at " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

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

	if(schedule.length == 0) schedule.push(dropTime);
	else {
		for(var i = 0; i < schedule.length; i++){
			if(schedule[i] != dropTime) schedule.push(dropTime);
			// else console.log("ALREADY HERE");		
		}
	}

	// console.log(dropTime);

	var responseString = "Spider will drop on " + getDropTime.toDateString() + 
										", at " + getDropTime.getHours() + ":" + getDropTime.getMinutes() + ":" + getDropTime.getSeconds(); 

	request.respond(responseString);
}

function pullUp(request){
	console.log(2);

	request.respond('going up!');
}

function dropDown(request){
	console.log(3);

	request.respond('going down!');
}

function getSchedule (request) {
	if(getDropTime != null){
		var responseString = "Spider will drop on " + getDropTime.toDateString() + 
											", at " + getDropTime.getHours() + ":" + getDropTime.getMinutes() + ":" + getDropTime.getSeconds();
	} else {
		var responseString = "No drop time has been set! Visit http://128.122.6.33:8080 to set a time."
	}

	request.respond(responseString);
}

function redirect(request){
	request.redirect('/');
}

//////////////
///
///
///

function checkDrop(){
	var now = new Date();

	now = Math.round(now.getTime() / 1000);

	for(var i = 0; i < schedule.length; i++){
		if(schedule[i] - now < 1) {
			schedule.splice(i, 1);
			console.log(1);
		}
	}
}

setInterval(checkDrop, 1000);