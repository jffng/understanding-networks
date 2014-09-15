
/*
  Ball Drop Client
 Language:  Processing
 
 Starts a network client that connects to a server on port 8080,
 sends any keystrokes pressed. 
 
 For use with the Ball Drop Server game.
 
 Created sometime in 2007
 modified 10 Sept 2012
 by Tom Igoe
 
 */


import processing.net.*;
import processing.serial.*;


Client myClient;                   // instance of the net Client
String data;                       // string to hold incoming data
String ipAddress = "128.122.151.180";    // address of the server goes here
String portName = "/dev/tty.usbmodemfa131";
Serial myPort;
boolean firstContact = false;        // Whether we've heard from the microcontroller

int val;

void setup() {
  // establish the background and foreground:
  size(400, 300);      
  background(50);
  fill(200);
  // Connect to server on port 8080
  myClient = new Client(this, ipAddress, 8080);
  background(#000045);
    fill(#eeeeff);
    
  myPort = new Serial(this, portName, 9600);
}

void draw() {
  // If there's incoming data from the client:
  if (myClient.available() > 0) { 
    // get the data:
    data = " '2' = Up, '8' = Down, '4' = Left, '6' = Right ";
    background(#000045);
    fill(#eeeeff);
    text(data, 10, 10);
  }
}

void serialEvent(Serial myPort) {
  // read a byte from the serial port:
  int inByte = myPort.read();
  // if this is the first byte received, and it's an A,
  // clear the serial buffer and note that you've
  // had first contact from the microcontroller. 
  // Otherwise, add the incoming byte to the array:
  if (firstContact == false) {
    if (inByte == 'A') { 
      myPort.clear();          // clear the serial port buffer
      firstContact = true;     // you've had first contact from the microcontroller
      myPort.write('A');       // ask for more
    } 
  } 
  else {
    // Add the latest byte from the serial port to array:
    switch(inByte){
      case 50: 
        myClient.write('u');
        break;
      case 52: 
        myClient.write('l');
        break;
      case 54: 
        myClient.write('r');
        break;
      case 56: 
        myClient.write('d');
        break;        
    }
    
    println(inByte);
    // Send a capital A to request new sensor readings:
    myPort.write('A');
  }
}

//void keyReleased() {
//  // send out anything that's typed:
//  myClient.write(key);
//}
