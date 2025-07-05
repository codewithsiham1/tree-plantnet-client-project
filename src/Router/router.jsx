import { createBrowserRouter } from "react-router-dom";
import Mainlayouts from "../Layouts/Mainlayouts/Mainlayouts";
import Home from "../Components/Home/Home";
import Signup from "../Auth/Signup/Signup";
import Login from "../Auth/Login/Login";
import PlantDetails from "../Pages/PlantDetails/PlantDetails";
import Dashboardlayouts from "../Layouts/Dashboardlayouts/Dashboardlayouts";
import AdminStatistics from "../Components/Dashboard/AdminStatistics";
import AddPlantForm from "../Components/Dashboard/AddPlantForm";
import MyInventory from "../Components/Dashboard/MyInventory";
import ManageUsers from "../Components/Dashboard/ManageUsers";
import Profile from "../Components/Dashboard/Profile";
import MyOrders from "../Components/Dashboard/MyOrders";
import ManageOrders from "../Components/Dashboard/ManageOrders";


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
    }
   ]
 
    },
    {
     path:"/dashboard",
     element:<Dashboardlayouts></Dashboardlayouts>,
     children:[
        {
            index:true,
            element:<AdminStatistics></AdminStatistics>
        },
        {
            path:"add-plant",
            element:<AddPlantForm></AddPlantForm>
        },
        {
            path:'my-inventory',
            element:<MyInventory></MyInventory>
        },
        {
            path:'manage-users',
            element:<ManageUsers></ManageUsers>
        },
        {
            path:'profile',
            element:<Profile></Profile>
        },
        {
            path:'my-orders',
            element:<MyOrders></MyOrders>
        },
        {
            path:'manage-orders',
            element:<ManageOrders></ManageOrders>
        }
     ]
    }
])
export default router;