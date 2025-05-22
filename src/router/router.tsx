import { lazy, Suspense } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Cards from '../components/cards/Cards.tsx';
import { Header, Loading } from '../components/index.ts';
import CONSTANTS from '../utils/CONSTANTS.ts';

const Home = lazy(() => import('../pages/home/Home.tsx'));
const Details = lazy(() => import('../pages/details/Details.tsx'));
const Login = lazy(() => import('../pages/login/Login.tsx'));
const NotFound = lazy(() => import('../pages/notFound/NotFound.tsx'));
const Preview = lazy(() => import('../pages/preview/Preview.tsx'));
const Register = lazy(() => import('../pages/register/Register.tsx'));
const Shop = lazy(() => import('../pages/shop/Shop.tsx'));
const Profile = lazy(() => import('../pages/profile/Profile.tsx'));

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          element={
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          }
        >
          <Route element={<Home />} path={CONSTANTS.home} />
          <Route element={<Preview />} path={CONSTANTS.preview} />
          <Route element={<Login />} path={CONSTANTS.login} />
          <Route element={<Register />} path={CONSTANTS.register} />

          <Route element={<Shop />} path={CONSTANTS.shop}>
            <Route element={<Cards />} index />
            <Route element={<Cards />} path=":category" />
            <Route element={<Details />} path=":category/:plantName" />
            <Route element={<Details />} path=":category/:plantName/:plantId" />
          </Route>

          <Route element={<Profile />} path={CONSTANTS.profile} />
          <Route element={<NotFound />} path="*" />
        </Route>
      </Routes>
    </>
  );
};

export const Router = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
