import { useQuery } from "@tanstack/react-query";
import Useauth from "../Useauth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const Userole = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=Useauth()
    const {data:role,isLoading}=useQuery({
        queryKey:['role',user?.email],
         enabled: !!user?.email,
        queryFn:async()=>{
            const {data}=await axiosSecure.get(`/user/role/${user?.email}`)
            return data
        }
    })
    return [role,isLoading]
};

export default Userole;