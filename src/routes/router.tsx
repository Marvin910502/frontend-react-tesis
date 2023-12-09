import {useContext} from "react";
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
import Page404 from "../pages/page_404";
import MaxMin from "../pages/max_min";



const Router = () => {

    const user = useContext(UserContext)


    return(
        <>
            <Routes>
                <Route path='/' element={ !user.user.isAuthenticated ? <Navigate to={'/logout'}/> : <Dashboard/>} />
                <Route path='/diagnosticos' element={ !user.user.isAuthenticated ? <Navigate to={'/logout'}/> : <Diagnostics/>} />
                <Route path='/mis-diagnosticos' element={ !user.user.isAuthenticated ? <Navigate to={'/logout'}/> : <MyDiagnostics/> }/>
                <Route path='/subir-wrfout' element={ (!user.user.isAuthenticated || !user.user.isManager) ? <Navigate to={'/logout'}/> : <UploadWrfout/> }/>
                <Route path='/maximos-minimos' element={ !user.user.isAuthenticated ? <Navigate to={'/logout'}/> : <MaxMin/>}/>
                <Route path='/login' element={ user.user.isAuthenticated ? <Navigate to={'/'}/> : <Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/register' element={ user.user.isAuthenticated ? <Navigate to={'/'}/> : <Register/>}/>
                <Route path='/mi-perfil' element={ !user.user.isAuthenticated ? <Navigate to={'/logout'}/> : <MyProfile/> }/>
                <Route path='/ayuda' element={ !user.user.isAuthenticated ? <Navigate to={'/logout'}/>: <Help/> }/>
                <Route path='*' element={<Page404/>}/>
            </Routes>
        </>
    )
}


export default Router