import React from "react";
import {Image, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";


function SidebarDropdown(){

    let theme: string | null = localStorage.getItem('themeMode')

    return(
        <>
            <div className='d-flex justify-content-start ps-2'>
                <Image src={process.env.PUBLIC_URL + 'Marvin.webp'}  roundedCircle style={{maxHeight:'40px'}} />
                <NavDropdown drop={'up'}
                             title='Perfil'
                             id="userDropdown"
                             data-bs-theme={theme}
                             className='ms-3 mt-2'
                >

                    <Link className='text-decoration-none' to='/login'>
                        <NavDropdown.Item href='/login'>
                            Login
                        </NavDropdown.Item>
                    </Link>
                    <Link className='text-decoration-none' to='/register'>
                        <NavDropdown.Item href='/register'>
                            Registrarse
                        </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item href="#action4">
                        Autenticarse en Odoo
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <Link className='text-decoration-none' to={'/logout'}>
                        <NavDropdown.Item href="/logout">
                            Cerrar Sesión
                        </NavDropdown.Item>
                    </Link>
                </NavDropdown>
            </div>
        </>
    )
}

export default SidebarDropdown