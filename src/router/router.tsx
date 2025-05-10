import { BrowserRouter, Link, Route, Routes } from 'react-router';

import { Home, Preview } from '../pages/index.tsx';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Preview />} path="/preview" />
        <Route
          element={
            <div>
              page not found <Link to="/">home</Link>
            </div>
          }
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
};
