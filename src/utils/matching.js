import { isComponentMatch, normalizeComponentName } from './normalization.js';

/**
 * Calculates matching score and component breakdown for a project against user inventory.
 * Weights:
 * - Required components: 70%
 * - Optional components: 20%
 * - Quantity availability: 10%
 */
export function calculateProjectMatch(project, inventory = []) {
  if (!project || !Array.isArray(project.components)) {
    return {
      score: 0,
      status: "Low Compatibility",
      statusColor: "slate",
      matchedRequired: [],
      missingRequired: [],
      matchedOptional: [],
      missingOptional: [],
      potentialWasteReused: 0,
      whyThisProject: "No components found for this project.",
      canBuild: false,
    };
  }

  const requiredList = project.components.filter(c => c.required !== false);
  const optionalList = project.components.filter(c => c.required === false);

  let availableRequiredCount = 0;
  let totalRequiredQty = 0;
  let availableRequiredQty = 0;

  const matchedRequired = [];
  const missingRequired = [];

  let projectWasteWeight = 0;

  // Evaluate required components
  for (const req of requiredList) {
    totalRequiredQty += (req.quantity || 1);
    
    // Find matching item in inventory
    const invMatch = inventory.find(item => isComponentMatch(item.name, req.name));

    if (invMatch && invMatch.quantity > 0) {
      const fulfilledQty = Math.min(invMatch.quantity, req.quantity || 1);
      availableRequiredQty += fulfilledQty;

      if (invMatch.quantity >= (req.quantity || 1)) {
        availableRequiredCount += 1;
      } else {
        // Partial quantity
        availableRequiredCount += (invMatch.quantity / (req.quantity || 1));
      }

      matchedRequired.push({
        name: req.name,
        inventoryName: invMatch.name,
        needed: req.quantity || 1,
        available: invMatch.quantity,
        isSufficient: invMatch.quantity >= (req.quantity || 1),
        weight: invMatch.weight || 20
      });

      projectWasteWeight += (invMatch.weight || 20) * fulfilledQty;
    } else {
      missingRequired.push({
        name: req.name,
        needed: req.quantity || 1,
        available: 0
      });
    }
  }

  // Evaluate optional components
  let availableOptionalCount = 0;
  const matchedOptional = [];
  const missingOptional = [];

  for (const opt of optionalList) {
    const invMatch = inventory.find(item => isComponentMatch(item.name, opt.name));
    if (invMatch && invMatch.quantity > 0) {
      availableOptionalCount += 1;
      matchedOptional.push({
        name: opt.name,
        inventoryName: invMatch.name,
        needed: opt.quantity || 1,
        available: invMatch.quantity,
        weight: invMatch.weight || 15
      });
      projectWasteWeight += (invMatch.weight || 15) * Math.min(invMatch.quantity, opt.quantity || 1);
    } else {
      missingOptional.push({
        name: opt.name,
        needed: opt.quantity || 1,
        available: 0
      });
    }
  }

  // Calculate scores
  const requiredScore = requiredList.length > 0 
    ? (availableRequiredCount / requiredList.length) 
    : 1;

  const optionalScore = optionalList.length > 0 
    ? (availableOptionalCount / optionalList.length) 
    : 1;

  const quantityScore = totalRequiredQty > 0 
    ? Math.min(1, availableRequiredQty / totalRequiredQty) 
    : 1;

  // Weighted formula: Required 72%, Optional 18%, Quantity 10%
  const weightedScore = (requiredScore * 0.72) + (optionalScore * 0.18) + (quantityScore * 0.10);
  const score = Math.round(weightedScore * 100);

  // Status designation
  let status = "Low Compatibility";
  let statusColor = "slate";

  if (score >= 90) {
    status = "Ready to Build";
    statusColor = "emerald";
  } else if (score >= 70) {
    status = "Almost Ready";
    statusColor = "amber";
  } else if (score >= 40) {
    status = "Needs More Components";
    statusColor = "blue";
  } else {
    status = "Low Compatibility";
    statusColor = "slate";
  }

  const canBuild = missingRequired.length === 0 && matchedRequired.every(m => m.isSufficient);

  // Formulate intelligent "Why this project?" reasoning text
  let whyThisProject = "";
  const totalItems = project.components.length;
  const totalMatched = matchedRequired.length + matchedOptional.length;

  if (canBuild && missingOptional.length === 0) {
    whyThisProject = `You have all ${totalItems} components required and optional for this project. Ready for immediate assembly!`;
  } else if (canBuild && missingOptional.length > 0) {
    whyThisProject = `You have all ${requiredList.length} essential components to build this project right now! Adding ${missingOptional.map(o => o.name).join(', ')} is optional for extra features.`;
  } else if (missingRequired.length === 1) {
    whyThisProject = `You already have ${totalMatched} of the components. Adding just one ${missingRequired[0].name} will make this project 100% build-ready!`;
  } else if (missingRequired.length > 1) {
    whyThisProject = `You have ${totalMatched} matching parts. You only need ${missingRequired.length} more essential parts (${missingRequired.map(m => m.name).join(', ')}) to complete the build.`;
  } else {
    whyThisProject = `Start collecting standard components like ${project.components.slice(0, 2).map(c => c.name).join(' or ')} to unlock this build.`;
  }

  // Potential e-waste diverted: use calculated waste weight or project default if reasonable
  const wasteReused = project.wasteWeight || (projectWasteWeight > 0 ? projectWasteWeight : 250);

  return {
    score,
    status,
    statusColor,
    matchedRequired,
    missingRequired,
    matchedOptional,
    missingOptional,
    potentialWasteReused: wasteReused,
    whyThisProject,
    canBuild,
    totalRequired: requiredList.length,
    matchedRequiredCount: matchedRequired.length,
    totalOptional: optionalList.length,
    matchedOptionalCount: matchedOptional.length
  };
}

/**
 * Evaluates an entire list of projects against current inventory and sorts by compatibility
 */
export function rankProjects(projects = [], inventory = []) {
  const evaluated = projects.map(proj => {
    const match = calculateProjectMatch(proj, inventory);
    return {
      ...proj,
      match
    };
  });

  // Sort descending by score, then by waste reused
  return evaluated.sort((a, b) => {
    if (b.match.score !== a.match.score) {
      return b.match.score - a.match.score;
    }
    return b.match.potentialWasteReused - a.match.potentialWasteReused;
  });
}
