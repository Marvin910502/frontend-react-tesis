import React from "react";
import {Image, NavDropdown} from "react-bootstrap";


function SidebarDropdown(){

    let theme: string | null = localStorage.getItem('themeMode')

    return(
        <>
            <div className='d-flex justify-content-start ps-2'>
                <Image src={process.env.PUBLIC_URL + 'Marvin.webp'}  roundedCircle style={{maxHeight:'40px'}} />
                <NavDropdown drop={'up'} title="Usuario" id="userDropdown" data-bs-theme={theme} className='ms-3 mt-2' >
                    <NavDropdown.Item href="#action3">
                        Perfil
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                        Autenticarse en Odoo
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        Cerrar Sesión
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </>
    )
}

export default SidebarDropdown