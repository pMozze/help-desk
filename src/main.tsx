import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';

import Home from './pages/Home';
import CustomersComplaints from './pages/CustomersComplaints';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/customers-complaints' Component={CustomersComplaints} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
