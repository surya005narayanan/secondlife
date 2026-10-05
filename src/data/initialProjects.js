export const initialProjects = [
  {
    id: "smart-parking",
    name: "Smart Parking Assistant",
    category: "IoT",
    difficulty: "Medium",
    estimatedTime: "3 hours",
    wasteWeight: 420,
    shortDescription: "An ultrasonic distance warning station that displays real-time parking slot clearance on an LCD and sounds proximity alert tones.",
    description: "Millions of cars suffer bumper scuffs in tight garages. This smart assistant uses an ultrasonic distance sensor to calculate bumper range in real-time, outputting dynamic visual status on a 16x2 LCD display and warning frequencies through a buzzer indicator. All powered by repurposed electronics and a salvage acrylic or plastic enclosure.",
    image: "/images/smart-parking.webp",
    schematicSummary: "Arduino Pin 9 to HC-SR04 Trig, Pin 10 to Echo. LCD I2C connected to SDA/SCL (A4/A5). Digital Pin 6 to Buzzer. Pin 7 to Green LED, Pin 8 to Red LED.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "Ultrasonic Sensor", quantity: 1, required: true },
      { name: "LCD Display", quantity: 1, required: true },
      { name: "LED", quantity: 2, required: false },
      { name: "Jumper Wires", quantity: 1, required: false },
      { name: "Buzzer", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Prepare Enclosure & Mount Sensor", instruction: "Recycle a plastic packaging box or small cardboard chassis. Cut two 16mm circular holes for the ultrasonic transducer eyes." },
      { step: 2, title: "Wire the Ultrasonic Sensor", instruction: "Connect VCC to 5V, GND to GND, Trig to Arduino digital pin 9, and Echo to digital pin 10 using male-to-female jumper wires." },
      { step: 3, title: "Interface the I2C LCD Display", instruction: "Connect LCD VCC to 5V, GND to GND, SDA to A4 (or dedicated SDA pin), and SCL to A5 on your Arduino Uno." },
      { step: 4, title: "Add Status LED & Audio Alert", instruction: "Place a 220Ω resistor in series with the LED to pin 7. Connect the active buzzer signal pin to digital pin 6." },
      { step: 5, title: "Flash the Firmware", instruction: "Upload the distance mapping sketch. Calibrate the target parking distance thresholds (Green: >100cm, Yellow: 30-100cm, Red/Beep: <30cm)." },
      { step: 6, title: "Mount & Benchmark", instruction: "Secure the assistant on your garage wall at bumper height. Power via a recycled 9V battery or repurposed phone charger USB." }
    ],
    codeSnippet: `// Smart Parking Assistant Firmware
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);
const int trigPin = 9;
const int echoPin = 10;
const int buzzerPin = 6;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  lcd.init();
  lcd.backlight();
  lcd.print("Park Assist v1.0");
}

void loop() {
  long duration, cm;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  cm = duration / 29 / 2;
  
  lcd.setCursor(0, 1);
  lcd.print("Distance: ");
  lcd.print(cm);
  lcd.print(" cm  ");
  
  if (cm < 25) {
    tone(buzzerPin, 1800, 100);
  } else {
    noTone(buzzerPin);
  }
  delay(150);
}`
  },
  {
    id: "plant-watering",
    name: "Automatic Plant Watering System",
    category: "Smart Home",
    difficulty: "Easy",
    estimatedTime: "2 hours",
    wasteWeight: 310,
    shortDescription: "Monitors moisture in potted houseplants and automatically switches on a miniature submersible pump when soil becomes dry.",
    description: "Keep your houseplants thriving while salvaging old electronics. Uses a soil moisture probe to monitor soil volumetric water content. When moisture drops below custom thresholds, an opto-isolated relay trips a repurposed 5V DC motor pump for 5 seconds.",
    schematicSummary: "Soil probe analog out to A0. Relay IN to Pin 3. Relay COM to DC +5V, NO to pump motor VCC. Arduino powered by 9V.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "Soil Moisture Sensor", quantity: 1, required: true },
      { name: "Relay Module", quantity: 1, required: true },
      { name: "Jumper Wires", quantity: 1, required: true },
      { name: "LED", quantity: 1, required: false },
      { name: "Battery", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Prepare Plant Probe", instruction: "Insert the conductive forks of the soil moisture sensor into potted soil away from the plant stem." },
      { step: 2, title: "Connect Relay Switch", instruction: "Connect relay VCC to 5V, GND to GND, and Signal IN to Arduino pin 3." },
      { step: 3, title: "Connect Submersible Pump", instruction: "Route the pump power through the Relay normally-open (NO) terminal." },
      { step: 4, title: "Calibrate Thresholds", instruction: "Record analog dry soil readings versus watered soil readings in the serial console." },
      { step: 5, title: "Automate Schedule", instruction: "Test cycle intervals to prevent root over-soaking with an emergency cutoff timer." }
    ],
    codeSnippet: `const int sensorPin = A0;
const int relayPin = 3;
const int dryThreshold = 650;

void setup() {
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH); // relay active low
  Serial.begin(9600);
}

void loop() {
  int moisture = analogRead(sensorPin);
  if (moisture > dryThreshold) {
    digitalWrite(relayPin, LOW); // pump on
    delay(4000);
    digitalWrite(relayPin, HIGH); // pump off
    delay(30000); // allow water penetration
  }
  delay(1000);
}`
  },
  {
    id: "smart-dustbin",
    name: "Smart Touchless Dustbin",
    category: "Robotics",
    difficulty: "Easy",
    estimatedTime: "1.5 hours",
    wasteWeight: 380,
    shortDescription: "A hands-free hygienic dustbin lid that lifts automatically using an ultrasonic sensor and micro servo motor.",
    description: "Eliminate cross-contamination by converting any standard desktop or bathroom trash can into an automated touchless receptacle. When a hand is detected within 20cm, an SG90 servo swings open the lid, waits for 4 seconds, and gently lowers it back.",
    schematicSummary: "HC-SR04 Trig to Pin 5, Echo to Pin 6. Servo signal to Pin 9. 5V supply with reservoir capacitor.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "Ultrasonic Sensor", quantity: 1, required: true },
      { name: "Servo Motor", quantity: 1, required: true },
      { name: "Jumper Wires", quantity: 1, required: false },
      { name: "Battery", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Chassis Mount", instruction: "Fix the servo horn with epoxy or small screw to the lid hinge pivot." },
      { step: 2, title: "Position Ultrasonic Eyes", instruction: "Angle the sensor upward at 45 degrees so it detects approaching hands, not moving floor feet." },
      { step: 3, title: "Wire Up Servo", instruction: "PWM pin 9 to Servo orange wire, 5V to red, GND to brown." },
      { step: 4, title: "Set Servo Stroke", instruction: "Adjust servo angles (0° closed, 95° open) so the lid clears smoothly." }
    ],
    codeSnippet: `#include <Servo.h>
Servo binLid;
const int trigPin = 5;
const int echoPin = 6;

void setup() {
  binLid.attach(9);
  binLid.write(0);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long dist = pulseIn(echoPin, HIGH) / 58;
  
  if (dist > 0 && dist < 22) {
    binLid.write(95);
    delay(4000);
    binLid.write(0);
    delay(1000);
  }
  delay(100);
}`
  },
  {
    id: "mini-weather-station",
    name: "Mini Weather Station & Telemetry",
    category: "Environmental",
    difficulty: "Medium",
    estimatedTime: "2.5 hours",
    wasteWeight: 290,
    shortDescription: "Tracks ambient temperature, relative humidity, and heat index, streaming real-time statistics to an LCD and local Wi-Fi dashboard.",
    description: "Repurpose an ESP32 or Arduino paired with a DHT11 sensor to monitor local room climate or greenhouse conditions. Features dew point calculation, discomfort index tracking, and serial telemetry outputs.",
    schematicSummary: "DHT11 Out to Pin 2 with 10k pull-up. LCD I2C to SDA/SCL. Power via USB 5V.",
    components: [
      { name: "ESP32", quantity: 1, required: true },
      { name: "DHT11 Temperature Sensor", quantity: 1, required: true },
      { name: "LCD Display", quantity: 1, required: true },
      { name: "Jumper Wires", quantity: 1, required: true },
      { name: "LED", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Assemble DHT11", instruction: "Connect sensor VCC to 3.3V/5V, data pin to GPIO 4 (ESP32) or D2 (Arduino)." },
      { step: 2, title: "Wire LCD", instruction: "Connect SDA to GPIO 21 and SCL to GPIO 22 on ESP32." },
      { step: 3, title: "Configure Web Server", instruction: "Embed local Wi-Fi credentials to host a live mini telemetry webpage." },
      { step: 4, title: "Deploy Case", instruction: "Enclose inside a ventilated plastic box shielded from direct sunlight." }
    ],
    codeSnippet: `#include "DHT.h"
#include <LiquidCrystal_I2C.h>
#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  dht.begin();
  lcd.init();
  lcd.backlight();
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  lcd.setCursor(0, 0);
  lcd.print("Temp: "); lcd.print(t); lcd.print("C");
  lcd.setCursor(0, 1);
  lcd.print("Humid: "); lcd.print(h); lcd.print("%");
  delay(2000);
}`
  },
  {
    id: "motion-security-alarm",
    name: "Motion Security Tripwire Alarm",
    category: "Safety",
    difficulty: "Easy",
    estimatedTime: "2 hours",
    wasteWeight: 340,
    shortDescription: "A security system that detects intrusions across doorways and triggers strobe lights and siren pulses.",
    description: "Secure your room, workshop, or tool cabinet. Combines an ultrasonic radar sensor with strobe indicator LEDs and alert sirens. When an unexpected movement breaches the baseline distance, the system immediately latches an alert.",
    schematicSummary: "HC-SR04 Trig Pin 8, Echo Pin 9. Alarm Buzzer Pin 11. Strobe LED Pin 12.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "Ultrasonic Sensor", quantity: 1, required: true },
      { name: "LED", quantity: 2, required: true },
      { name: "Buzzer", quantity: 1, required: true },
      { name: "Battery", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Calibrate Doorway Clearance", instruction: "Position sensor aiming straight across doorway frame. Take 20 baseline distance readings." },
      { step: 2, title: "Connect Buzzer and Warning LEDs", instruction: "Wire alternating Red and Blue LEDs with resistors to pins 11 and 12." },
      { step: 3, title: "Armed State Latch", instruction: "Code an arming delay of 10 seconds before the security tripwire activates." }
    ],
    codeSnippet: `const int trig = 8, echo = 9, buzzer = 11, led = 12;
void setup() {
  pinMode(trig, OUTPUT); pinMode(echo, INPUT);
  pinMode(buzzer, OUTPUT); pinMode(led, OUTPUT);
}
void loop() {
  // Tripwire detection logic
}`
  },
  {
    id: "smart-room-light",
    name: "Smart Room Light Controller",
    category: "Smart Home",
    difficulty: "Medium",
    estimatedTime: "3 hours",
    wasteWeight: 450,
    shortDescription: "Automates overhead or desk lighting based on human presence and ambient daylight levels to save electricity.",
    description: "An intelligent energy-saving luminary controller. Uses an ultrasonic occupancy detector and relay module to switch desk or room lamps on only when someone is sitting at the workbench.",
    schematicSummary: "Relay control pin 4. Ultrasonic trig/echo to 7/8. Status LED on pin 13.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "Ultrasonic Sensor", quantity: 1, required: true },
      { name: "Relay Module", quantity: 1, required: true },
      { name: "Jumper Wires", quantity: 1, required: true },
      { name: "LED", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Isolate High Voltage Lines", instruction: "Always house relay and mains cord inside a safe, sealed junction box." },
      { step: 2, title: "Calibrate Presence Zone", instruction: "Map desk chair range (40cm - 120cm) to keep lights active during work." },
      { step: 3, title: "Implement Timeout", instruction: "Keep relay engaged for 5 minutes after last motion to avoid annoying flicker." }
    ],
    codeSnippet: `// Presence light switcher code`
  },
  {
    id: "digital-temperature-monitor",
    name: "Digital Temperature Monitor",
    category: "Education",
    difficulty: "Easy",
    estimatedTime: "1 hour",
    wasteWeight: 210,
    shortDescription: "A compact temperature readout with threshold colored alerts for PC cases, server racks, or 3D printer chambers.",
    description: "Monitor electronic enclosure temperatures with precision. An Arduino reads the DHT11 thermal curve and shows real-time Celsius/Fahrenheit on the LCD display, alerting when heatsinks require fan intervention.",
    schematicSummary: "DHT11 Pin 2. LCD on I2C. Bicolor LED on Pin 8 and 9.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "DHT11 Temperature Sensor", quantity: 1, required: true },
      { name: "LCD Display", quantity: 1, required: true },
      { name: "LED", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Breadboard Assembly", instruction: "Plug DHT11 into breadboard and bridge ground/power rails." },
      { step: 2, title: "Mount LCD", instruction: "Attach I2C LCD with 4 jumper wires to SDA/SCL." },
      { step: 3, title: "Test & Calibrate", instruction: "Verify temperature accuracy using a household thermometer." }
    ],
    codeSnippet: `// Digital Temperature Monitor code`
  },
  {
    id: "obstacle-avoiding-robot",
    name: "Obstacle Avoiding Robot Rover",
    category: "Robotics",
    difficulty: "Hard",
    estimatedTime: "4.5 hours",
    wasteWeight: 680,
    shortDescription: "A two-wheeled autonomous roving rover that scans its path with an ultrasonic sensor on a servo turret and dodges collisions.",
    description: "Turn old toy RC car wheels, cardboard or CD chassis, and salvage motors into an autonomous exploratory robot rover. Uses an ultrasonic sensor mounted to a micro servo to scan left and right before picking clear heading paths.",
    schematicSummary: "L298N IN1-IN4 to Arduino 4,5,6,7. Servo on pin 10. Sonar on 11,12. 2x DC motors to OUT1-OUT4.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "Ultrasonic Sensor", quantity: 1, required: true },
      { name: "Servo Motor", quantity: 1, required: true },
      { name: "Motor Driver", quantity: 1, required: true },
      { name: "Battery", quantity: 2, required: true },
      { name: "Jumper Wires", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Build Chassis", instruction: "Recycle two discarded CDs or cardboard plates as chassis base." },
      { step: 2, title: "Mount DC Motors & L298N", instruction: "Fasten geared DC motors and wire to output terminals." },
      { step: 3, title: "Assemble Radar Turret", instruction: "Affix ultrasonic sensor onto servo horn for 180° scanning." },
      { step: 4, title: "Implement Navigation Logic", instruction: "Stop at 20cm, rotate servo left/right, calculate clearest vector and pivot." }
    ],
    codeSnippet: `// Autonomous Obstacle Avoidance Rover`
  },
  {
    id: "electronic-doorbell",
    name: "Smart Chime & Intercom Doorbell",
    category: "Smart Home",
    difficulty: "Easy",
    estimatedTime: "1.5 hours",
    wasteWeight: 260,
    shortDescription: "Proximity-based smart chime that greets visitors with a friendly LCD greeting and multi-tone doorbell melody.",
    description: "Never miss a visitor. Employs sonar proximity sensing to discover guests standing outside the doorway, lighting up a welcoming LCD greeting message and playing pleasant acoustic chimes.",
    schematicSummary: "Ultrasonic sensor on D8/D9. Buzzer on D10. LCD on I2C bus.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "Ultrasonic Sensor", quantity: 1, required: true },
      { name: "LCD Display", quantity: 1, required: true },
      { name: "Buzzer", quantity: 1, required: true },
      { name: "LED", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Position Outside Sensor", instruction: "Mount sensor adjacent to the front entrance doorframe." },
      { step: 2, title: "Synthesize Melody", instruction: "Program classic Westminister Chime frequencies on the buzzer." },
      { step: 3, title: "Display Greeting", instruction: "Write 'Welcome, please wait!' on the LCD display." }
    ],
    codeSnippet: `// Electronic Doorbell Chime`
  },
  {
    id: "water-level-indicator",
    name: "Overhead Tank Water Level Indicator",
    category: "Environmental",
    difficulty: "Medium",
    estimatedTime: "2 hours",
    wasteWeight: 350,
    shortDescription: "Monitors overhead water storage cistern volume with non-contact sonar and provides overflow safety shutoff.",
    description: "Prevents roof tank overflow and dry pump runs. An ultrasonic transducer mounted at the reservoir roof measures the air gap to the water surface, showing tank fullness percentage on LCD and triggering alarm relays when full.",
    schematicSummary: "HC-SR04 mounted above water. Relay linked to borehole/pump control switch.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "Ultrasonic Sensor", quantity: 1, required: true },
      { name: "LCD Display", quantity: 1, required: true },
      { name: "Relay Module", quantity: 1, required: true },
      { name: "LED", quantity: 2, required: false }
    ],
    steps: [
      { step: 1, title: "Mount Waterproofed Transducer", instruction: "Secure the sonar module to the tank manhole lid pointing down." },
      { step: 2, title: "Compute Tank Geometry", instruction: "Input tank total height in centimeters to calculate percentage remaining." },
      { step: 3, title: "Setup Relay Auto-Cutoff", instruction: "Trigger relay shutoff when water reaches 95% volume capacity." }
    ],
    codeSnippet: `// Overhead Tank Monitor`
  },
  {
    id: "mini-air-quality-monitor",
    name: "Indoor Air Quality & Discomfort Tracker",
    category: "Environmental",
    difficulty: "Medium",
    estimatedTime: "2 hours",
    wasteWeight: 280,
    shortDescription: "Evaluates thermal comfort indices and airborne humidity risks, flashing LED warning signals when air gets stuffy.",
    description: "Poor ventilation drops cognitive performance. This compact indoor monitor aggregates temperature and humidity parameters to estimate mold risk and heat strain, prompting when to crack open a window.",
    schematicSummary: "ESP32 or Arduino Uno connected to DHT11 and RGB status indicator LEDs.",
    components: [
      { name: "ESP32", quantity: 1, required: true },
      { name: "DHT11 Temperature Sensor", quantity: 1, required: true },
      { name: "LED", quantity: 3, required: true },
      { name: "Jumper Wires", quantity: 1, required: false },
      { name: "Battery", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Calibrate Air Sampling", instruction: "Sample readings every 5 seconds to reduce thermal self-heating." },
      { step: 2, title: "Set Comfort Boundaries", instruction: "Green LED: 20-25°C & 40-60% RH. Red LED: Extremes." }
    ],
    codeSnippet: `// Mini Air Quality Monitor`
  },
  {
    id: "smart-energy-monitor",
    name: "Automated Appliance Energy Saver",
    category: "Automation",
    difficulty: "Medium",
    estimatedTime: "3.5 hours",
    wasteWeight: 490,
    shortDescription: "Kills phantom standby loads on entertainment centres and PC peripherals using presence-aware power relays.",
    description: "Vampire power draws up to 10% of residential electric bills. This smart power strip turns off secondary monitors, speakers, and chargers when the user steps away from the workstation desk for more than 10 minutes.",
    schematicSummary: "Arduino Uno controlling relay bank via presence sensing.",
    components: [
      { name: "Arduino Uno", quantity: 1, required: true },
      { name: "Relay Module", quantity: 2, required: true },
      { name: "Ultrasonic Sensor", quantity: 1, required: true },
      { name: "LED", quantity: 2, required: false },
      { name: "Jumper Wires", quantity: 1, required: false }
    ],
    steps: [
      { step: 1, title: "Wire Secondary Outlet Relay", instruction: "Pass neutral/line through 10A rated isolated relay." },
      { step: 2, title: "Position Occupancy Sensor", instruction: "Aim at work chair backrest." },
      { step: 3, title: "Tune Inactivity Countdown", instruction: "Buffer 10 minutes delay to allow brief coffee breaks." }
    ],
    codeSnippet: `// Smart Energy Saver Controller`
  }
];

export const PROJECT_CATEGORIES = [
  "All",
  "IoT",
  "Robotics",
  "Smart Home",
  "Environmental",
  "Safety",
  "Education",
  "Accessibility",
  "Automation"
];

export const PROJECT_DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
