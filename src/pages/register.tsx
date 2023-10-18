import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, Link} from "react-router-dom";

function Register(){

    const department_list = ['Informática', 'Física de la Atmósfera', 'Pronósticos', 'Radares', 'Visitante', 'Estudiante']
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [re_password, setRePassword] = useState('')
    let [name, setName] = useState('')
    let [last_names, setLastNames] = useState('')
    let [department, setDepartment] = useState('')
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
                        'name': name,
                        'last_names': last_names,
                        'department': department
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
                            <Row>
                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
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
                                        <Form.Label>Repetir Contraseña</Form.Label>
                                    </Form.Floating>
                                </Col>
                                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="mt-lg-0 mt-xl-0 mt-5">
                                    <Form.Floating>
                                        <Form.Control type={'text'} placeholder={'Anónimo'} onChange={e => setName(e.target.value)} name={'name'}/>
                                        <Form.Label>Nombre</Form.Label>
                                    </Form.Floating>
                                    <Form.Floating className='mt-5'>
                                        <Form.Control type={'text'} placeholder={''} onChange={e => setLastNames(e.target.value)} name={'last_names'}/>
                                        <Form.Label>Apellidos</Form.Label>
                                    </Form.Floating>
                                    <Form.Floating className='mt-5'>
                                        <Form.Select placeholder={''} onChange={e => setDepartment(e.target.value)} name={'department'}>
                                            {department_list.map((department)=>(
                                                <option value={department}>{department}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Label>Departamento</Form.Label>
                                    </Form.Floating>
                                </Col>
                                <Form.Group className='mt-5'>
                                    <Button type={'submit'} placeholder={''} onClick={handleSubmit} className='btn btn-primary py-2'>Registrarse</Button>
                                </Form.Group> 
                            </Row>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Link className="p-4" to={'/login'}>
                            Autenticarse
                        </Link>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default Register