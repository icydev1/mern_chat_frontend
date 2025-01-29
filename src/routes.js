// routes.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
// import LandingPage from './landingpage/Landingpage';
import Sidebar from './partial/Sidebar';
import Navbar from './partial/Navbar';

export const routes = [
  { path: '/', element: lazy(() => import('./landingpage//LandingPage')), private: false },
  { path: '/login', element: lazy(() => import('./Auth/Login')), private: false },
  { path: '/signup', element: lazy(() => import('./Auth/Signup')), private: false },
  { path: '/', element: lazy(() => import('./dashboard/Dashboard')), private: true }, // Example for dashboard route
  { path: '/profile', element: lazy(() => import('./Profile/Profile')), private: true },
];

export const privateRoutes = routes.filter(route => route.private);
export const publicRoutes = routes.filter(route => !route.private);
