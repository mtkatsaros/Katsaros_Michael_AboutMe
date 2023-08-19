import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import './index.css'
import EditProject from './routes/EditProject.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ViewProjects from './routes/ViewProjects.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/projects",
    element: <ViewProjects/>
  },
  {
    path: "/projects/edit",
    element: <EditProject/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
