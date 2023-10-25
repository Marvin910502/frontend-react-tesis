import {Link, useLocation} from "react-router-dom";
import {Nav, Navbar, Image} from "react-bootstrap";


function SidebarList(){

    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    const link_color = theme === 'dark' ? 'link-light' : 'link-dark'

    let list_event = ''

    const location = useLocation()

    switch (location.pathname){
        case '/':
            list_event = '1'
            break
        case '/mapas-2d':
            list_event = '2'
            break
        case '/mis-mapas':
            list_event = '3'
            break
        case '/subir-wrfout':
            list_event = '4'
            break        
    }

    return(
        <>
            <Navbar className="w-100">
                <Nav variant='pills' activeKey={list_event} className="flex-column w-100">
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
                    <Link className='text-decoration-none' to='mis-mapas'>
                        <Nav.Link href='mis-mapas' eventKey='3' className={link_color}>
                        <Image src={process.env.PUBLIC_URL+"/images/theme/left_menu_icons/my_maps.svg"} className="me-2" style={{maxWidth:'15%'}}/>
                                Mis Mapas
                        </Nav.Link>
                    </Link>
                    <Link className='text-decoration-none' to='subir-wrfout'>
                        <Nav.Link href='subir-wrfout' eventKey='4' className={link_color}>
                        <Image src={process.env.PUBLIC_URL+"/images/theme/left_menu_icons/files_upload.svg"} className="me-2" style={{maxWidth:'15%'}}/>
                                Subir WRFout 
                        </Nav.Link>
                    </Link>
                    <hr/>
                </Nav>
            </Navbar>
        </>
    )
}

export default SidebarList