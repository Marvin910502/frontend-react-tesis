import {useContext, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Diagnostics from "../pages/diagnostics";
import Login from "../pages/login";
import Register from "../pages/register";
import Logout from "../pages/logout";
import { UserContext } from "../context/context_provider";
import MyDiagnostics from "../pages/my_diagnostics";
import UploadWrfout from "../pages/upload_wrfout";
import MyProfile from "../pages/my_profile";
import Help from "../pages/help";



const Router = () => {

    const user = useContext(UserContext)
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'))

    const updateAuthentication = (is:boolean) => {
        setIsAuthenticated(is)
    }

    return(
        <>
            <Routes>
                <Route path='/' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <Dashboard/>} />
                <Route path='/diagnosticos' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <Diagnostics/>} />
                <Route path='/mis-diagnosticos' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <MyDiagnostics/> }/>
                <Route path='/subir-wrfout' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <UploadWrfout/> }/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/mi-perfil' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <MyProfile/> }/>
                <Route path='/ayuda' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/>: <Help/> }/>
            </Routes>
        </>
    )
}


export default Router