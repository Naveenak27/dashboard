import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Sidebar from '../sider/sidebar';
import Login from '../starting/Login';
import Register from '../starting/Register';
import PrivateRoute from '../router/PrivateRoute'; // Import the PrivateRoute component

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Private Routes */}
    <Route
      path="/main"
      element={
        <PrivateRoute>
          <Sidebar />
        </PrivateRoute>
      }
    >
      <Route path="page1" element={<Page1 />} />
      <Route path="page2" element={<Page2 />} />
      <Route path="page3" element={<Page3 />} />
    </Route>
  </Routes>
);

export default AppRoutes;
