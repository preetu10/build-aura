import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  RouterProvider
} from "react-router-dom";
import router from './routes/router';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

const queryClient=new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
   <AuthProvider>
   <HelmetProvider>
    <RouterProvider router={router} />
    </HelmetProvider>
   </AuthProvider>
   </QueryClientProvider>
  </React.StrictMode>,
  
)
