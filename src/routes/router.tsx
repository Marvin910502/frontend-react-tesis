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
import MyMaps from "../pages/my_maps";
import MyGraphics from "../pages/my_graphics";


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
                <Route path='/mapas-2d' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <Maps2d/>} />
                <Route path='/mapas-3d' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <Maps3d/>} />
                <Route path='/corte-vertical' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <VerticalCut/>} />
                <Route path='/corte-vertical-3d' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <VerticalCut3d/>} />
                <Route path='/mis-mapas' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <MyMaps/> }/>
                <Route path='/mis-graficas' element={ !user.user.isAuthenticated ? <Navigate to={'/login'}/> : <MyGraphics/> }/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </>
    )
}


export default Router