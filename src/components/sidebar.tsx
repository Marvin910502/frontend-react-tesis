import React from "react";
import SidebarList from "./sidebar_list";
import SidebarDropdown from "./sidebar_dropdown";
import {Link} from "react-router-dom";
import Switch from "./switch";
import {Col, Navbar, NavbarBrand, Image} from "react-bootstrap";



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
                            <h2 className="fs-4 mt-3 mb-0"><Image src={process.env.PUBLIC_URL+"WRFout.svg"} className="me-2" style={{maxWidth:'15%'}}/>CFA - WFRout</h2>
                        </NavbarBrand>
                    </Link>
                    <hr className="mt-0"/>
                    <div className='p-1'>
                        { localStorage.getItem('isAuthenticated') && <SidebarList/>}
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