import React from "react";
import SidebarList from "./sidebar_list";
import SidebarDropdown from "./sidebar_dropdown";
import {Link} from "react-router-dom";
import Switch from "./switch";
import {Col, Navbar, NavbarBrand} from "react-bootstrap";



function Sidebar(){

    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    const link_color = theme === 'dark' ? 'link-light' : 'link-dark'

    return(
        <>
          <Col  xl={2} lg={3} md={4} sm={4} xs={1} className='fixed-top'>
          <Navbar className='shadow-lg'>
            <div className='flex-lg-fill p-2 ms-2 w-100' style={{height:'100vh'}}>
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
          </Col>
        </>
    )
}

export default Sidebar