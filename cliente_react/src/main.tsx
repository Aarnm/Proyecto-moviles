import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import { RouterProvider } from 'react-router-dom'
//Imports para css
import '/src/assets/vendor/css/core.css';
import '/src/assets/css/demo.css';
import '/src/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '/src/assets/vendor/fonts/iconify-icons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
