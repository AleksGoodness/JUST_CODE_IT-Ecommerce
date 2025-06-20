// import { configureStore } from '@reduxjs/toolkit';
// import type { RenderOptions } from '@testing-library/react';
// import { render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

// function renderWithProviders(
//   ui: React.ReactElement,
//   {
//     preloadedState = {},
//     store = configureStore({
//       reducer: {
//         auth: authSlice,
//         theme: themeSlice,
//       },
//       preloadedState,
//     }),
//     ...renderOptions
//   }: {
//     preloadedState?: Record<string, unknown>;
//   } & RenderOptions = {},
// ) {
//   const Wrapper = ({ children }: { children: React.ReactNode }) => {
//     return (
//       <MemoryRouter>
//         <Provider store={store}>{children}</Provider>
//       </MemoryRouter>
//     );
//   };

//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
// }

// export { renderWithProviders, Wrapper };
