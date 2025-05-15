//import * as React from "react";
import { StrictMode } from 'react'
import * as ReactDOM from "react-dom/client";
//import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import tripRoutes from './routes/tripRoutes';
import ErrorPage from './error-page.jsx';
import TripList from './components/TripList.jsx'
import Root from './components/Root.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      ...tripRoutes
    ]
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
  