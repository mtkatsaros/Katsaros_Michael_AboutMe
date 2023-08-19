import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import './index.css'
import CreateProject from './routes/CreateProject.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/projects/create",
    element: <CreateProject/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
