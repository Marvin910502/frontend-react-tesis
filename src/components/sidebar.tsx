import { useContext, useState, useEffect } from "react";
import SidebarList from "./sidebar_list";
import SidebarDropdown from "./sidebar_dropdown";
import {Link} from "react-router-dom";
import Switch from "./switch";
import {Col, Navbar, NavbarBrand, Image} from "react-bootstrap";
import { UserContext } from "../context/context_provider";
import Cookies from 'js-cookie';



function Sidebar(){

    const user = useContext(UserContext)

    const [icon, setIcon] = useState<string>('')

    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    const link_color = theme === 'dark' ? 'link-light' : 'link-dark'

    useEffect(() => {
        const getContentSite = async () => {
            try {
                const res = await fetch(
                    `${process.env['REACT_APP_API_URL']}/api/get-content/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${Cookies.get('access-token')}`
                        },
                    }
                    )
                const data = await res.json()
                setIcon(data.icon)
            }
            catch (error) {
                console.log(error)
            }
        }
        getContentSite()
    }, [])

    return(
        <>
          <Col  xl={2} lg={3} md={4} sm={4} xs={1} className='fixed-top'>
          <Navbar className='shadow-lg'>
            <div className='flex-lg-fill p-2 ms-2 w-100' style={{height:'100vh'}}>
                <div>
                    <Link to="/" className={"text-center text-decoration-none " + link_color}>
                        <NavbarBrand className="pt-2 pb-4" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Image src={`${process.env["REACT_APP_API_URL"]}/api/media/get-icon/${icon}`} className="me-2" style={{maxWidth:'100px'}}/>
                        </NavbarBrand>
                    </Link>
                    <hr className="mt-0"/>
                    <div className='p-1'>
                        { user?.user.isAuthenticated && <SidebarList/>}
                    </div>
                    <div style={{position:"absolute", bottom:'5vh'}} className='pe-4 w-100'>
                        <Switch/>
                        <hr/>
                        <SidebarDropdown/>
                    </div>
                </div>
            </div>
          </Navbar>
          </Col>
        </>
    )
}

export default Sidebar