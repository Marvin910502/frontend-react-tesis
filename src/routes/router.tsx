import React from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Maps2d from "../pages/maps_2d";
import Maps3d from "../pages/maps_3d";
import VerticalCut from "../pages/vertical_cut";
import VerticalCut3d from "../pages/vertical_cut_3d";


function Router(){
    return(
        <>
            <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/mapas-2d' element={<Maps2d/>} />
                <Route path='/mapas-3d' element={<Maps3d/>} />
                <Route path='/corte-vertical' element={<VerticalCut/>} />
                <Route path='/corte-vertical-3d' element={<VerticalCut3d/>} />
            </Routes>
        </>
    )
}


export default Router