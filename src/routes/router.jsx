import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Error from "../Error";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile";
import Announcements from "../pages/Dashboard/Announcements";
import PrivateRoutes from "./PrivateRoute";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement";
import ManageMembers from "../pages/Dashboard/ManageMembers";
import ManageCoupons from "../pages/Dashboard/ManageCoupons";

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
  {
    path:"/dashboard",
    element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    errorElement:<Error></Error>,
    children:[
      // user,admin and member common private routes
        {
          path:"/dashboard/my-profile",
          element:<PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
       },
       {
        path:"/dashboard/announcements",
        element:<PrivateRoutes><Announcements></Announcements></PrivateRoutes>
       },
      //  admin routes
       {
        path:"/dashboard/make-announcements",
        element:<PrivateRoutes><MakeAnnouncement></MakeAnnouncement></PrivateRoutes>
       },
       {
        path:"/dashboard/manage-members",
        element:<PrivateRoutes><ManageMembers></ManageMembers></PrivateRoutes>
       },
       {
        path:"/dashboard/manage-coupon",
        element:<PrivateRoutes><ManageCoupons></ManageCoupons></PrivateRoutes>

       }
      ]
    }
  ]
);

export default router;
