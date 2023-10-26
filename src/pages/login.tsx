import React, {useContext, useState} from "react";
import {Button, Card, Form, Row, Col} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import { UserContext } from "../context/context_provider";
import jwt from 'jwt-decode';
import { userInteface } from "../context/context_provider";

interface JWT {token_type: string, exp: number, iat: number, jti: string, email: string}

const Login = () => {

    const user = useContext(UserContext)

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let navigate = useNavigate()

    let getUserInfo = async(username:string) => {
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
        const dataUser:userInteface = {
            username: username,
            isAuthenticated: true,
            name: response.name,
            last_names: response.last_names,
            department: response.department,
            isAdmin: response.isAdmin,
            isGuess: response.isGuess,
            isManager: response.isManager
        }
        localStorage.setItem('userData', JSON.stringify(dataUser))
        user.setUser(dataUser)
        return navigate('/')
    }


    let loginUser = async(e:any)=> {
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
        const response = await res.json()
        if (res.status === 200)
           Cookies.set('access-token', response.access)
           Cookies.set('refresh-token', response.refresh)
           const current_user:JWT = jwt(response.access)
           getUserInfo(current_user.email)
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
                                <Form.Control type={'password'} placeholder={'***********'} onChange={e=>setPassword(e.target.value)} name={'password'}/>
                                <Form.Label>Contraseña</Form.Label>
                            </Form.Floating>
                            <Form.Group className='mt-5'>
                                <Button type={'submit'} placeholder={''} onClick={loginUser} className='btn btn-primary w-100 py-2'>Entrar</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Link className="p-4" to={'/register'}>
                            Registrarse
                        </Link>
                    </Card.Footer>
                 </Card>
                </Col>
                <Col xl={3} lg={2} md={1} sm={1} xs={1}></Col>
            </Row>
        </>
    )
}

export default Login