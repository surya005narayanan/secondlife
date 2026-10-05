export const demoScanPresets = [
  {
    id: "preset-1",
    name: "Tinkerer's Drawer Salvage",
    description: "Assorted dev boards, sonar sensor, servo, and display module extracted from old kit box.",
    thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&auto=format&fit=crop&q=80",
    detectedComponents: [
      { name: "Arduino Uno", category: "Microcontrollers", confidence: 96, weight: 25, condition: "Used", quantity: 1 },
      { name: "Ultrasonic Sensor", category: "Sensors", confidence: 92, weight: 15, condition: "Good", quantity: 1 },
      { name: "LCD Display", category: "Displays", confidence: 94, weight: 35, condition: "Used", quantity: 1 },
      { name: "SG90 Micro Servo Motor", category: "Motors", confidence: 89, weight: 18, condition: "Good", quantity: 1 },
      { name: "LED Pack (Red & Green)", category: "Passive Components", confidence: 98, weight: 8, condition: "New", quantity: 5 }
    ]
  },
  {
    id: "preset-2",
    name: "Buzzer & Audio Alarm Stash",
    description: "Discovered during garage cleanup: Piezo elements, buzzers, and power clips.",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    detectedComponents: [
      { name: "Active Buzzer Module", category: "Sensors", confidence: 95, weight: 12, condition: "Good", quantity: 2 },
      { name: "9V Battery Snap", category: "Power", confidence: 91, weight: 15, condition: "Good", quantity: 2 },
      { name: "Tactile Push Switches", category: "Passive Components", confidence: 88, weight: 6, condition: "New", quantity: 4 }
    ]
  },
  {
    id: "preset-3",
    name: "Smart Agriculture Salvage",
    description: "Components recovered from an abandoned greenhouse test rig.",
    thumbnail: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80",
    detectedComponents: [
      { name: "Soil Moisture Sensor Module", category: "Sensors", confidence: 94, weight: 16, condition: "Good", quantity: 2 },
      { name: "5V Single Channel Relay Module", category: "Power", confidence: 97, weight: 32, condition: "Used", quantity: 1 },
      { name: "ESP32 NodeMCU", category: "Microcontrollers", confidence: 93, weight: 22, condition: "Good", quantity: 1 }
    ]
  }
];

export const defaultDetectionResult = [
  { name: "Arduino Uno", category: "Microcontrollers", confidence: 96, weight: 25, condition: "Used", quantity: 1 },
  { name: "Ultrasonic Sensor", category: "Sensors", confidence: 92, weight: 15, condition: "Good", quantity: 1 },
  { name: "SG90 Micro Servo Motor", category: "Motors", confidence: 89, weight: 18, condition: "Good", quantity: 1 },
  { name: "LCD Display", category: "Displays", confidence: 94, weight: 35, condition: "Used", quantity: 1 },
  { name: "LED Pack (Red & Green)", category: "Passive Components", confidence: 98, weight: 10, condition: "Good", quantity: 4 }
];
