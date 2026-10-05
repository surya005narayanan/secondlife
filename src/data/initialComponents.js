export const initialComponents = [
  {
    id: "comp-1",
    name: "Arduino Uno",
    category: "Microcontrollers",
    quantity: 1,
    condition: "Used",
    weight: 25,
    description: "ATmega328P development board with USB-B interface and headers. Pulled from a retired school robotics kit.",
    tags: ["mcu", "5v", "atmega328p"]
  },
  {
    id: "comp-2",
    name: "Ultrasonic Sensor",
    category: "Sensors",
    quantity: 2,
    condition: "Good",
    weight: 15,
    description: "HC-SR04 sonar distance module (2cm–400cm). Salvaged from an old obstacle-detection prototype.",
    tags: ["distance", "sonar", "hc-sr04"]
  },
  {
    id: "comp-3",
    name: "LCD Display",
    category: "Displays",
    quantity: 1,
    condition: "Used",
    weight: 35,
    description: "16×2 character LCD with I2C backpack already soldered. Extracted from a decommissioned vending machine controller.",
    tags: ["screen", "i2c", "1602"]
  },
  {
    id: "comp-4",
    name: "LED Pack (Red & Green)",
    category: "Passive Components",
    quantity: 12,
    condition: "New",
    weight: 10,
    description: "5mm diffused through-hole LEDs — 6 red and 6 green. Unused stock from a cancelled school maker fair.",
    tags: ["light", "indicator", "diode"]
  },
  {
    id: "comp-5",
    name: "Jumper Wires & Breadboard",
    category: "Cables",
    quantity: 1,
    condition: "Good",
    weight: 95,
    description: "830-point solderless breadboard with full M-M, M-F, F-F wire sets. Well-used but fully functional.",
    tags: ["prototyping", "wiring"]
  },
  {
    id: "comp-6",
    name: "9V Battery & Clip Cable",
    category: "Power",
    quantity: 2,
    condition: "New",
    weight: 50,
    description: "9V zinc-carbon cells with barrel-jack clip connectors. Stored fresh in a drawer for over two years.",
    tags: ["power", "battery", "dc"]
  },
  {
    id: "comp-7",
    name: "Soil Moisture Sensor",
    category: "Sensors",
    quantity: 1,
    condition: "Salvage",
    weight: 15,
    description: "Resistive capacitance moisture probe with LM393 comparator board. Recovered from a dead plant-monitoring gadget.",
    tags: ["analog", "agriculture", "plant"]
  },
  {
    id: "comp-8",
    name: "100Ω Resistor Pack",
    category: "Passive Components",
    quantity: 25,
    condition: "New",
    weight: 5,
    description: "1/4W ±5% carbon film resistors in a standard anti-static bag. Leftover from a PCB assembly order.",
    tags: ["resistor", "passive", "current-limit"]
  },
  {
    id: "comp-9",
    name: "NPN Transistor BC547",
    category: "Passive Components",
    quantity: 8,
    condition: "Good",
    weight: 3,
    description: "TO-92 package NPN signal transistors. Desoldered from a broken portable speaker amplifier board.",
    tags: ["transistor", "npn", "switch"]
  },
  {
    id: "comp-10",
    name: "100µF Electrolytic Capacitor",
    category: "Passive Components",
    quantity: 5,
    condition: "Good",
    weight: 8,
    description: "16V 100µF radial electrolytic caps. Removed from a dead UPS PCB that failed due to dry joints, not capacitors.",
    tags: ["cap", "electrolytic", "filter"]
  },
  {
    id: "comp-11",
    name: "10kΩ Trim Potentiometer",
    category: "Passive Components",
    quantity: 3,
    condition: "Good",
    weight: 6,
    description: "Single-turn carbon trimpots on a 0.1\" pin pitch. Good for LCD contrast bias and sensor calibration.",
    tags: ["pot", "analog", "variable-resistor"]
  },
  {
    id: "comp-12",
    name: "Tactile Push Button Switch",
    category: "Passive Components",
    quantity: 6,
    condition: "New",
    weight: 4,
    description: "6mm×6mm momentary PCB-mount switches with caps. Never used — came in the same order as a cancelled IoT badge project.",
    tags: ["switch", "button", "digital-input"]
  }
];

export const COMPONENT_CATEGORIES = [
  "All",
  "Microcontrollers",
  "Sensors",
  "Displays",
  "Motors",
  "Power",
  "Passive Components",
  "Communication",
  "PC Components",
  "Cables",
  "Other"
];

export const COMPONENT_CONDITIONS = ["All", "New", "Good", "Used", "Salvage"];
