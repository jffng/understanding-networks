void setup(){
  Serial.begin(9600);

  pinMode(2, INPUT);
  pinMode(4, INPUT);
  pinMode(6, INPUT);
  pinMode(8, INPUT);
  
  pinMode(11, OUTPUT);
  pinMode(13, OUTPUT);
  
  establishContact();
}

void loop(){
  if(Serial.available() > 0) {
      
    digitalWrite(11, HIGH);
    
    // TWO
      if(digitalRead(2) == HIGH){
        digitalWrite(13, HIGH);
        Serial.print(2);
      } else {
        digitalWrite(13, LOW);
      }
    
    // FOUR 
      if(digitalRead(4) == HIGH){
        digitalWrite(13, HIGH);
        Serial.print(4);        
      }else{
        digitalWrite(13, LOW);
      }
      
    // SIX  
      if(digitalRead(6) == HIGH){
        digitalWrite(13, HIGH);
        Serial.print(6);        
      }else{
        digitalWrite(13, LOW);
      }  
    
    // EIGHT  
      if(digitalRead(8) == HIGH){
        digitalWrite(13, HIGH);
        Serial.print(8);        
      }else{
        digitalWrite(13, LOW);
      }  
    } else{
      digitalWrite(13, HIGH);
    }
}

void establishContact() {
 while (Serial.available() <= 0) {
      digitalWrite(13, HIGH);
      Serial.print('A');   // send a capital A
      delay(300);
  }
}
