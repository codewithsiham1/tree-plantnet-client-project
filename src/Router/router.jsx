import { createBrowserRouter } from "react-router-dom";
import Mainlayouts from "../Layouts/Mainlayouts/Mainlayouts";
import Home from "../Components/Home/Home";
import Signup from "../Auth/Signup/Signup";
import Login from "../Auth/Login/Login";


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
        path:"/signup",
        element:<Signup></Signup>
    },
    {
        path:"/login",
        element:<Login></Login>
    }
   ]
 
    }
])
export default router;