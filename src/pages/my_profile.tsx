import {useState, useContext, useEffect} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, Link} from "react-router-dom";
import { UserContext } from "../context/context_provider";
import { userInteface } from "../context/context_provider";
import MyToast from "../components/my_toast";
import Cookies from "js-cookie";

function MyProfile(){

    const user = useContext(UserContext)

    const department_list = ['Informática', 'Física de la Atmósfera', 'Pronósticos', 'Radares', 'Visitante', 'Estudiante']
    const [email, setEmail] = useState(user.user.username)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [re_password, setRePassword] = useState('')
    const [name, setName] = useState(user.user.name)
    const [last_names, setLastNames] = useState(user.user.last_names)
    const [department, setDepartment] = useState(user.user.department)
    const [validatePass, setValidatePass] = useState(false)
    let navigate = useNavigate()

    const [showNot, setShowNot] = useState(false)
    const [toast_message, setToastMessage] = useState<string>('')
    const [toast_bg_color, setToastBgColor] = useState<string>('')
    const [toast_text_color, setToastTextColor] = useState('')

    const handleUpdateProfile = async () => {
        const res = await fetch(
            `${process.env["REACT_APP_API_URL"]}/api/update-user/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body:JSON.stringify({
                    'old_username': user.user.username,
                    'username': email,
                    'name': name,
                    'last_names': last_names,
                    'department': department
                })
            }
        )
        if (res.status === 201){
            const dataUser:userInteface = {
                username: email,
                isAuthenticated: true,
                name: name,
                last_names: last_names,
                department: department,
                isAdmin: user.user.isAdmin,
                isGuess: user.user.isGuess,
                isManager: user.user.isManager
            }
            localStorage.setItem('userData', JSON.stringify(dataUser))
            user.setUser(dataUser)
            setShowNot(true)
            setToastBgColor('success')
            setToastTextColor('text-white')
            setToastMessage('Su perfil fue actualizado')
        }
    }


    const handleChangePasswd = async () => {
        if (password === re_password){
            const res = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/change-passwd/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body:JSON.stringify({
                        'username': email,
                        'old_password': oldPassword,
                        'new_password': password,
                    })
                }
            )
            if (res.status === 201){
                Cookies.set('access-token', '')
                Cookies.set('refresh-token', '')
                localStorage.removeItem('userData')
                const userData:userInteface = {username:'Anónimo', 
                                               isAuthenticated:false, 
                                               name:'', 
                                               last_names:'', 
                                               department:'', 
                                               isAdmin:false, 
                                               isGuess:false, 
                                               isManager:false
                                            }
                user.setUser(userData)
                localStorage.setItem('session', 'password_changed')
                return navigate('/login')
            }
            if (res.status === 401){
                setShowNot(true)
                setToastBgColor('danger')
                setToastTextColor('text-white')
                setToastMessage('La contraseña actual no es correcta')
            }
        }
        else {
            setShowNot(true)
            setToastBgColor('warning')
            setToastTextColor('text-black')
            setToastMessage('Las contraseñas nuevas no coinciden')
        }
    }


    useEffect(()=>{
        if (oldPassword.length <= 8 && password.length <= 8 && re_password.length <= 8) {
            setValidatePass(true)
        }
        else {
            setValidatePass(false)
        }
    },[oldPassword, password, re_password])


    return(
        <>
            <Container className='p-5 mt-5'>
                <Card>
                    <Card.Header>
                        <h1 className='text-center'>Mi Perfil</h1>
                    </Card.Header>
                    <Card.Body className='p-5 mt-3'>
                        <Form>
                            <Row>
                                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="pe-5">
                                    <Form.Floating>
                                        <Form.Control type={'password'} onChange={e => setOldPassword(e.target.value)} name={'old_password'} required/>
                                        <Form.Label>Contraseña Actual</Form.Label>
                                    </Form.Floating>
                                    {oldPassword.length < 8 && <small style={{color:'orange'}}>La contraseña actual es necesaria con no menos de 8 caracteres</small>}
                                    <Form.Floating className='mt-5'>
                                        <Form.Control type={'password'} onChange={e => setPassword(e.target.value)} name={'password'}/>
                                        <Form.Label>Nueva Contraseña</Form.Label>
                                    </Form.Floating>
                                    {password.length < 8 && <small style={{color:'orange'}}>La contraseña nueva es necesaria con no menos de 8 caracteres</small>}
                                    <Form.Floating className='mt-5'>
                                        <Form.Control type={'password'} onChange={e => setRePassword(e.target.value)} name={'re_password'}/>
                                        <Form.Label>Repetir Nueva Contraseña</Form.Label>
                                    </Form.Floating>
                                    {(re_password.length === 0 || re_password !== password) && <small style={{color:'orange'}}>La contraseña repetida no coinside o esta vacía</small>}
                                    <Form.Group className='mt-5'>
                                        <Button onClick={handleChangePasswd} className='btn btn-primary py-2' disabled={validatePass}>Cambiar Contraseña</Button>
                                    </Form.Group>                                     
                                </Col>
                                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="mt-lg-0 mt-xl-0 mt-5">
                                    <Form.Floating>
                                        <Form.Control type={'email'} placeholder={'nombre@ejemplo.com'} value={email} onChange={e => setEmail(e.target.value)} name={'username'}/>
                                        <Form.Label>Correo</Form.Label>
                                        {(!email.includes('@') || !email.includes('.') || email.includes(' ') || email !== email.toLowerCase()) && <div><small style={{color:'orange'}}>El formato de correo no es correcto</small><br/></div>}
                                        {email.length === 0 && <small style={{color:'orange'}}>Su correo es requerido</small>}
                                    </Form.Floating>                                    
                                    <Form.Floating className="mt-5">
                                        <Form.Control type={'text'} placeholder={'Anónimo'} value={name} onChange={e => setName(e.target.value)} name={'name'}/>
                                        <Form.Label>Nombre</Form.Label>
                                    </Form.Floating>
                                    <Form.Floating className='mt-5'>
                                        <Form.Control type={'text'} placeholder={''} value={last_names} onChange={e => setLastNames(e.target.value)} name={'last_names'}/>
                                        <Form.Label>Apellidos</Form.Label>
                                    </Form.Floating>
                                    <Form.Floating className='mt-5'>
                                        <Form.Select placeholder={''} value={department} onChange={e => setDepartment(e.target.value)} name={'department'}>
                                            {department_list.map((department)=>(
                                                <option value={department}>{department}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Label>Departamento</Form.Label>
                                    </Form.Floating>
                                    <Form.Group className='mt-5'>
                                    <Button onClick={handleUpdateProfile} className='btn btn-primary py-2'>Actualizar Perfil</Button>
                                </Form.Group> 
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            <MyToast position={'bottom-end'} bg_color={toast_bg_color} text_color={toast_text_color} show={showNot} close={setShowNot} body_text={toast_message} />
        </>
    )
}

export default MyProfile