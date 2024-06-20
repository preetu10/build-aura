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
import Apartments from "../pages/Apartments/Apartments";
import AdminRoute from "./AdminRoute";
import AgreementRequests from "../pages/Dashboard/AgreementRequests";

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
        },
        {
          path:"/apartments",
          element:<Apartments></Apartments>
        }
    ],
  },
  {
    path:"dashboard",
    element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    errorElement:<Error></Error>,
    children:[
      // user,admin and member common private routes
        {
          path:"my-profile",
          element:<MyProfile></MyProfile>
       },
       {
        path:"announcements",
        element:<Announcements></Announcements>
       },
      //  admin routes
       {
        path:"make-announcements",
        element:<AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
       },
       {
        path:"manage-members",
        element:<AdminRoute><ManageMembers></ManageMembers></AdminRoute>
       },
       {
        path:"manage-coupon",
        element:<AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>
       },
       {
        path:"agreement-requests",
        element:<AdminRoute><AgreementRequests></AgreementRequests></AdminRoute>
       }
      ]
    }
  ]
);

export default router;
