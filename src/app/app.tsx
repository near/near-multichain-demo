import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import { MainLayout } from '@/components/layout';
// import GenerateTransaction from '@/pages/GenerateTransaction';

import { AuthProvider } from '@/context/AuthContext';
import GenerateTransaction from '@/pages/GenerateTransaction';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="generate-transaction"
                element={<GenerateTransaction />}
              ></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
