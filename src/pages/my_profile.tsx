import {useState, useContext, useEffect} from "react";
import {Button, Card, Col, Container, Form, Row, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../context/context_provider";
import { userInteface } from "../context/context_provider";
import MyToast from "../components/my_toast";
import Cookies from "js-cookie";
import { AccountCircle } from "@mui/icons-material";

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
    const [file, setFile] = useState()
    const [profile_image, setProfileImage] = useState(user.user.profile_image)
    const [image, setImage] = useState<string>(`${process.env["REACT_APP_API_URL"]}/api/media/get-profile-image/${profile_image}`)
    const [validatePass, setValidatePass] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    let navigate = useNavigate()

    console.log(user.user)

    const [showNot, setShowNot] = useState(false)
    const [toast_message, setToastMessage] = useState<string>('')
    const [toast_bg_color, setToastBgColor] = useState<string>('')
    const [toast_text_color, setToastTextColor] = useState('')


    const handleImageProfile = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('username', email);
        //@ts-ignore
        formDataToSend.append('file', file);
        try {
            const res_profile = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/upload-profile-image/`,
                {
                    method:'POST',
                    body:formDataToSend
                }
            )
            if (res_profile.status === 201){
                const data = await res_profile.json()
                setProfileImage(data.profile_image)
                setImage(`${process.env["REACT_APP_API_URL"]}/api/media/get-profile-image/${data.profile_image}`)
                const dataUser:userInteface = {
                    username: email,
                    isAuthenticated: true,
                    name: name,
                    last_names: last_names,
                    department: department,
                    isAdmin: user.user.isAdmin,
                    isGuess: user.user.isGuess,
                    isManager: user.user.isManager,
                    profile_image: data.profile_image,
                    image: `${process.env["REACT_APP_API_URL"]}/api/media/get-profile-image/${data.profile_image}`
                }
                localStorage.setItem('userData', JSON.stringify(dataUser))
                user.setUser(dataUser)
                setShowNot(true)
                setToastBgColor('success')
                setToastTextColor('text-white')
                setToastMessage('Su foto de perfil a sido actualizada')
            }
        }
        catch (error) {
            console.log(error)
        }     
    }


    const handleUpdateProfile = async () => {
        try {
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
                        'department': department,
                    })
                }
            )
            if (res.status === 201){
                console.log(profile_image)
                const dataUser:userInteface = {
                    username: email,
                    isAuthenticated: true,
                    name: name,
                    last_names: last_names,
                    department: department,
                    isAdmin: user.user.isAdmin,
                    isGuess: user.user.isGuess,
                    isManager: user.user.isManager,
                    profile_image: profile_image,
                    image: image
                }
                localStorage.setItem('userData', JSON.stringify(dataUser))
                user.setUser(dataUser)
                setShowNot(true)
                setToastBgColor('success')
                setToastTextColor('text-white')
                setToastMessage('Su perfil fue actualizado')
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    const handleChangePasswd = async () => {
        if (password === re_password){
            try {
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
                                                   isManager:false,
                                                   profile_image:'',
                                                   image:''
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
            catch (error) {
                console.log(error)
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
        if (password.length >= 8 && re_password.length >= 8 && password === re_password) {
            setValidatePass(false)
        }
        else {
            setValidatePass(true)
        }
    },[oldPassword, password, re_password])


    useEffect(()=>{
        if (email.includes('@') && email.includes('.') && !email.includes(' ') && email === email.toLowerCase()) {
            setValidEmail(false)
        }
        else {
            setValidEmail(true)
        }
    },[email])

    return(
        <>
            <Container className='p-5'>
                <Card>
                    <Card.Header>
                        <h1 className='text-center'>Mi Perfil</h1>
                    </Card.Header>
                    <Card.Body className='p-5 mt-3'>
                        <Form>
                            <Row>
                                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="pe-5">
                                    <Form.Floating>
                                        <Form.Control type={'password'} onChange={e => setOldPassword(e.target.value)} name={'old_password'} placeholder="" required/>
                                        <Form.Label>Contraseña Actual</Form.Label>
                                    </Form.Floating>
                                    {oldPassword.length < 8 && <small style={{color:'orange'}}>La contraseña actual es necesaria con no menos de 8 caracteres</small>}
                                    <Form.Floating className='mt-5'>
                                        <Form.Control type={'password'} onChange={e => setPassword(e.target.value)} placeholder="" name={'password'}/>
                                        <Form.Label>Nueva Contraseña</Form.Label>
                                    </Form.Floating>
                                    {password.length < 8 && <small style={{color:'orange'}}>La contraseña nueva es necesaria con no menos de 8 caracteres</small>}
                                    <Form.Floating className='mt-5'>
                                        <Form.Control type={'password'} onChange={e => setRePassword(e.target.value)} placeholder="" name={'re_password'}/>
                                        <Form.Label>Repetir Nueva Contraseña</Form.Label>
                                    </Form.Floating>
                                    {(re_password.length === 0 || re_password !== password) && <small style={{color:'orange'}}>La contraseña repetida no coinside o esta vacía</small>}
                                    <Form.Group className='mt-5'>
                                        <Button onClick={handleChangePasswd} className='btn btn-primary py-2' disabled={validatePass}>Cambiar Contraseña</Button>
                                    </Form.Group>                                     
                                </Col>
                                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="mt-lg-0 mt-xl-0 mt-5">
                                    <Form.Group>
                                        <Form.Label>Foto de Perfil</Form.Label>
                                        {user.user.profile_image !== '' ? <Image className="ms-3" src={image}  roundedCircle style={{maxHeight:'40px'}} /> : <AccountCircle className="ms-3"/>}
                                        <Form.Control
                                            className="mt-3" 
                                            id='upload_file' 
                                            type="file"
                                            //@ts-ignore 
                                            onChange={e=>setFile(e.target.files[0])}
                                        />
                                    </Form.Group>
                                    <Form.Group className='mt-5'>
                                        <Button onClick={handleImageProfile} className='btn btn-primary py-2'>Actualizar Foto de Perfil</Button>
                                    </Form.Group> 
                                    <Form.Floating className="mt-5">
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
                                        <Button onClick={handleUpdateProfile} className='btn btn-primary py-2' disabled={validEmail}>Actualizar Perfil</Button>
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