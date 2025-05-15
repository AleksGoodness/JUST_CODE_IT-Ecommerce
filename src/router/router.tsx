import { BrowserRouter, Route, Routes, useLocation } from 'react-router';

import { Header } from '../components/index.ts';
import { Home, Login, NotFound, Preview, Register } from '../pages/index.tsx';
import CONSTANTS from '../utils/CONSTANTS.ts';

const AppRoutes = () => {
  const location = useLocation();
  const isKnownRoute = [
    CONSTANTS.home,
    CONSTANTS.preview,
    CONSTANTS.login,
    CONSTANTS.register,
  ].includes(location.pathname);
  return (
    <>
      {isKnownRoute ? <Header /> : null}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Preview />} path="/preview" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<NotFound />} path="*" />
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
