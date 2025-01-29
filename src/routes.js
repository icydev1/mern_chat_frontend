// // routes.js
// import React, { lazy, Suspense } from 'react';


// export const routes = [
//   { path: '/', element: lazy(() => import('./landingpage/LandingPage')), private: false },
//   { path: '/login', element: lazy(() => import('./Auth/Login')), private: false },
//   { path: '/signup', element: lazy(() => import('./Auth/Signup')), private: false },
//   { path: '/', element: lazy(() => import('./dashboard/Dashboard')), private: true }, // Example for dashboard route
//   { path: '/profile', element: lazy(() => import('./Profile/Profile')), private: true },
// ];

// export const privateRoutes = routes.filter(route => route.private);
// export const publicRoutes = routes.filter(route => !route.private);

import { lazy } from 'react';

// Lazy load components
const LandingPage = lazy(() => import('./landingpage/Landingpage'));
const Login = lazy(() => import('./Auth/Login'));
const Signup = lazy(() => import('./Auth/Signup'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Profile = lazy(() => import('./Profile/Profile'));
const EditProfile = lazy(() => import('./Profile/EditProfile'));





// Route definitions
export const routes = [
  { path: '/', element: LandingPage, private: false },
  { path: '/login', element: Login, private: false },
  { path: '/signup', element: Signup, private: false },
  { path: '/', element: Dashboard, private: true },
  { path: '/profile', element: Profile, private: true },
  { path: '/edit-profile', element: EditProfile, private: true },
];

// Filter routes into public and private
export const publicRoutes = routes.filter(route => !route.private);
export const privateRoutes = routes.filter(route => route.private);

