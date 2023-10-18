import React, {useContext, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Maps2d from "../pages/maps_2d";
import Maps3d from "../pages/maps_3d";
import VerticalCut from "../pages/vertical_cut";
import VerticalCut3d from "../pages/vertical_cut_3d";
import Login from "../pages/login";
import Register from "../pages/register";
import Logout from "../pages/logout";
import { UserContext } from "../context/context_provider";


const Router = () => {

    const user = useContext(UserContext)
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'))

    const updateAuthentication = (is:boolean) => {
        setIsAuthenticated(is)
    }

    return(
        <>
            <Routes>
                <Route key={'1'} path='/' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <Dashboard/>} />
                <Route key={'2'} path='/mapas-2d' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <Maps2d/>} />
                <Route key={'3'} path='/mapas-3d' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <Maps3d/>} />
                <Route key={'4'} path='/corte-vertical' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <VerticalCut/>} />
                <Route key={'5'} path='/corte-vertical-3d' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <VerticalCut3d/>} />
                <Route key={'6'} path='/login' element={<Login/>}/>
                <Route key={'7'} path='/logout' element={<Logout/>}/>
                <Route key={'8'} path='/register' element={<Register/>}/>
            </Routes>
        </>
    )
}


export default Router