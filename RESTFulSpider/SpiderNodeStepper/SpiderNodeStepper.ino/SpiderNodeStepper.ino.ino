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
String unixTime;  // for the results
String lastTime = "";          // need an impossible value for comparison
boolean spiderRun = false;
int nodemessage;


void setup() {
  Bridge.begin();	// Initialize the Bridge
  Serial.begin(9600);	// Initialize the Serial

  // Wait until a Serial Monitor is connected.
  while (!Serial);
  
  // launch the echo.js script asynchronously:
  nodejs.runShellCommandAsynchronously("node /mnt/sda1/arduino/RESTfulSpider/server.js");
}

void loop() {
  // pass any incoming bytes from the running node process
  // to the serial port:
  while (nodejs.available()) {
    Serial.write(nodejs.read());
    
    nodemessage = nodejs.read();
//    if(nodejs.read() == 1){
//      Serial.println("DROP THE SPIDER, YO");
//      spiderRun = true;
//    }
//    else{
//      spiderRun = false;
//    }
  }
  if(nodemessage){
      Serial.println(nodemessage);
  }
    
}






