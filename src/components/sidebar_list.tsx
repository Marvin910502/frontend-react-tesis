import { useContext } from "react";
import {Link, useLocation} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import { UserContext } from "../context/context_provider";
import { Home, SsidChart, QueryStats, DriveFolderUpload, Help, Map } from "@mui/icons-material";


function SidebarList(){

    let theme: string | null = localStorage.getItem('themeMode')
    const user = useContext(UserContext)

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
            <Navbar className="w-100">
                <Nav variant='pills' activeKey={list_event} className="flex-column w-100">
                    <Link className='text-decoration-none' to='/'>
                        <Nav.Link href='/' eventKey='1' className={ list_event === '1' ? 'text-white' : link_color }>
                            <Home className='me-2' />
                                Inicio
                        </Nav.Link>
                    </Link>
                    <Link className='text-decoration-none' to='diagnosticos'>
                        <Nav.Link href='diagnosticos' eventKey='2' className={ list_event === '2' ? 'text-white' : link_color }>
                            <Map className='me-2' />
                                Diagnósticos
                        </Nav.Link>
                    </Link>
                    <Link className='text-decoration-none' to='mis-diagnosticos'>
                        <Nav.Link href='mis-diagnosticos' eventKey='3' className={ list_event === '3' ? 'text-white' : link_color }>
                            <QueryStats className='me-2' />
                                Mis Diagnósticos
                        </Nav.Link>
                    </Link>
                    <Link className='text-decoration-none' to='maximos-minimos'>
                        <Nav.Link href='maximos-minimos' eventKey='4' className={ list_event === '4' ? 'text-white' : link_color }>
                            <SsidChart className='me-2' />
                                Máximos y Mínimos
                        </Nav.Link>
                    </Link>
                    {   user.user.isManager ?
                        <Link className='text-decoration-none' to='subir-wrfout'>
                        <Nav.Link href='subir-wrfout' eventKey='5' className={ list_event === '5' ? 'text-white' : link_color }>
                            <DriveFolderUpload className='me-2' />
                                Subir WRFout 
                        </Nav.Link>
                        </Link>
                        :
                        <></>
                    }
                    <hr/>
                    <Link className='text-decoration-none' to='ayuda'>
                        <Nav.Link href='ayuda' eventKey='6' className={ list_event === '6' ? 'text-white' : link_color }>
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