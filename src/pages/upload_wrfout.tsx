import {useState, useEffect} from "react";
import { Card, Row, Col, Table, Form, InputGroup, Modal, Button, Image } from "react-bootstrap";
import { CircularProgress, IconButton } from '@mui/material';
import { Delete, FileUpload, FormatLineSpacing, Search } from '@mui/icons-material';
import Cookies from "js-cookie";
import { FILE } from "./maps_2d";
import MyToast from "../components/my_toast";



function UploadWrfout(){

    const [list_file, setListFile] = useState<FILE[]>([])
    const [showDelete, setShowDelete] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    const [element_delete, setElementDelete] = useState<string>('')
    const [order, setOrder] = useState<string>('name')
    const [filter, setFilter] = useState('')
    const [full_list_save, setFullListSave] = useState<FILE[]>([])
    const [file, setFile] = useState<File>()
    const [progress, setProgress] = useState(false)

    let [showNot, setShowNot] = useState(false)
    let [toast_message, setToastMessage] = useState<string>('')
    let [toast_bg_color, setToastBgColor] = useState<string>('')
    let [toast_text_color, setToastTextColor] = useState('')

    const handleCloseDeleteModal = () => {
        setShowDelete(false)
    }

    const handleOpenDeleteModal = (file_name:string) => {
        setShowDelete(true)
        setElementDelete(file_name)
    }

    const handleCloseUploadModal = () => {
        setShowUpload(false)
    }

    const handleOpenUploadModal = () => {
        setShowUpload(true)
    }


    const getListFiles = async () => {
        const res = await fetch(
            `${process.env["REACT_APP_API_URL"]}/api/get-wrfout-list/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access-token')}`
                },
                body:JSON.stringify({
                    'order': order
                })
            }
        )
        const data = await res.json()
        setListFile(data)
        setFullListSave(data)
    }

    useEffect(()=>{
        getListFiles()
    },[order])

    const uploadFile = async () => {
        setProgress(true)
        const formData = new FormData()
        //@ts-ignore
        formData.append('file', file)
        const res = await fetch(
            `${process.env["REACT_APP_API_URL"]}/api/upload-file/`,
            {
                method: 'POST',
                body:formData
            }
        )
        const data = await res.json()
        setProgress(false)
        getListFiles()
        handleCloseUploadModal()
        if (res.status === 201){
            setShowNot(true)
            setToastBgColor('success')
            setToastTextColor('text-white')
            setToastMessage('El archivo fue subido con éxito!')
        }
    }

    const handleDeleteFile = () => { 
        const DeleteMapData = async () => {
            const res = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/delete-file/`,
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access-token')}`
                    },
                    body:JSON.stringify({
                        'file_name':element_delete
                    })
                }
            )
            if (res.status === 200) {
                getListFiles()
                setShowNot(true)
                setToastBgColor('success')
                setToastTextColor('text-white')
                setToastMessage('El archivo fue eliminado con éxito!')
            }
        }
        DeleteMapData()
        setShowDelete(false)
    }

    useEffect(()=>{
        setListFile(full_list_save) 
        const handleFilter = () => {
            const list_new_maps:FILE[] = []
            if (full_list_save && filter !== ''){
                setFilter(filter.replace(/\s+/g, '_').toLowerCase())
                for (let i=0; i<full_list_save.length; i++) {
                    if (full_list_save[i].name.toLowerCase().replace(/\s+/g, '_').includes(filter) || JSON.stringify(full_list_save[i].size).toLowerCase().replace(/\s+/g, '_').includes(filter)) {
                        list_new_maps.push(full_list_save[i])
                    }
                }
                setListFile(list_new_maps)
            } 
        }
        handleFilter()
    },[filter])

    return(
        <>
            <Card className="mt-3 mb-3 shadow"  style={{height:'825px'}}>
                <Card.Header>
                    <Row>
                        <Col xl={5} lg={4} md={12} sm={12} className="mb-lg-0 mb-md-2 mb-2">
                            <h4>Archivos WRFout Disponibles</h4>
                        </Col>
                        <Col xl={3} lg={4} md={12} sm={12} className="mb-lg-0 mb-3">
                            <Button onClick={e=>handleOpenUploadModal()}><FileUpload className="me-2"/>Subir Archivo</Button>
                        </Col>
                        <Col xl={4} lg={4} md={12} sm={12}>
                            <InputGroup>
                                <Form.Control type="text" placeholder="Buscar" onChange={e=>setFilter(e.target.value)}/>
                                <Search className="mt-2 ms-1"/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <div className="border rounded" style={{overflow:'auto', height:'740px'}}>
                    <Table striped bordered hover>
                        <thead style={{position:'sticky', top: '0', zIndex:'1'}} className="shadow">
                            <tr>
                                <th className="bg-primary text-white text-center pb-3" style={{width:'50px'}}>
                                    #
                                </th>
                                <th className="bg-primary text-white" style={{width:'600px'}}>
                                <IconButton title="Ordenar por diagnóstico" color="inherit" onClick={e=>setOrder('name')}><FormatLineSpacing/></IconButton>
                                    Nombre
                                </th>
                                <th className="bg-primary text-white" style={{width:'120px'}}>
                                <IconButton title="Ordenar por unidad" color="inherit" onClick={e=>setOrder('size')}><FormatLineSpacing/></IconButton>
                                    Tamaño
                                </th>
                                <th className="bg-primary text-white text-center pb-3" style={{width:'100px'}}>
                                    Administrar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_file && list_file.map((file, index)=>(
                                <tr>
                                    <td className="text-center pt-3">{index}</td>
                                    <td className="ps-3 pt-3">{file.name}</td>
                                    <td className="text-center pt-3">{file.size} mb</td>
                                    <td className="text-center">
                                        <IconButton title="Eliminar" color="error" onClick={e=>handleOpenDeleteModal(file.name)}><Delete/></IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showDelete} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Archivo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>¿Está seguro(a) que desea eliminar este archivo del server? Esta acción es irrebersible</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" form="load_file" onClick={e=>handleDeleteFile()}>
                        Eliminar
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpload} onHide={handleCloseUploadModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Subir Archivo WRFout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Form.Control id='upload_file' type="file"
                        //@ts-ignore 
                        onChange={e=>setFile(e.target.files[0])}/>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    {progress && <CircularProgress/>}
                    <Button variant="success" type="submit" form="load_file" onClick={e=>uploadFile()}>
                        <FileUpload className="me-2"/>Subir
                    </Button>
                    <Button variant="secondary" onClick={e=>handleCloseUploadModal()}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            <MyToast position={'bottom-end'} bg_color={toast_bg_color} text_color={toast_text_color} show={showNot} close={setShowNot} body_text={toast_message}/>
        </>
    )
}

export default UploadWrfout