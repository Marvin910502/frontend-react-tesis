import {useContext} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/context_provider";
import { userInteface } from "../context/context_provider";


const Logout = () => {

    const navigate = useNavigate()
    const user = useContext(UserContext)

    const logoutNow = () => {
        Cookies.set('access-token', '')
        Cookies.set('refresh-token', '')
        localStorage.removeItem('userData')
        const userData:userInteface = {username:'Anónimo', 
                                       isAuthenticated:false, 
                                       name:'', 
                                       last_names:'', 
                                       department:'', 
                                       isAdmin:false, 
                                       isGuess:false, 
                                       isManager:false
                                    }
        user.setUser(userData)
        return navigate('/login')
    }

    return (
        <>
            {logoutNow()}
        </>
    )
}

export default Logout