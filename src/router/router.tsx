import { BrowserRouter, Route, Routes } from 'react-router';

import { Home, Preview } from '../pages/index.tsx';
import { NotFound } from '../pages/notFound/NotFound.tsx';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Preview />} path="/preview" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
