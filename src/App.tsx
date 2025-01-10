// src/App.tsx

// 1. Import all necessary components and functions
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import FollowUpManager  from '/Users/brianonufrejow/Documents/case-management-gen2/src/components/follow-ups/FollowUpManager.tsx';
import { CaseView } from './components/cases/CaseView';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// 2. Define the main App component
function App() {
  // 3. Effect to handle dark mode
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // 4. Return the complete app structure
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <NavBar />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/follow-ups" element={<FollowUpManager />} />
              <Route path="/cases/:caseId" element={<CaseView />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

// 5. Export the app with authentication wrapper
export default withAuthenticator(App);