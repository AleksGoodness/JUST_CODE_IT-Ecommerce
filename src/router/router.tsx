import { BrowserRouter, Route, Routes } from 'react-router';

import { Home, Login, NotFound, Preview, Register } from '../pages/index.tsx';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Preview />} path="/preview" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
