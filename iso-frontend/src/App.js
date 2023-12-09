import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Document from "./components/Document";
import Category from "./components/Category";
import Deparment from "./components/Deparment";
import User from "./components/User";
import SignIn from "./components/SignIn";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home active="Home" />
    },
    {
      path: '/documents/new',
      element: <Home active="Document"/>
    },
    {
      path: '/categories',
      element: <Home active="Category" />
    },
    {
      path: '/departments',
      element: <Home active="Department" />
    },
    {
      path: '/sign_up',
      element: <Home active="User" />
    },
    {
      path: '/sign_in',
      element: <Home active="SignIn" />
    }
  ]);

  return (
    <RouterProvider router = {router} />
  );
}

export default App;
