var sys = require('sys')
var exec = require('child_process').exec;
var serialport = require('serialport'),
	app = require('express')(),						// start Express framework
  	server = require('http').createServer(app); 	// start an HTTP server



var xBee = serialport.SerialPort;
var portName = '/dev/cu.usbserial-A901QJFP';

// lists the serial port names
serialport.list(function (err, ports) {
	ports.forEach(function(port) {
		console.log(port.comName);
	});
});

server.listen(8080);								// listen for incoming requests on the server
console.log("Listening for new clients on port 8080");
console.log("opening serial port: " + portName);	// print out the port you're listening on

var sh = "echoprint-codegen/./echoprint-codegen dontstopbelieving.mp3 10 120 > post_string && curl -F 'query=@post_string' http://developer.echonest.com/api/v4/song/identify?api_key=HRUK9I5QKPKDP2GXZ";

// open the serial port. Change the name to the name of your port, just like in Processing and Arduino:
var myReceive = new xBee(id7, { 
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n") 
});

var mySend = new xBee(id8, { 
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n") 
});

myPort.on('data', function (data) {
	// Convert the string into a JSON object:
	// var serialData = JSON.parse(data);
	// for debugging, you should see this in the terminal window:
	console.log(data);
	// send a serial event to the web client with the data:
	if (data == 'X' || data == 'x'){
		exec(sh,
			function (error, stdout, stderr) {
				// console.log('stdout: ' + stdout);

				console.log(stdout);

				var output = JSON.parse(stdout);

				if(output.response.songs[0].title){
					var songName = output.response.songs[0].title;
					if (songName == "Don\'t Stop Believin\'"){
						console.log('found Journey!!');

						myPort.write('found Journey!!\r\n');						
					}
				} else{
					console.log("Didn't find Journey!");
				}

				// console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});
	}
});

// respond to web GET requests with the index.html page:
app.get('/', function (request, response) {
	response.sendFile(__dirname + '/index.html');
});
