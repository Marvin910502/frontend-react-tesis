import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Nav, Navbar, Container} from "react-bootstrap";


function SidebarList(){

    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    const link_color = theme === 'dark' ? 'link-light' : 'link-dark'

    let list_event: string = ''

    const location = useLocation()

    switch (location.pathname){
        case '/':
            list_event = '1'
            break
        case '/mapas-2d':
            list_event = '2'
            break
        case '/mapas-3d':
            list_event = '3'
            break
        case '/corte-vertical':
            list_event = '4'
            break
        case '/corte-vertical-3d':
            list_event = '5'
            break
    }

    return(
        <>
            <Navbar expand="lg">
                <Container fluid>
                    <Nav variant='pills' activeKey={list_event} className="flex-column mb-auto" style={{minHeight:'70vh'}}>
                        <Link className='text-decoration-none' to='/'>
                            <Nav.Link href='/' eventKey='1' className={link_color}>
                                    Inicio
                            </Nav.Link>
                        </Link>
                        <Link className='text-decoration-none' to='mapas-2d'>
                            <Nav.Link href='mapas-2d' eventKey='2' className={link_color}>
                                    Mapas 2d
                            </Nav.Link>
                        </Link>
                        <Link className='text-decoration-none' to='mapas-3d'>
                            <Nav.Link id={'element_3'} href='mapas-3d' eventKey='3' className={link_color}>
                                    Mapas 3d
                            </Nav.Link>
                        </Link>
                        <Link className='text-decoration-none' to='corte-vertical'>
                            <Nav.Link href='corte-vertical' eventKey='4' className={link_color}>
                                    Cortes Verticales
                            </Nav.Link>
                        </Link>
                        <Link className='text-decoration-none' to='corte-vertical-3d'>
                            <Nav.Link href='corte-vertical-3d' eventKey='5' className={link_color}>
                                    Cortes Veticales 3d
                            </Nav.Link>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default SidebarList