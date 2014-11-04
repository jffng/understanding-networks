var servi = require('servi'),
	app = new servi(true);

var getDropTime;
var lastDrop = 0;

var schedule = [];

////////////////////////////////////////////////////////////////////////////////////
///																				////
///							INIT SERVI, SETUP ROUTES							////
///																				////
////////////////////////////////////////////////////////////////////////////////////

app.port(8080);
app.serveFiles('public');

app.route('/', sendIndex);

app.route('/in/:hours/:minutes/:seconds', dropInTime);
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

	var dropTime;

	var hours = now.getHours() + parseInt(request.params.hours);
	var minutes = now.getMinutes() + parseInt(request.params.minutes);
	var seconds = now.getSeconds() + parseInt(request.params.seconds);

	now.setHours(hours);
	now.setMinutes(minutes);
	now.setSeconds(seconds);

	getDropTime = now;

	dropTime = Math.round(now.getTime() / 1000 );

	var responseString;

	if( schedule.length == 0 ){
		schedule.push(dropTime);
		responseString = "Spider will drop on " + getDropTime.toDateString() + 
											", at " + getDropTime.getHours() + ":" + getDropTime.getMinutes() + ":" + getDropTime.getSeconds(); 
	} else {
		var scheduled = false;

		for(var i = 0; i < schedule.length; i++){
			var mVal = Math.abs(schedule[i] - dropTime);

			if(mVal < 20 ){
				responseString = "Spider is busy! ";
				scheduled = true;
				// console.log(Math.abs(schedule[i] - dropTime));
			}
		}

		if( scheduled == false ) {
			schedule.push(dropTime);				
			responseString = "Spider will drop on " + getDropTime.toDateString() + 
											", at " + getDropTime.getHours() + ":" + getDropTime.getMinutes() + ":" + getDropTime.getSeconds(); 
		}
	}

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

	var responseString;

	if( schedule.length == 0 ){
		schedule.push(dropTime);
		responseString = "Spider will drop on " + getDropTime.toDateString() + 
											", at " + getDropTime.getHours() + ":" + getDropTime.getMinutes() + ":" + getDropTime.getSeconds(); 
	} else {
		var scheduled = false;

		for(var i = 0; i < schedule.length; i++){
			var mVal = Math.abs(schedule[i] - dropTime);

			if(mVal < 20 ){
				responseString = "Spider is busy!";
				scheduled = true;
				// console.log(Math.abs(schedule[i] - dropTime));
			}
		}

		if( scheduled == false ) {
			schedule.push(dropTime);				
			responseString = "Spider will drop on " + getDropTime.toDateString() + 
											", at " + getDropTime.getHours() + ":" + getDropTime.getMinutes() + ":" + getDropTime.getSeconds(); 
		}
	}					
		
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
	var responseString = "Spider will drop at the following times: <br>";

	if(schedule.length > 0){
		var now = new Date();
		for(var i = 0; i < schedule.length; i++){
			if(schedule[i] > Math.round(now.getTime() / 1000)){
				var date = new Date(schedule[i]*1000);
				// console.log(date);
				// hours part from the timestamp
				var hours = date.getHours();
				// minutes part from the timestamp
				var minutes = "0" + date.getMinutes();
				// seconds part from the timestamp
				var seconds = "0" + date.getSeconds();

				// will display time in 10:30:23 format
				var formattedTime = hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);

				responseString += formattedTime + '<br>';	
			}
		}
	} else{
		responseString = "No drop time has been set! Visit http://bit.do/restfulspider to set a time.";
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
		if(schedule[i] - now == 0) {
			//schedule.splice(i, 1);
			console.log(1);
		}
	}
}

setInterval(checkDrop, 750);