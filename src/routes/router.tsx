import {useContext, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Diagnostics from "../pages/diagnostics";
import Login from "../pages/login";
import Register from "../pages/register";
import Logout from "../pages/logout";
import { UserContext } from "../context/context_provider";
import MyMaps from "../pages/my_maps";
import UploadWrfout from "../pages/upload_wrfout";
import MyProfile from "../pages/my_profile";



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
                <Route path='/mapas-2d' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <Diagnostics/>} />
                <Route path='/mis-mapas' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <MyMaps/> }/>
                <Route path='/subir-wrfout' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <UploadWrfout/> }/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/mi-perfil' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <MyProfile/> }/>
            </Routes>
        </>
    )
}


export default Router