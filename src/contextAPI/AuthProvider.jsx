import { useState } from "react";
import Auth from "./Auth";


function AuthProvider({children}){
    const [isLoggedIn,setIsLoggedIn]  = useState(()=>{
        const token = localStorage.getItem('token')
        return token ? true : false
    })
    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
      };
    
      const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      };
    return(
        <Auth.Provider value={{isLoggedIn,login,logout}}>
            {children}
        </Auth.Provider>
    )
}

export default AuthProvider