import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { SM1, SM2, BM1, BM2, TR1 } from './routes/rooms';

import Root from './routes/root';

import Index from './routes/index';

import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'sm1',
        element: <SM1 />,
      },
      {
        path: 'sm2',
        element: <SM2 />,
      },
      {
        path: 'bm1',
        element: <BM1 />,
      },
      {
        path: 'bm2',
        element: <BM2 />,
      },
      {
        path: 'tr1',
        element: <TR1 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
