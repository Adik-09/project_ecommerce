import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Base from './components/base'
import HeroSection from './pages/home'
import Profile from './pages/profile';
import LoginPage from './pages/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    children: [{ path: 'home/', element: <HeroSection /> }]
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
