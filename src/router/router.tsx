import { lazy, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { Header, PageTransition } from '../components/index.ts';
import CONSTANTS from '../utils/CONSTANTS.ts';

const Home = lazy(() => import('../pages/home/Home.tsx'));
const Login = lazy(() => import('../pages/login/Login.tsx'));
const NotFound = lazy(() => import('../pages/notFound/NotFound.tsx'));
const Preview = lazy(() => import('../pages/preview/Preview.tsx'));
const Register = lazy(() => import('../pages/register/Register.tsx'));

const AppRoutes = () => {
  const location = useLocation();
  const isKnownRoute = [
    CONSTANTS.home,
    CONSTANTS.preview,
    CONSTANTS.login,
    CONSTANTS.register,
  ].includes(location.pathname);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        //todo check auth function
        await new Promise(resolve => {
          setTimeout(() => {
            console.log('done');
            resolve('done');
          }, 1000);
        });
      } catch {
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    void checkAuth();
  }, [location.pathname]);
  return (
    <>
      {isKnownRoute ? <Header /> : null}
      <Routes>
        <Route
          element={
            <PageTransition isLoading={isLoading}>
              <Home />
            </PageTransition>
          }
          path="/"
        />
        <Route
          element={
            <PageTransition isLoading={isLoading}>
              <Preview />
            </PageTransition>
          }
          path="/preview"
        />
        <Route
          element={
            <PageTransition isLoading={isLoading}>
              <Login />
            </PageTransition>
          }
          path="/login"
        />
        <Route
          element={
            <PageTransition isLoading={isLoading}>
              <Register />
            </PageTransition>
          }
          path="/register"
        />
        <Route
          element={
            <PageTransition isLoading={isLoading}>
              <NotFound />
            </PageTransition>
          }
          path="*"
        />
      </Routes>
      <ToastContainer />
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
