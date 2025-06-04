import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import ErrorBoundaryFallback from '../components/errorBoundaryFallback/ErrorBoundaryFallback.tsx';
import { Layout, Loading, LoginRegisterLayout } from '../components/index.ts';
import Cards from '../pages/shop/cards/Products.tsx';

const Home = lazy(() => import('../pages/home/Home.tsx'));
const Details = lazy(() => import('../pages/details/Details.tsx'));
const Login = lazy(() => import('../pages/login/Login.tsx'));
const NotFound = lazy(() => import('../pages/notFound/NotFound.tsx'));
const Register = lazy(() => import('../pages/register/Register.tsx'));
const Shop = lazy(() => import('../pages/shop/Shop.tsx'));
const Profile = lazy(() => import('../pages/profile/Profile.tsx'));

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundaryFallback />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <LoginRegisterLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      { path: 'profile', element: <Profile /> },
      {
        path: 'shop',
        element: <Shop />,
        children: [
          { index: true, element: <div>Select category</div> },
          {
            path: ':category',
            children: [
              { index: true, element: <Cards /> },
              {
                path: ':plantName',
                element: <Details />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={AppRouter} />
    </Suspense>
  );
};
