import { createBrowserRouter } from 'react-router-dom';
import AuthGuard from './auth-guard';
import AuthLayout from '../layouts/auth-layout';
import MainLayout from '../layouts/main-layout';
import { AuthPage } from '@/pages/auth';
import { MainPage } from '@/pages/main';
import { UserPage } from '@/pages/user';

export const appRouter = createBrowserRouter([
  {
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    errorElement: <div>Error</div>,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/user', element: <UserPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: '/auth',
        element: <AuthPage />,
      },
    ],
  },
]);
