import React from "react";
import SidebarList from "./sidebar_list";
import SidebarDropdown from "./sidebar_dropdown";
import {maxHeaderSize} from "http";


function Sidebar(){
    return(
        <>
            <div className='col-2 col-lg-2 col-md-4 col-sm-4 fixed-bottom' style={{height:'100vh'}}>
                <div className="sticky-top shadow-lg" style={{minHeight:'100vh'}}>
                    <a href="/" className="align-items-center mt-5 mb-md-0 me-md-auto link-light text-decoration-none">
                        <svg className="bi me-2" width="40" height="32"></svg>
                        <span className="fs-4">CFA - WFRout</span>
                    </a>
                    <hr/>
                    <SidebarList/>
                    <hr/>
                    <SidebarDropdown/>
                </div>
            </div>
        </>
    )
}

export default Sidebar