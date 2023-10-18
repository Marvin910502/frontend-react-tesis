import {useContext} from "react";
import {Image, NavDropdown} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { UserContext } from "../context/context_provider";


function SidebarDropdown(){

    const theme: string | null = localStorage.getItem('themeMode')

    const user = useContext(UserContext)

    return(
        <>
            <div className='d-flex justify-content-start ps-2'>
                <Image src={process.env.PUBLIC_URL + 'Marvin.webp'}  roundedCircle style={{maxHeight:'40px'}} />
                <NavDropdown drop={'up'}
                             title={'Mi Perfil'}
                             id="userDropdown"
                             className='ms-3 mt-2'
                >
                    { user.user.isAuthenticated ?  

                        <Link className='text-decoration-none' to='/login'>
                            <NavDropdown.Item href='/login'>
                                {user.user.username}
                            </NavDropdown.Item>
                        </Link>

                    :  
                        <div>
                            <Link className='text-decoration-none' to='/login'>
                                <NavDropdown.Item href='/login'>
                                    Autenticarse
                                </NavDropdown.Item>
                            </Link>
                            <Link className='text-decoration-none' to='/register'>
                                <NavDropdown.Item href='/register'>
                                    Registrarse
                                </NavDropdown.Item>
                            </Link>
                        </div>
                    }
                    {user.user.isAuthenticated &&
                    <div>
                        <NavDropdown.Divider />
                        <Link className='text-decoration-none' to={'/logout'}>
                                <NavDropdown.Item href="/logout">
                                    Cerrar Sesión
                                </NavDropdown.Item>
                        </Link>
                    </div>
                    }
                </NavDropdown>
            </div>
        </>
    )
}

export default SidebarDropdown