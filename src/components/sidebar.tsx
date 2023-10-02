import React from "react";
import SidebarList from "./sidebar_list";
import SidebarDropdown from "./sidebar_dropdown";
import {Link} from "react-router-dom";
import Switch from "./switch";



function Sidebar(){
    return(
        <>
            <div className='col-2 col-lg-2 col-md-4 col-sm-4 fixed-bottom' style={{height:'100vh'}} data-bs-theme='dark'>
                <div className="sticky-top shadow-lg" style={{minHeight:'100vh'}}>
                    <Link to="/" className="text-center text-decoration-none">
                        <svg className="bi me-2" width="40" height="32"></svg>
                        <h2 className="fs-4">CFA - WFRout</h2>
                    </Link>
                    <hr/>
                    <SidebarList/>
                    <div className='d-flex justify-content-start ps-4'>
                        <Switch/>
                    </div>
                    <hr/>
                    <SidebarDropdown/>
                </div>
            </div>
        </>
    )
}

export default Sidebar