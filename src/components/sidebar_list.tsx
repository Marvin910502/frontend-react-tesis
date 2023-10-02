import React from "react";
import {Link} from "react-router-dom";


function SidebarList(){
    return(
        <>
            <ul className="nav nav-pills flex-column mb-auto" style={{minHeight:'76vh'}}>
                <li className="nav-item">
                    <Link to="/" className='nav-link'>
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Orders
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Products
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Customers
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default SidebarList