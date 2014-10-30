/*
  Running Node.js processes asynchronously using
  the Process class.

 This sketch shows how to run a node.js script as a linux shell command
 using an Arduino Yún. It starts a process running asynchronously,
 then passes bytes from the STDOUT of the process to the Arduino's
 serial port.  Any bytes from the Arduino's serial port
 are sent to the STDIN of the process.

 created 21 Jun 2014

 by Tom Igoe

 */

#include <Process.h>
Process nodejs;    // make a new Process for calling Node

Process date;                 // process used to get the date
int hours, minutes, seconds;  // for the results
int lastSecond = -1;          // need an impossible value for comparison

int hoursToDrop, minutesToDrop, secondsToDrop

void setup() {
  Bridge.begin();        // initialize Bridge
  Serial.begin(9600);    // initialize serial

  while (!Serial);              // wait for Serial Monitor to open
  Serial.println("Time Check");  // Title of sketch

  // run an initial date process. Should return:
  // hh:mm:ss :
  if (!date.running()) {
    date.begin("date");
    date.addParameter("+%T");
    date.run();
  }
}

void setup() {
  Bridge.begin();	// Initialize the Bridge
  Serial.begin(9600);	// Initialize the Serial

  // Wait until a Serial Monitor is connected.
  while (!Serial);
  
  // launch the echo.js script asynchronously:
  nodejs.runShellCommandAsynchronously("node /mnt/sda1/arduino/RESTfulSpider/server.js");

  Serial.println("Started process");
}

void loop() {
  // pass any incoming bytes from the running node process
  // to the serial port:
  while (nodejs.available()) {
    Serial.write(nodejs.read());
  }
 
  //if there's a result from the date process, parse it:
  runDate();

  getDate();
  
}


void runDate() {
  if (lastSecond != seconds) { // if a second has passed
    // print the time:
    if (hours <= 9) Serial.print("0");    // adjust for 0-9
    Serial.print(hours);
    Serial.print(":");
    if (minutes <= 9) Serial.print("0");  // adjust for 0-9
    Serial.print(minutes);
    Serial.print(":");
    if (seconds <= 9) Serial.print("0");  // adjust for 0-9
    Serial.println(seconds);

    // restart the date process:
    if (!date.running()) {
      date.begin("date");
      date.addParameter("+%T");
      date.run();
    }
  }
}

void getDate() {
  while (date.available() > 0) {
    // get the result of the date process (should be hh:mm:ss):
    String timeString = date.readString();

    // find the colons:
    int firstColon = timeString.indexOf(":");
    int secondColon = timeString.lastIndexOf(":");

    // get the substrings for hour, minute second:
    String hourString = timeString.substring(0, firstColon);
    String minString = timeString.substring(firstColon + 1, secondColon);
    String secString = timeString.substring(secondColon + 1);

    // convert to ints,saving the previous second:
    hours = hourString.toInt();
    minutes = minString.toInt();
    lastSecond = seconds;          // save to do a time comparison
    seconds = secString.toInt();
  }  
}



