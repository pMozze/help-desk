import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';

import Layout from './Layout';
import Home from './pages/Home';
import CustomersComplaints from './pages/CustomersComplaints';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route Component={Layout}>
          <Route index path='/' Component={Home} />
          <Route path='/customers-complaints' Component={CustomersComplaints} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
