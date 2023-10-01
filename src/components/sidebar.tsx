import React from "react";
import SidebarList from "./sidebar_list";
import SidebarDropdown from "./sidebar_dropdown";


function Sidebar(){
    return(
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"></svg>
                    <span className="fs-4">CFA - WFRout</span>
                </a>
                <hr/>
                <SidebarList/>
                <hr/>
                <SidebarDropdown/>
            </div>
        </>
    )
}

export default Sidebar