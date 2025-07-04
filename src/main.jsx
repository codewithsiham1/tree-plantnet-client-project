import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './Router/router.jsx'

import { HelmetProvider } from 'react-helmet-async'
import Authprovider from './Provider/Authprovider.jsx'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Authprovider>
       <HelmetProvider>
      <RouterProvider router={router}></RouterProvider>
       <ToastContainer  position='top-right' reverseOrder={false}/>
    </HelmetProvider>
  </Authprovider>
  </StrictMode>,
)
