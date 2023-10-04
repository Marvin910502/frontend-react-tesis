import React from "react";
import SidebarList from "./sidebar_list";
import SidebarDropdown from "./sidebar_dropdown";
import {Link} from "react-router-dom";
import Switch from "./switch";
import {Col, Navbar, NavbarBrand, Row} from "react-bootstrap";



function Sidebar(){

    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    const link_color = theme === 'dark' ? 'link-light' : 'link-dark'

    return(
        <>
          <Navbar className='fixed-top'>
            <div className='flex-column p-3 shadow-lg ms-2 ps-4 pe-4' style={{height:'100vh'}}>
                <div>
                    <Link to="/" className={"text-center text-decoration-none " + link_color}>
                        <NavbarBrand>
                            <svg className="bi me-2" width="40" height="32"></svg>
                            <h2 className="fs-4">CFA - WFRout</h2>
                        </NavbarBrand>
                    </Link>
                    <hr/>
                    <div className='p-1'>
                        <SidebarList/>
                    </div>
                    <div style={{position:"absolute", bottom:'5vh'}} className='pe-0'>
                        <div className='d-flex justify-content-start ps-2'>
                            <Switch/>
                        </div>
                        <hr/>
                        <SidebarDropdown/>
                    </div>
                </div>
            </div>
          </Navbar>
        </>
    )
}

export default Sidebar