import React, {useState} from "react";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Maps2d from "../pages/maps_2d";
import Maps3d from "../pages/maps_3d";
import VerticalCut from "../pages/vertical_cut";
import VerticalCut3d from "../pages/vertical_cut_3d";
import Login from "../pages/login";
import Register from "../pages/register";
import Cookies from "js-cookie";
import Logout from "../pages/logout";


const Router = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'))
    const navigate = useNavigate()

    const updateAuthentication = (is:boolean) => {
        setIsAuthenticated(is)
    }

    const logoutNow = () => {
        Cookies.set('access-token', '')
        Cookies.set('refresh-token', '')
        localStorage.removeItem('isAuthenticated')
        updateAuthentication(false)
        return navigate('/')
    }



    return(
        <>
            <Routes>
                <Route key={'1'} path='/' element={<Dashboard/>} />
                <Route key={'2'} path='/mapas-2d' element={<Maps2d/>} />
                <Route key={'3'} path='/mapas-3d' element={ !isAuthenticated ? <Navigate to={'/'}/> : <Maps3d/>} />
                <Route key={'4'} path='/corte-vertical' element={<VerticalCut/>} />
                <Route key={'5'} path='/corte-vertical-3d' element={<VerticalCut3d/>} />
                <Route key={'6'} path='/login' element={<Login updateAuthentication={updateAuthentication}/>}/>
                <Route key={'7'} path='/logout' element={<Logout logoutNow={logoutNow}/>}/>
                <Route key={'8'} path='/register' element={<Register/>}/>
            </Routes>
        </>
    )
}


export default Router