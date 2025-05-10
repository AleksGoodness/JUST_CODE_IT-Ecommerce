import { BrowserRouter, Link, Route, Routes } from 'react-router';

import { Login } from '../pages/login/Login';
import { Register } from '../pages/register/Register.tsx';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <div>
              page not found <Link to="/">home</Link>
            </div>
          }
          path="*"
        />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
};
