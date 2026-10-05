import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import DemoGuideBanner from './components/layout/DemoGuideBanner';
import CommandPalette from './components/layout/CommandPalette';
import ToastContainer from './components/layout/ToastContainer';
import AddComponentModal from './components/components/AddComponentModal';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ComponentsPage from './pages/ComponentsPage';
import MatchPage from './pages/MatchPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ScannerPage from './pages/ScannerPage';
import ImpactPage from './pages/ImpactPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const { activeRoute } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Parse route path
  let currentPath = activeRoute || '/';
  if (currentPath.startsWith('/#')) {
    currentPath = currentPath.substring(2);
  }
  if (!currentPath.startsWith('/')) {
    currentPath = '/' + currentPath;
  }

  // Check if landing page
  const isLanding = currentPath === '/';

  // Check if project detail page: e.g. /projects/smart-parking
  const projectDetailMatch = currentPath.match(/^\/projects\/([a-zA-Z0-9_-]+)$/);
  const projectId = projectDetailMatch ? projectDetailMatch[1] : null;

  return (
    <div className="min-h-screen bg-white text-[#202020] flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* 1. Global Interactive Demo Guide Banner (Interactive Top Step Walkthrough) */}
      <DemoGuideBanner />

      {/* 2. Global Navbar */}
      <Navbar />

      {/* 3. Main Workspace Shell */}
      {isLanding ? (
        <main className="flex-1">
          <LandingPage />
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Desktop Left Sidebar */}
          <div className="hidden md:block">
            <Sidebar onOpenAddModal={() => setIsAddModalOpen(true)} />
          </div>

          {/* Main Page Content Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
            {projectId ? (
              <ProjectDetailPage projectId={projectId} />
            ) : currentPath.startsWith('/dashboard') ? (
              <DashboardPage onOpenAddModal={() => setIsAddModalOpen(true)} />
            ) : currentPath.startsWith('/components') ? (
              <ComponentsPage onOpenAddModal={() => setIsAddModalOpen(true)} />
            ) : currentPath.startsWith('/match') ? (
              <MatchPage onOpenAddModal={() => setIsAddModalOpen(true)} />
            ) : currentPath.startsWith('/projects') ? (
              <ProjectsPage />
            ) : currentPath.startsWith('/scan') ? (
              <ScannerPage />
            ) : currentPath.startsWith('/impact') ? (
              <ImpactPage />
            ) : currentPath.startsWith('/community') ? (
              <CommunityPage />
            ) : currentPath.startsWith('/profile') ? (
              <ProfilePage />
            ) : (
              <DashboardPage onOpenAddModal={() => setIsAddModalOpen(true)} />
            )}
          </main>
        </div>
      )}

      {/* 4. Global Modals & Notifications */}
      <AddComponentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <CommandPalette />
      <ToastContainer />
    </div>
  );
}
