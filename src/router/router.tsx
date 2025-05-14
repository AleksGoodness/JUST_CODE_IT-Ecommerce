import { BrowserRouter, Route, Routes, useLocation } from 'react-router';

import { Header, NotFound } from '../components/index.ts';
import { Home, Preview } from '../pages/index.tsx';
import CONSTANTS from '../utils/CONSTANTS.ts';

const AppRoutes = () => {
  const location = useLocation();
  const isKnownRoute = [CONSTANTS.home, CONSTANTS.preview].includes(
    location.pathname,
  );
  return (
    <>
      {isKnownRoute ? <Header /> : null}
      <Routes>
        <Route element={<Home />} path={CONSTANTS.home} />
        <Route element={<Preview />} path={CONSTANTS.preview} />
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
