import {useContext, useEffect, useState} from "react";
import {Button, Card, Form, Row, Col} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import { UserContext } from "../context/context_provider";
import jwt from 'jwt-decode';
import { userInteface } from "../context/context_provider";
import MyToast from "../components/my_toast";
import { profile } from "console";

interface JWT {token_type: string, exp: number, iat: number, jti: string, email: string}

const Login = () => {

    const user = useContext(UserContext)

    const [showNot, setShowNot] = useState(false)
    const [toast_message, setToastMessage] = useState<string>('')
    const [toast_bg_color, setToastBgColor] = useState<string>('')
    const [toast_text_color, setToastTextColor] = useState('')

    useEffect(()=>{
        if (localStorage.getItem('session') === 'password_changed'){
            setShowNot(true)
            setToastBgColor('success')
            setToastTextColor('text-white')
            setToastMessage('Su contraseña fue cambiada con éxito')
            localStorage.removeItem('session')
        }
    },[])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const getUserInfo = async(username:string) => {
        const res = await fetch(`${process.env["REACT_APP_API_URL"]}/api/get-user/`,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access-token')}`
            },
            body:JSON.stringify({'username':username})
        }
        )
        const response = await res.json()
        if (response.isAdmin === false){
            const dataUser:userInteface = {
                username: username,
                isAuthenticated: true,
                name: response.name,
                last_names: response.last_names,
                department: response.department,
                isAdmin: response.isAdmin,
                isGuess: response.isGuess,
                isManager: response.isManager,
                profile_image: response.profile_image || 'default.png',
                image: `${process.env["REACT_APP_API_URL"]}/api/media/get-profile-image/${response.profile_image || 'default.png'}`
            }
            localStorage.setItem('userData', JSON.stringify(dataUser))
            user.setUser(dataUser)
            return navigate('/')
        }
        else {
            return navigate('http://127.0.0.1:8000/usuarios')
        }
    }


    const loginUser = async(e:any)=> {
        e.preventDefault()

        const res = await fetch(
            `${process.env["REACT_APP_API_URL"]}/api/token/`,
            {
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body:JSON.stringify({
                    'username': email,
                    'password': password
                })
            }
        )
        if (res.status === 200){
            const response = await res.json()
            Cookies.set('access-token', response.access)
            Cookies.set('refresh-token', response.refresh)
            const current_user:JWT = jwt(response.access)
            getUserInfo(current_user.email)
        }
        if (res.status === 401 || res.status === 400) {
            setShowNot(true)
            setToastBgColor('danger')
            setToastTextColor('text-white')
            setToastMessage('Usuario o contraseña incorrectos')
        }
    }



    return(
        <>
            <Row style={{height:'20%'}}></Row>  
            <Row>
                <Col xl={3} lg={2} md={1} sm={1} xs={1}></Col>
                <Col xl={6} lg={8} md={10} sm={10} xs={10}>
                <Card>
                    <Card.Header>
                        <h1 className='text-center'>Autenticarse</h1>
                    </Card.Header>
                    <Card.Body className='p-5'>
                        <Form>
                            <Form.Floating>
                                <Form.Control type={'email'} placeholder={'nombre@ejemplo.com'} onChange={e=>setEmail(e.target.value)} name={'email'}/>
                                <Form.Label>Correo</Form.Label>
                            </Form.Floating>
                            <Form.Floating className='mt-5'>
                                <Form.Control type={'password'} onChange={e=>setPassword(e.target.value)} name={'password'}/>
                                <Form.Label>Contraseña</Form.Label>
                            </Form.Floating>
                            <Form.Group className='mt-5'>
                                <Button onClick={loginUser} className='btn btn-primary w-100 py-2'>Entrar</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Link className="p-4" to={'/register'}>
                            Registrarse
                        </Link>
                        <a className="float-end me-4" href="http://127.0.0.1:8000/usuarios/">Administración</a>
                    </Card.Footer>
                 </Card>
                </Col>
                <Col xl={3} lg={2} md={1} sm={1} xs={1}></Col>
            </Row>

            <MyToast position={'bottom-end'} bg_color={toast_bg_color} text_color={toast_text_color} show={showNot} close={setShowNot} body_text={toast_message} />
        </>
    )
}

export default Login