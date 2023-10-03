import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";


function SidebarList(){

    let theme: string | null = localStorage.getItem('themeMode')
    let activeKey: string | null = localStorage.getItem('activeKey')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    if (activeKey === null){
        localStorage.setItem('activeKey', '1')
        activeKey = '1'
    }

    const link_color = theme === 'dark' ? 'link-light' : 'link-dark'

    const [list_event, getListEvent] = useState(activeKey)

    const handleSelect = (eventKey: any) => {
        getListEvent(eventKey)
        localStorage.setItem('activeKey', eventKey)
    }


    return(
        <>
            <Nav variant='pills' activeKey={list_event} onSelect={handleSelect} className="flex-column mb-auto" style={{minHeight:'76vh'}}>
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
                    <Nav.Link href='mapas-3d' eventKey='3' className={link_color}>
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
        </>
    )
}

export default SidebarList