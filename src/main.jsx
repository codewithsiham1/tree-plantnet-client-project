import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './Router/router.jsx'

import { HelmetProvider } from 'react-helmet-async'
import Authprovider from './Provider/Authprovider.jsx'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Authprovider>
       <HelmetProvider>
     <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
     </QueryClientProvider>
       <ToastContainer  position='top-right' reverseOrder={false}/>
    </HelmetProvider>
  </Authprovider>
  </StrictMode>,
)
