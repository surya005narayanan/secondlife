import { initialComponents } from '../data/initialComponents';
import { initialProjects } from '../data/initialProjects';
import { initialCommunityProjects } from '../data/communityProjects';

const STORAGE_KEYS = {
  COMPONENTS: 'secondlife_components_v1',
  PROJECTS: 'secondlife_projects_v1',
  COMMUNITY: 'secondlife_community_v1',
  COMPLETED_PROJECTS: 'secondlife_completed_projects_v1',
  RESERVED_PROJECTS: 'secondlife_reserved_projects_v1',
  USER_PROFILE: 'secondlife_user_profile_v1',
  DEMO_MODE_STEP: 'secondlife_demo_step_v1'
};

const DEFAULT_USER_PROFILE = {
  name: "Surya",
  email: "surya@secondlife.eco",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  title: "Lead Eco-Hacker & Systems Architect",
  location: "Bangalore, India",
  joinedDate: "October 2024",
  bio: "Passionate about circular electronics and turning scrap silicon into autonomous environmental sentinels.",
  badges: [
    { id: "b1", title: "First Recycler", icon: "♻", desc: "Salvaged first electronic component", unlocked: true },
    { id: "b2", title: "Component Collector", icon: "🔧", desc: "Added over 10 parts to personal vault", unlocked: true },
    { id: "b3", title: "AI Builder", icon: "🤖", desc: "Ran AI optical component scanner", unlocked: true },
    { id: "b4", title: "Eco Engineer", icon: "🌱", desc: "Diverted > 1.5 kg of hazardous e-waste", unlocked: true },
    { id: "b5", title: "SecondLife Pioneer", icon: "🏆", desc: "Participated in Hackathon Demo Day", unlocked: true }
  ]
};

// Safe JSON wrapper
function safeGet(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return defaultValue;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving to localStorage key "${key}":`, err);
  }
}

export const StorageService = {
  // Components
  getComponents() {
    return safeGet(STORAGE_KEYS.COMPONENTS, initialComponents);
  },
  saveComponents(components) {
    safeSet(STORAGE_KEYS.COMPONENTS, components);
  },

  // Projects
  getProjects() {
    return safeGet(STORAGE_KEYS.PROJECTS, initialProjects);
  },
  saveProjects(projects) {
    safeSet(STORAGE_KEYS.PROJECTS, projects);
  },

  // Community
  getCommunity() {
    return safeGet(STORAGE_KEYS.COMMUNITY, initialCommunityProjects);
  },
  saveCommunity(community) {
    safeSet(STORAGE_KEYS.COMMUNITY, community);
  },

  // Completed & Reserved Projects
  getCompletedProjects() {
    return safeGet(STORAGE_KEYS.COMPLETED_PROJECTS, []);
  },
  saveCompletedProjects(list) {
    safeSet(STORAGE_KEYS.COMPLETED_PROJECTS, list);
  },

  getReservedProjects() {
    return safeGet(STORAGE_KEYS.RESERVED_PROJECTS, []);
  },
  saveReservedProjects(list) {
    safeSet(STORAGE_KEYS.RESERVED_PROJECTS, list);
  },

  // User Profile
  getUserProfile() {
    return safeGet(STORAGE_KEYS.USER_PROFILE, DEFAULT_USER_PROFILE);
  },
  saveUserProfile(profile) {
    safeSet(STORAGE_KEYS.USER_PROFILE, profile);
  },

  // Demo flow step
  getDemoStep() {
    return safeGet(STORAGE_KEYS.DEMO_MODE_STEP, 1);
  },
  saveDemoStep(step) {
    safeSet(STORAGE_KEYS.DEMO_MODE_STEP, step);
  },

  // Full Reset to default initial state
  resetAll() {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPONENTS, JSON.stringify(initialComponents));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
      localStorage.setItem(STORAGE_KEYS.COMMUNITY, JSON.stringify(initialCommunityProjects));
      localStorage.setItem(STORAGE_KEYS.COMPLETED_PROJECTS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.RESERVED_PROJECTS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_USER_PROFILE));
      localStorage.setItem(STORAGE_KEYS.DEMO_MODE_STEP, JSON.stringify(1));
      return true;
    } catch (err) {
      console.error("Failed to reset storage:", err);
      return false;
    }
  }
};
