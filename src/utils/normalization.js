// Normalization dictionary for common component aliases
const ALIAS_MAP = {
  // Arduino
  'arduino': 'arduino uno',
  'arduino uno': 'arduino uno',
  'arduino uno r3': 'arduino uno',
  'uno': 'arduino uno',
  'atmega328p': 'arduino uno',
  
  // Ultrasonic
  'ultrasonic': 'ultrasonic sensor',
  'ultrasonic sensor': 'ultrasonic sensor',
  'sonar sensor': 'ultrasonic sensor',
  'sonar': 'ultrasonic sensor',
  'hc-sr04': 'ultrasonic sensor',
  'hc sr04': 'ultrasonic sensor',
  'hcsr04': 'ultrasonic sensor',
  
  // LCD
  'lcd': 'lcd display',
  'lcd display': 'lcd display',
  '16x2 lcd': 'lcd display',
  '1602 lcd': 'lcd display',
  'i2c lcd': 'lcd display',
  'liquid crystal display': 'lcd display',
  'display': 'lcd display',

  // LED
  'led': 'led',
  'leds': 'led',
  'led pack': 'led',
  'led pack (red & green)': 'led',
  'rgb led': 'led',
  'red led': 'led',
  'green led': 'led',
  'indicator led': 'led',

  // Buzzer
  'buzzer': 'buzzer',
  'piezo buzzer': 'buzzer',
  'active buzzer': 'buzzer',
  'active buzzer module': 'buzzer',
  'passive buzzer': 'buzzer',
  'alarm': 'buzzer',

  // Servo
  'servo': 'servo motor',
  'servo motor': 'servo motor',
  'sg90': 'servo motor',
  'sg90 micro servo': 'servo motor',
  'sg90 micro servo motor': 'servo motor',
  'micro servo': 'servo motor',

  // Temperature / Humidity
  'dht11': 'dht11 temperature sensor',
  'dht-11': 'dht11 temperature sensor',
  'dht22': 'dht11 temperature sensor',
  'temperature sensor': 'dht11 temperature sensor',
  'temp sensor': 'dht11 temperature sensor',
  'dht11 temperature & humidity sensor': 'dht11 temperature sensor',
  'dht11 temperature sensor': 'dht11 temperature sensor',

  // Relay
  'relay': 'relay module',
  'relay module': 'relay module',
  '5v relay': 'relay module',
  '5v single channel relay module': 'relay module',
  'single channel relay': 'relay module',

  // Soil moisture
  'soil moisture': 'soil moisture sensor',
  'soil moisture sensor': 'soil moisture sensor',
  'soil sensor': 'soil moisture sensor',
  'soil moisture sensor module': 'soil moisture sensor',

  // ESP32
  'esp32': 'esp32',
  'esp32 nodemcu': 'esp32',
  'nodemcu': 'esp32',
  'esp8266': 'esp32',
  'wifi mcu': 'esp32',

  // Motor Driver
  'motor driver': 'motor driver',
  'l298n': 'motor driver',
  'l298n dual h-bridge motor driver': 'motor driver',
  'h-bridge': 'motor driver',

  // Battery & Power
  'battery': 'battery',
  '9v battery': 'battery',
  '9v battery & clip cable': 'battery',
  '9v battery snap': 'battery',
  'power supply': 'battery',
  '18650': 'battery',

  // Jumper Wires / Breadboard
  'jumper wires': 'jumper wires',
  'jumper wires & breadboard': 'jumper wires',
  'wires': 'jumper wires',
  'breadboard': 'jumper wires',
  'breadboard & wires': 'jumper wires'
};

/**
 * Normalizes a component name: trims, lowercases, strips special punctuation,
 * and matches against known aliases.
 */
export function normalizeComponentName(rawName) {
  if (!rawName || typeof rawName !== 'string') return '';
  
  // Clean string
  let cleaned = rawName.toLowerCase().trim();
  cleaned = cleaned.replace(/[_-]/g, ' ').replace(/\s+/g, ' ');

  // Direct alias check
  if (ALIAS_MAP[cleaned]) {
    return ALIAS_MAP[cleaned];
  }

  // Substring or fuzzy check
  for (const [alias, standard] of Object.entries(ALIAS_MAP)) {
    if (cleaned === alias || cleaned.includes(alias) || alias.includes(cleaned)) {
      return standard;
    }
  }

  return cleaned;
}

/**
 * Checks whether an inventory component matches a project requirement name
 */
export function isComponentMatch(inventoryName, requiredName) {
  const normInv = normalizeComponentName(inventoryName);
  const normReq = normalizeComponentName(requiredName);

  if (normInv === normReq) return true;
  if (normInv.includes(normReq) || normReq.includes(normInv)) return true;
  return false;
}
