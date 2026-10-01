import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import PresentationGuideModal from './components/PresentationGuideModal';

import DashboardView from './pages/DashboardView';
import DatasetView from './pages/DatasetView';
import ProbabilityAnalysisView from './pages/ProbabilityAnalysisView';
import BayesTheoremView from './pages/BayesTheoremView';
import ConfusionMatrixView from './pages/ConfusionMatrixView';
import PerformanceMetricsView from './pages/PerformanceMetricsView';
import PrevalenceAnalysisView from './pages/PrevalenceAnalysisView';
import FalsePositiveAnalysisView from './pages/FalsePositiveAnalysisView';
import InsightsView from './pages/InsightsView';
import AboutProjectView from './pages/AboutProjectView';

import {
  calculateBayes,
  generateSimulatedDataset
} from './utils/probabilityEngine';

import './App.css';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Generate 10,000 simulated observations once
  const simulatedDataset = useMemo(() => {
    return generateSimulatedDataset();
  }, []);

  // Baseline standard Bayes parameters: Prevalence = 0.01 (1%), Sensitivity = 0.95 (95%), Specificity = 0.95 (95%)
  const baselineBayesData = useMemo(() => {
    return calculateBayes(0.01, 0.95, 0.95, 10000);
  }, []);

  // Title map for top navbar
  const viewTitles = {
    dashboard: 'Dashboard Overview',
    dataset: 'Simulated Dataset (10,000 Records)',
    probability: 'Probability Theory & Rules',
    bayes: "Bayes' Theorem Inversion",
    confusion: 'Diagnostic Confusion Matrix',
    metrics: 'Statistical Performance Metrics',
    prevalence: 'Prevalence & PPV Dynamics',
    'false-positive': 'False Positive Rate Sensitivity',
    insights: 'Analytical Findings & Insights',
    about: 'About Project & Python Specifications'
  };

  const handleSearchChange = (query) => {
    setGlobalSearchQuery(query);
    if (query && currentView !== 'dataset') {
      setCurrentView('dataset');
    }
  };

  return (
    <div className={`app-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Ambient background glows */}
      <div className="bg-ambient-glow bg-ambient-teal" />
      <div className="bg-ambient-glow bg-ambient-purple" />

      {/* Collapsible Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main App Layout */}
      <div className="main-wrapper">
        {/* Top Navbar */}
        <TopNavbar
          currentTitle={viewTitles[currentView] || 'Bayes Theorem Lab'}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          searchQuery={globalSearchQuery}
          onSearchChange={handleSearchChange}
          onOpenHelpModal={() => setIsHelpModalOpen(true)}
          onNavigate={setCurrentView}
        />

        {/* Dynamic Page Views */}
        <main className="page-content-wrapper">
          {currentView === 'dashboard' && (
            <DashboardView
              bayesData={baselineBayesData}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'dataset' && (
            <DatasetView
              dataset={simulatedDataset}
            />
          )}

          {currentView === 'probability' && (
            <ProbabilityAnalysisView
              bayesData={baselineBayesData}
            />
          )}

          {currentView === 'bayes' && (
            <BayesTheoremView
              bayesData={baselineBayesData}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'confusion' && (
            <ConfusionMatrixView
              bayesData={baselineBayesData}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'metrics' && (
            <PerformanceMetricsView
              bayesData={baselineBayesData}
            />
          )}

          {currentView === 'prevalence' && (
            <PrevalenceAnalysisView
              sensitivity={0.95}
              specificity={0.95}
            />
          )}

          {currentView === 'false-positive' && (
            <FalsePositiveAnalysisView
              prevalence={0.01}
              sensitivity={0.95}
            />
          )}

          {currentView === 'insights' && (
            <InsightsView
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'about' && (
            <AboutProjectView />
          )}
        </main>
      </div>

      {/* Presentation Walkthrough Modal */}
      <PresentationGuideModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
