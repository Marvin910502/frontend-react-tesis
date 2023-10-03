import React from "react";
import SidebarList from "./sidebar_list";
import SidebarDropdown from "./sidebar_dropdown";
import {Link} from "react-router-dom";
import Switch from "./switch";
import {Col, Row} from "react-bootstrap";



function Sidebar(){

    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    const link_color = theme === 'dark' ? 'link-light' : 'link-dark'

    return(
        <>
            <Row>
            <Col lg={2} md={4} sm={4} className='sticky-top position-fixed' style={{height:'100vh'}} data-bs-theme='dark'>
                <div className="sticky-top shadow-lg" style={{minHeight:'100vh'}}>
                    <Link to="/" className={"text-center text-decoration-none " + link_color}>
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
            </Col>
            </Row>
        </>
    )
}

export default Sidebar