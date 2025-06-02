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
    Component: Layout,
    errorElement: <ErrorBoundaryFallback />,
    children: [
      { index: true, Component: Home },
      {
        Component: LoginRegisterLayout,
        children: [
          { path: 'login', Component: Login },
          { path: 'register', Component: Register },
        ],
      },
      { path: 'profile', Component: Profile },
      {
        path: 'shop',
        Component: Shop,
        children: [
          {
            path: ':category',
            Component: Cards,
          },
        ],
      },
      {
        path: 'shop/:category/:plantName',
        Component: Details,
        children: [
          {
            path: ':plantId',
            Component: Details,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={AppRouter} />
    </Suspense>
  );
};
