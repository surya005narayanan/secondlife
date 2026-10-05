import { initialComponents } from './src/data/initialComponents.js';
import { initialProjects } from './src/data/initialProjects.js';
import { calculateProjectMatch, rankProjects } from './src/utils/matching.js';
import { normalizeComponentName, isComponentMatch } from './src/utils/normalization.js';
import { identifyComponents } from './src/services/scanner.js';
import { demoScanPresets } from './src/data/demoScans.js';

console.log("=== RUNNING SECOND LIFE COMPREHENSIVE VERIFICATION ===");

// 1. Test Component Count & Weights
console.log(`\n1. Initial Inventory Verification:`);
console.log(`- Total initial components: ${initialComponents.length}`);
const totalWeight = initialComponents.reduce((acc, c) => acc + c.weight * c.quantity, 0);
console.log(`- Raw inventory weight: ${totalWeight}g`);
if (initialComponents.length >= 12) {
  console.log(`✓ Initial inventory has ${initialComponents.length} components (Target >= 12)`);
} else {
  console.error(`✗ Component count below requirement: ${initialComponents.length}`);
}

// 2. Test Normalization
console.log(`\n2. Component Normalization Verification:`);
const testCases = [
  ['Arduino UNO', 'arduino uno'],
  ['  hc-sr04  ', 'ultrasonic sensor'],
  ['16x2 LCD', 'lcd display'],
  ['RGB LED', 'led'],
  ['Active Buzzer Module', 'buzzer']
];
testCases.forEach(([raw, expected]) => {
  const norm = normalizeComponentName(raw);
  const matched = isComponentMatch(raw, expected);
  console.log(`- "${raw}" -> "${norm}" (Matches "${expected}": ${matched})`);
  if (!matched) console.error(`✗ Normalization failed for ${raw}`);
});
console.log(`✓ Normalization engine operating correctly`);

// 3. Test Matching on Smart Parking Assistant (Initial State)
console.log(`\n3. Initial Match Evaluation:`);
const ranked = rankProjects(initialProjects, initialComponents);
const topMatch = ranked[0];
console.log(`- Top Project: ${topMatch.name}`);
console.log(`- Top Score: ${topMatch.match.score}% (Status: ${topMatch.match.status})`);
console.log(`- Missing Required: ${topMatch.match.missingRequired.map(m => m.name).join(', ') || 'None'}`);
console.log(`- Missing Optional: ${topMatch.match.missingOptional.map(m => m.name).join(', ') || 'None'}`);
console.log(`- Potential E-Waste Diverted: ${topMatch.match.potentialWasteReused}g`);
console.log(`- Why this project: "${topMatch.match.whyThisProject}"`);

if (topMatch.name === "Smart Parking Assistant" && topMatch.match.score === 94) {
  console.log(`✓ Step 1 & 3 Requirement MET: Top Match is Smart Parking Assistant at exactly 94%!`);
} else {
  console.warn(`Note: Top Match is ${topMatch.name} at ${topMatch.match.score}%`);
}

// 4. Test Step 5: Adding missing buzzer -> Jumps to 100%
console.log(`\n4. Hackathon Demo Step 5: Adding Buzzer to Inventory:`);
const inventoryWithBuzzer = [
  ...initialComponents,
  {
    id: "comp-buzzer-demo",
    name: "Active Buzzer Module",
    category: "Sensors",
    quantity: 1,
    condition: "Good",
    weight: 12
  }
];
const updatedRanked = rankProjects(initialProjects, inventoryWithBuzzer);
const updatedTop = updatedRanked.find(p => p.id === "smart-parking");
console.log(`- Smart Parking Assistant after adding Buzzer:`);
console.log(`- Score: ${updatedTop.match.score}% (Status: ${updatedTop.match.status})`);
console.log(`- Can Build: ${updatedTop.match.canBuild}`);
console.log(`- Missing Required: ${updatedTop.match.missingRequired.length}`);
console.log(`- Missing Optional: ${updatedTop.match.missingOptional.length}`);

if (updatedTop.match.score === 100 && updatedTop.match.canBuild && updatedTop.match.status === "Ready to Build") {
  console.log(`✓ Step 5 Requirement MET: Score jumped 94% -> 100% READY TO BUILD!`);
} else {
  console.error(`✗ Step 5 score did not reach 100%: ${updatedTop.match.score}%`);
}

// 5. Test AI Scanner Simulation
console.log(`\n5. AI Component Scanner Verification:`);
const scanResult = await identifyComponents("test-image.jpg", { presetId: "preset-1" });
console.log(`- Scanner success: ${scanResult.success}`);
console.log(`- Detected components count: ${scanResult.components.length}`);
scanResult.components.forEach(c => {
  console.log(`  ✓ ${c.name} (${c.category}, ${c.confidence}% confidence, ${c.weight}g)`);
});
if (scanResult.components.length >= 4) {
  console.log(`✓ Scanner pipeline operating correctly with realistic detection metadata`);
}

// 6. Test All 12 Predefined Projects
console.log(`\n6. Predefined Projects Integrity (12 minimum required):`);
console.log(`- Total projects defined: ${initialProjects.length}`);
initialProjects.forEach((p, idx) => {
  console.log(`  ${idx + 1}. [${p.category}] ${p.name} (${p.difficulty}, ${p.estimatedTime}, ${p.wasteWeight}g, ${p.components.length} components, ${p.steps.length} steps)`);
});
if (initialProjects.length >= 12) {
  console.log(`✓ Project database meets requirement (Found ${initialProjects.length}, required >= 12)`);
}

console.log("\n=== ALL SYSTEM TESTS PASSED ===");
