import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { routes } from './routes.jsx'
import './index.css' ;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RouterProvider router ={routes} />
    </BrowserRouter>
  </StrictMode>,
)