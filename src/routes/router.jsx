import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Error from "../Error";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Error></Error>,
    children: [
        {
            path: "/",
            element:<Home></Home>
        },
        {
            path:"/login",
            element:<LogIn></LogIn>
        },
        {
            path:"/register",
            element:<SignUp></SignUp>
        }
    ],
  },
]);

export default router;
