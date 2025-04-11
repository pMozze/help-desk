import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';

import Layout from './pages/Layout';
import Home from './pages/Home';
import TicketPage from './pages/Ticket';
import RequestsPage from './pages/Requests';
import WikiPage from './pages/Wiki';

createRoot(document.getElementById('help-desk')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route Component={Layout}>
          <Route index path='/' Component={Home} />
          <Route path='/ticket/create' Component={TicketPage} />
          <Route path='/ticket/:id' Component={TicketPage} />
          <Route path='/requests/create' Component={RequestsPage} />
          <Route path='/requests/:id' Component={RequestsPage} />
          <Route path='/wiki' Component={WikiPage} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
