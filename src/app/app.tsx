import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import { MainLayout } from '@/components/layout';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import GenerateTransaction from '@/pages/GenerateTransaction';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const ProtectedRoutes = () => {
  const { signedIn } = useAuth();
  // If user is not signed in, redirect to home
  if (!signedIn) {
    return <Navigate to="/" />;
  }
  // Otherwise, render the requested component
  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="generate-transaction"
                  element={<GenerateTransaction />}
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
