import React, { useContext } from "react";
import {Navbar, Container, Nav } from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import Switch from "./switch";
import SidebarDropdown from "./sidebar_dropdown";
import { Home, SsidChart, QueryStats, DriveFolderUpload, Help } from "@mui/icons-material";
import { UserContext } from "../context/context_provider";

function NavbarMini(){

    const user = useContext(UserContext)

    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    const link_color = theme === 'dark' ? 'link-light' : 'link-dark'

    const location = useLocation()

    let list_event = ''

    switch (location.pathname){
        case '/':
            list_event = '1'
            break
        case '/diagnosticos':
            list_event = '2'
            break
        case '/mis-diagnosticos':
            list_event = '3'
            break
        case '/maximos-minimos':
            list_event = '4'
            break             
        case '/subir-wrfout':
            list_event = '5'
            break      
        case '/ayuda':
            list_event = '6'
            break        
    }

    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary sticky-top shadow-lg">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to={'/'} className={'text-decoration-none ' + link_color}>
                            CFA - WRFout
                        </Link>
                    </Navbar.Brand>
                    <Switch/>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <hr/>
                        <Nav
                            variant='pills'
                            activeKey={list_event}
                            className="nav-pills me-auto my-2 my-lg-0"
                            style={{ maxHeight: '200px' }}
                            navbarScroll
                        >
                            <Link className='text-decoration-none' to='/'>
                                <Nav.Link href='/' eventKey='1' className={link_color}>
                                <Home className='me-2' />
                                        Inicio
                                </Nav.Link>
                            </Link>
                            <Link className='text-decoration-none' to='diagnosticos'>
                                <Nav.Link href='diagnosticos' eventKey='2' className={link_color}>
                                    <SsidChart className='me-2' />
                                        Diágnosticos
                                </Nav.Link>
                            </Link>
                            <Link className='text-decoration-none' to='mis-diagnosticos'>
                                <Nav.Link href='mis-diagnosticos' eventKey='3' className={link_color}>
                                    <QueryStats className='me-2' />
                                        Mis Diagnósticos
                                </Nav.Link>
                            </Link>
                            <Link className='text-decoration-none' to='maximos-minimos'>
                                <Nav.Link href='maximos-minimos' eventKey='4' className={link_color}>
                                    <SsidChart className='me-2' />
                                        Máximos y Mínimos
                                </Nav.Link>
                            </Link>
                            {   user.user.isManager ?
                                <Link className='text-decoration-none' to='subir-wrfout'>
                                <Nav.Link href='subir-wrfout' eventKey='5' className={link_color}>
                                    <DriveFolderUpload className='me-2' />
                                        Subir WRFout 
                                </Nav.Link>
                                </Link>
                                :
                                <></>
                            }
                            <hr/>
                            <Link className='text-decoration-none' to='ayuda'>
                                <Nav.Link href='ayuda' eventKey='6' className={link_color}>
                                    <Help className='me-2' />
                                        Ayuda 
                                </Nav.Link>
                            </Link>  
                        </Nav>
                        <hr/>
                        <SidebarDropdown/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarMini