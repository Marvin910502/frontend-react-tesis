import React, {useState} from "react";
import {Button, Card, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function Register(){

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [re_password, setRePassword] = useState('')
    let navigate = useNavigate()

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        if (password === re_password){
            const res = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/register/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body:JSON.stringify({
                        'username': email,
                        'password': password,
                    })
                }
            )
            if (res.status === 201){
                return navigate('/login')
            }

        }

    }

    return(
        <>
            <Container className='p-5 mt-5'>
                <Card>
                    <Card.Header>
                        <h1 className='text-center'>Registrarse</h1>
                    </Card.Header>
                    <Card.Body className='p-5 mt-3'>
                        <Form>
                            <Form.Floating>
                                <Form.Control type={'email'} placeholder={'nombre@ejemplo.com'} onChange={e => setEmail(e.target.value)} name={'username'}/>
                                <Form.Label>Correo</Form.Label>
                            </Form.Floating>
                            <Form.Floating className='mt-5'>
                                <Form.Control type={'password'} placeholder={'***********'} onChange={e => setPassword(e.target.value)} name={'password'}/>
                                <Form.Label>Contraseña</Form.Label>
                            </Form.Floating>
                            <Form.Floating className='mt-5'>
                                <Form.Control type={'password'} placeholder={'***********'} onChange={e => setRePassword(e.target.value)} name={'re_password'}/>
                                <Form.Label>Contraseña</Form.Label>
                            </Form.Floating>
                            <Form.Group className='mt-5'>
                                <Button type={'submit'} placeholder={''} onClick={handleSubmit} className='btn btn-primary py-2'>Entrar</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Register