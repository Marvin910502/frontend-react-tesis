import React from "react";


function SidebarList(){
    return(
        <>
            <ul className="nav nav-pills flex-column mb-auto" style={{minHeight:'80vh'}}>
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Orders
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Customers
                    </a>
                </li>
            </ul>
        </>
    )
}

export default SidebarList