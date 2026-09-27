import { useContext,useState,useEffect } from "react";
import { createContext } from "react"
import axios from "axios";
import { PORT } from "../utils/constand";
const authContext = createContext(null)
export const AuthProvider = ({children})=>{
    const [isAdmin, setisAdmin] = useState(false) 
    const [isLoggedIn, setIsLoggedIn] = useState(
        ()=>{
            try {
               const saveLoginStatus = localStorage.getItem("LoginStatus")
                return saveLoginStatus ? saveLoginStatus : false;
            } catch (error) {
                 console.error("Error reading from localStorage", error);
                 return false;
            }
        }
    )
    useEffect(() => {
      localStorage.setItem("LoginStatus", isLoggedIn);
    }, [isLoggedIn]);
    // useEffect(
    //     ()=>{
    //     const checkAuth = async ()=>{
    //         try {
    //         const res = await axios.get(`${PORT}/auth/checkuser`,{ withCredentials : true})
    //         // console.log(res.data);
    //         console.log(res);
            
    //         if(res.status === 201 || res.status === 200){
    //             setIsLoggedIn(true)
    //             console.log('login :' ,isLoggedIn);
                
    //         }
    //     } catch (error) {
    //         setIsLoggedIn(false)
    //         // console.log(error)
    //         console.log("Unauthorize")
    //     }
    //     }
    //     checkAuth()
    // }
    // ,[])
    return (
        <authContext.Provider value ={{isLoggedIn,setIsLoggedIn,isAdmin,setisAdmin}} >{children}</authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}