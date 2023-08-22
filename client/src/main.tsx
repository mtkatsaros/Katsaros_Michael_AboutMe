import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import './index.css'
import EditProject from './routes/projects/EditProject.tsx'
import ViewProjects from './routes/projects/ViewProjects.tsx'
import WriteReview from './routes/reviews/WriteReview.tsx'
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
    path: "/projects",
    element: <ViewProjects/>
  },
  {
    path: "/projects/edit",
    element: <EditProject/>
  },
  {
    path: "/reviews/write",
    element: <WriteReview/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
