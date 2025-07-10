import axios from 'axios';
import { useEffect } from 'react';
import Useauth from '../Useauth';
import { useNavigate } from 'react-router-dom';

export const axiosSecure=axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true,
})
const useAxiosSecure = () => {
    const navigate=useNavigate()
    const {logout}=Useauth()
    useEffect(()=>{
        axiosSecure.interceptors.response.use(
            res=>{
                return res
            },async error=>{
                console.log('Error caught from axios interceptor-->', error.response)
                if(error.response.status===401 ||error.response.status===403){
                    // logout
                    logout()
                    // navigate to login
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )
    },[logout,navigate])
    return axiosSecure
};

export default useAxiosSecure;