import {useState, useEffect} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, Link} from "react-router-dom";

function Register(){

    const department_list = ['Visitante', 'Informática', 'Física de la Atmósfera', 'Pronósticos', 'Radares', 'Estudiante']
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [re_password, setRePassword] = useState('')
    const [name, setName] = useState('')
    const [last_names, setLastNames] = useState('')
    const [department, setDepartment] = useState('')
    const [validatePass, setValidatePass] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        if (password === re_password){
            try {
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
            catch (error) {
                console.log(error)
            }
        }

    }

    useEffect(()=>{
        if (password.length >= 8 && re_password.length >= 8 && password === re_password && email.length !== 0 && email.includes('@') && email.includes('.') && !email.includes(' ') && email === email.toLowerCase()) {
            setValidatePass(false)
        }
        else {
            setValidatePass(true)
        }
    },[password, re_password, email])

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
                                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="pe-5">
                                    <Form.Floating>
                                        <Form.Control type={'email'} placeholder={'nombre@ejemplo.com'} onChange={e => setEmail(e.target.value)} name={'username'}/>
                                        <Form.Label>Correo</Form.Label>
                                    </Form.Floating>
                                    {(!email.includes('@') || !email.includes('.') || email.includes(' ') || email !== email.toLowerCase()) && <div><small style={{color:'orange'}}>El formato de correo no es correcto</small><br/></div>}
                                    {email.length === 0 && <small style={{color:'orange'}}>Su correo es requerido</small>}
                                    <Form.Floating className='mt-5'>
                                        <Form.Control type={'password'} placeholder={'***********'} onChange={e => setPassword(e.target.value)} name={'password'}/>
                                        <Form.Label>Contraseña</Form.Label>
                                    </Form.Floating>
                                    {password.length < 8 && <small style={{color:'orange'}}>La contraseña es necesaria con no menos de 8 caracteres</small>}
                                    <Form.Floating className='mt-5'>
                                        <Form.Control type={'password'} placeholder={'***********'} onChange={e => setRePassword(e.target.value)} name={'re_password'}/>
                                        <Form.Label>Repetir Contraseña</Form.Label>
                                    </Form.Floating>
                                    {(re_password.length === 0 || re_password !== password) && <small style={{color:'orange'}}>La contraseña repetida no coinside o esta vacía</small>}
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
                                    <Button type={'submit'} placeholder={''} onClick={handleSubmit} className='btn btn-primary py-2' disabled={validatePass}>Registrarse</Button>
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