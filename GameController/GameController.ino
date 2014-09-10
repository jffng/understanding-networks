const int buttonPin = 2;

void setup(){
  pinMode(buttonPin, INPUT);
  pinMode(3, OUTPUT);
}

void loop(){
  if(digitalRead(2) == HIGH){
    digitalWrite(3, HIGH);
  } else {
    digitalWrite(3, LOW);
  }
}
