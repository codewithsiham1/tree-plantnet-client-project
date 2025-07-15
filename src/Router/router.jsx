import { createBrowserRouter } from "react-router-dom";
import Mainlayouts from "../Layouts/Mainlayouts/Mainlayouts";
import Home from "../Components/Home/Home";
import Signup from "../Auth/Signup/Signup";
import Login from "../Auth/Login/Login";
import PlantDetails from "../Pages/PlantDetails/PlantDetails";
import Dashboardlayouts from "../Layouts/Dashboardlayouts/Dashboardlayouts";

import AddPlantForm from "../Components/Dashboard/AddPlantForm";
import MyInventory from "../Components/Dashboard/MyInventory";
import ManageUsers from "../Components/Dashboard/ManageUsers";
import Profile from "../Components/Dashboard/Profile";
import MyOrders from "../Components/Dashboard/MyOrders";
import ManageOrders from "../Components/Dashboard/ManageOrders";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import Statictics from "../Components/Dashboard/Statictics";
import ContactUs from "../Pages/ContactUs/ContactUs";
import ContactMessage from "../Pages/ContactMessage/ContactMessage";
import Allplants from "../Pages/Allplants/Allplants";
import AboutUs from "../Pages/AboutUs/AboutUs";


const router=createBrowserRouter([
    {
   path:'/',
   element:<Mainlayouts></Mainlayouts>,
   children:[
    {
        path:"/",
        element:<Home></Home>
    },
    {
 path:"/plant/:id",
 element:<PlantDetails></PlantDetails>
    },
    {
        path:"/signup",
        element:<Signup></Signup>
    },
    {
        path:"/login",
        element:<Login></Login>
    },
    {
        path:'/contact',
        element:<ContactUs></ContactUs>
    },
    {
        path:'all-plant',
        element:<Allplants></Allplants>
    },
    {
        path:"about",
        element:<AboutUs></AboutUs>
    }
  
   ]
 
    },
    {
     path:"/dashboard",
     element:<PrivateRoute>
        <Dashboardlayouts></Dashboardlayouts>
     </PrivateRoute>,
     children:[
        {
            index:true,
            element:<PrivateRoute>
                <AdminRoute>
                <Statictics></Statictics>
                </AdminRoute>
            </PrivateRoute>
        },
        {
            path:"add-plant",
            element:<PrivateRoute>
                <SellerRoute>
                <AddPlantForm></AddPlantForm>
                </SellerRoute>
            </PrivateRoute>
        },
        {
            path:'my-inventory',
            element:<PrivateRoute>
                <SellerRoute>
                    <MyInventory></MyInventory>
                </SellerRoute>
            </PrivateRoute>
        },
        {
            path:'manage-users',
            element:<PrivateRoute>
                <AdminRoute>
                <ManageUsers></ManageUsers>
                </AdminRoute>
            </PrivateRoute>
        },
        {
            path:'profile',
            element:<PrivateRoute>
                <Profile></Profile>
            </PrivateRoute>
        },
        {
            path:'my-orders',
            element:<PrivateRoute>
                <MyOrders></MyOrders>
            </PrivateRoute>
        },
        {
            path:'manage-orders',
            element:<PrivateRoute>
               <SellerRoute>
                 <ManageOrders></ManageOrders>
               </SellerRoute>
            </PrivateRoute>
        },
        {
            path:'contact-message',
            element:<PrivateRoute>
                <AdminRoute>
                    <ContactMessage></ContactMessage>
                </AdminRoute>
            </PrivateRoute>
        }
     ]
    }
])
export default router;