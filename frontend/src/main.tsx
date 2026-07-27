// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { MobileProvider } from './context/MobileContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MobileProvider>
      <RouterProvider router={router} />
    </MobileProvider>
  </React.StrictMode>
);