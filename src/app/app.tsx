import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import { MainLayout } from '@/components/layout';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const App: React.FC = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
);

export default App;
