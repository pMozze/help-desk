import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';

import Layout from './pages/Layout';
import Home from './pages/Home';
import EmployeesRequests from './pages/EmployeesRequests';
import DepartmentRequests from './pages/DepartmentRequests';
import CustomersComplaints from './pages/CustomersComplaints';

createRoot(document.getElementById('support-desk')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route Component={Layout}>
          <Route index path='/' Component={Home} />
          <Route path='/employees-requests' Component={EmployeesRequests} />
          <Route path='/department-requests' Component={DepartmentRequests} />
          <Route path='/customers-complaints' Component={CustomersComplaints} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
