import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Nav, Navbar, Container, Image} from "react-bootstrap";


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
            <Navbar>
                <Nav variant='pills' activeKey={list_event} className="flex-column">
                    <Link className='text-decoration-none' to='/'>
                        <Nav.Link href='/' eventKey='1' className={link_color}>
                        <Image src={process.env.PUBLIC_URL+"/images/theme/left_menu_icons/home.svg"} className="me-2" style={{maxWidth:'15%'}}/>
                                Inicio
                        </Nav.Link>
                    </Link>
                    <Link className='text-decoration-none' to='mapas-2d'>
                        <Nav.Link href='mapas-2d' eventKey='2' className={link_color}>
                        <Image src={process.env.PUBLIC_URL+"/images/theme/left_menu_icons/2d_maps.svg"} className="me-2" style={{maxWidth:'15%'}}/>
                                Mapas 2D
                        </Nav.Link>
                    </Link>
                    <Link className='text-decoration-none' to='mapas-3d'>
                        <Nav.Link id={'element_3'} href='mapas-3d' eventKey='3' className={link_color}>
                        <Image src={process.env.PUBLIC_URL+"/images/theme/left_menu_icons/3d_maps.svg"} className="me-2" style={{maxWidth:'15%'}}/>
                                Mapas 3D
                        </Nav.Link>
                    </Link>
                    <Link className='text-decoration-none' to='corte-vertical'>
                        <Nav.Link href='corte-vertical' eventKey='4' className={link_color}>
                        <Image src={process.env.PUBLIC_URL+"/images/theme/left_menu_icons/vertical_cut.svg"} className="me-2" style={{maxWidth:'15%'}}/>
                                Cortes Verticales
                        </Nav.Link>
                    </Link>
                    <Link className='text-decoration-none' to='corte-vertical-3d'>
                        <Nav.Link href='corte-vertical-3d' eventKey='5' className={link_color}>
                        <Image src={process.env.PUBLIC_URL+"/images/theme/left_menu_icons/vertical_cut_3d.svg"} className="me-2" style={{maxWidth:'15%'}}/>
                                Cortes Veticales 3D
                        </Nav.Link>
                    </Link>
                </Nav>
            </Navbar>
        </>
    )
}

export default SidebarList