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
#include <Stepper.h>

Process nodejs;    // make a new Process for calling Node

const int stepsPerRevolution = 200;
Stepper myStepper(stepsPerRevolution, 8, 9, 10, 11);

int spinCount = 15;
boolean spiderRun = false;
boolean up = false;
boolean down = false;

void setup() {
  Bridge.begin();	// Initialize the Bridge
  Serial.begin(9600);	// Initialize the Serial
  myStepper.setSpeed(120);

  // Wait until a Serial Monitor is connected.
//  while (!Serial);
  delay(5000);
  
  // launch the echo.js script asynchronously:
  nodejs.runShellCommandAsynchronously("node /mnt/sda1/arduino/RESTfulSpider/server.js");
  
  dropDown(1);
  pullUp(1);
}

void loop() {
  // pass any incoming bytes from the running node process
  // to the serial port:
  while (nodejs.available()) {
    char c = nodejs.read();
    Serial.print(c);
    if(c == '1'){
      spiderRun = true;      
    }
    if(c == '2'){
      up = true;
    }
    if(c == '3'){
      down = true;
    }
  }
   
  if( spiderRun == true ) stepperSpin();   
  if( up == true )        pullUp(1);
  if( down == true )      dropDown(1);
   
}

void stepperSpin(){
  for( int i = 0; i < spinCount; i++){
    //Serial.println("clockwise");
    myStepper.step(stepsPerRevolution);
  }
  
  delay(6000);
  
  for( int i = 0; i < spinCount; i++){
    myStepper.step(-stepsPerRevolution);
  }
  
  delay(100);
  
  spiderRun = false;
}

void pullUp(int numSteps){
  for( int i = 0; i < numSteps; i++){
    //Serial.println("clockwise");
    myStepper.step(-stepsPerRevolution);
  }
  
  up = false;
}

void dropDown(int numSteps){
  for( int i = 0; i < numSteps; i++){
    //Serial.println("clockwise");
    myStepper.step(stepsPerRevolution);
  }
  
  down = false;
}





