import {Link, useLocation} from "react-router-dom";
import {Nav, Navbar, Image} from "react-bootstrap";
import { Home, SsidChart, QueryStats, DriveFolderUpload, Help } from "@mui/icons-material";


function SidebarList(){

    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    const link_color = ''

    let list_event = ''

    const location = useLocation()

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
        case '/subir-wrfout':
            list_event = '4'
            break  
        case '/ayuda':
            list_event = '5'
            break        
    }

    return(
        <>
            <Navbar className="w-100">
                <Nav variant='pills' activeKey={list_event} className="flex-column w-100">
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
                    <Link className='text-decoration-none' to='subir-wrfout'>
                        <Nav.Link href='subir-wrfout' eventKey='4' className={link_color}>
                            <DriveFolderUpload className='me-2' />
                                Subir WRFout 
                        </Nav.Link>
                    </Link>
                    <hr/>
                    <Link className='text-decoration-none' to='ayuda'>
                        <Nav.Link href='ayuda' eventKey='5' className={link_color}>
                            <Help className='me-2' />
                                Ayuda 
                        </Nav.Link>
                    </Link>                    
                </Nav>
            </Navbar>
        </>
    )
}

export default SidebarList