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
// const LandingPage = lazy(() => import('./landingpage/LandingPage'));
// const Login = lazy(() => import('./Auth/Login'));
// const Signup = lazy(() => import('./Auth/Signup'));
// const Dashboard = lazy(() => import('./dashboard/Dashboard'));
// const Profile = lazy(() => import('./Profile/Profile'));

const LandingPage = lazy(() => Promise.resolve({ default: require('./landingpage/LandingPage').default }));
const Login = lazy(() => Promise.resolve({ default: require('./Auth/Login').default }));
const Signup = lazy(() => Promise.resolve({ default: require('./Auth/Signup').default }));
const Dashboard = lazy(() => Promise.resolve({ default: require('./dashboard/Dashboard').default }));
const Profile = lazy(() => Promise.resolve({ default: require('./Profile/Profile').default }));


// Route definitions
export const routes = [
  { path: '/', element: LandingPage, private: false },
  { path: '/login', element: Login, private: false },
  { path: '/signup', element: Signup, private: false },
  { path: '/', element: Dashboard, private: true },
  { path: '/profile', element: Profile, private: true },
];

// Filter routes into public and private
export const publicRoutes = routes.filter(route => !route.private);
export const privateRoutes = routes.filter(route => route.private);

