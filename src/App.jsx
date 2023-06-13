import { useState } from 'react'
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route, RouterProvider
} from "react-router-dom";
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Message from './pages/message/Message';
import RootLayout from './pages/rootlayout/RootLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={<Registration />}
        ></Route>
        <Route
          path="/login"
          element={<Login />}
        ></Route>
        <Route
          path='/bokbok'
          element={<RootLayout />}>
          <Route
            path="home"
            element={<Home />}
          ></Route>
          <Route
            path="message"
            element={<Message />}
          ></Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
