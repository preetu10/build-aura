import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure=axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate=useNavigate();
    const {logout}=useAuth();
    axiosSecure.interceptors.request.use(function(config){
        const token=localStorage.getItem('access_token');
        //console.log("Request stopped by interceptors",token);
        config.headers.authorization=`Bearer ${token}`;
        return config;
    },async function(error){
        const status=error.response.status;
        console.log("status error",error,status);
        if(status===401||status===403){
            await logout();
            navigate("/");
        }
        return Promise.reject(error);
    })
    // interceptors for 401 and 403
     axiosSecure.interceptors.response.use(function(response){
        return response
     },async(error)=>{
        const status=error.response.status;
        console.log("status error",error,status);
        if(status===401||status===403){
            await logout();
            navigate("/");
        }
        return Promise.reject(error);
     });
       return axiosSecure;
};

export default useAxiosSecure;