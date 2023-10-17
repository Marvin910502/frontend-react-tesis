import React, {useState} from "react";
import {Button, Card, Form, Row, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'

interface authState{
    updateAuthentication:Function,
}

const Login:React.FC<authState> = ({updateAuthentication}) => {


    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let navigate = useNavigate()


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
           localStorage.setItem('isAuthenticated', 'true')
           updateAuthentication(true)
           return navigate('/')
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
                 </Card>
                </Col>
                <Col xl={3} lg={2} md={1} sm={1} xs={1}></Col>
            </Row>
        </>
    )
}

export default Login