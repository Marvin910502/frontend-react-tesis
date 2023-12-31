import {useState, useEffect, useContext} from "react";
import { Card, Row, Col, Table, Form, InputGroup, Modal, Button } from "react-bootstrap";
import { CircularProgress, IconButton, Pagination } from '@mui/material';
import { Delete, FileUpload, FormatLineSpacing, Search, Storage } from '@mui/icons-material';
import Cookies from "js-cookie";
import { FILE } from "./diagnostics";
import { mapData } from "./diagnostics";
import MyToast from "../components/my_toast";
import { UserContext } from "../context/context_provider";

const unauthorized_extensions = ['py', 'sh', 'php', 'html', 'js', 'css', 'txt', 'json', 'xml', 'csv', 'md', 'yml', 'yaml', 'log', 'gitignore', 'gitattributes', 'gitmodules', 'gitkeep', 'gitconfig', 'git', 'gitignore', 'gitattributes', 'gitmodules', 'gitkeep', 'gitconfig', 'gitignore', 'gitattributes', 'gitmodules', 'gitkeep', 'gitconfig', 'gitignore', 'gitattributes', 'gitmodules', 'gitkeep', 'gitconfig', 'gitignore', 'gitattributes', 'gitmodules', 'gitkeep', 'gitconfig', 'gitignore', 'gitattributes', 'gitmodules', 'gitkeep', 'gitconfig', 'gitignore', 'gitattributes', 'gitmodules', 'gitkeep', 'gitconfig', 'gitignore', 'gitattributes', 'gitmodules', 'gitkeep', 'gitconfig', 'jpg', 'png', 'gif', 'tif', 'tiff', 'bmp', 'ico', 'svg', 'webp', 'avif', 'mp4', 'webm', 'ogg', 'mp3', 'wav', 'flac', 'aac', 'zip', 'tar', 'gz', '7z', 'rar', 'tgz', 'exe', 'msi', 'bin', 'dmg', 'iso', 'img', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'rtf', 'epub', 'apk', 'torrent', 'woff', 'woff2', 'eot', 'ttf', 'otf', 'ico', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'rtf', 'epub', 'apk', 'torrent', 'woff', 'woff2', 'eot', 'ttf', 'otf', 'ico', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'rtf', 'epub', 'apk', 'torrent', 'woff', 'woff2', 'eot', 'ttf', 'otf', 'ico', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'rtf', 'epub', 'apk', 'torrent', 'woff', 'woff2', 'eot', 'ttf', 'otf', 'ico', 'mkv', 'mp4', 'mov', 'wmv', 'avi', 'mpeg', 'flv', '3gp', 'webm', 'vob', 'ogg', 'ogv', 'drc', 'gifv', 'mng', 'qt', 'yuv', 'rm', 'rmvb', 'asf', 'amv', 'm4p', 'm4v', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'svi', '3gp', 'mxf', 'roq', 'nsv', 'f4v', 'f4p', 'f4a', 'f4b']

function UploadWrfout(){

    const user = useContext(UserContext)

    const [list_file, setListFile] = useState<FILE[]>([])
    const [showDelete, setShowDelete] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    const [element_delete, setElementDelete] = useState<string>('')
    const [order, setOrder] = useState<string>('name')
    const [filter, setFilter] = useState('')
    const [full_list_save, setFullListSave] = useState<FILE[]>([])
    const [file, setFile] = useState<File>()
    const [server_space, setServerSpace] = useState<number>(0)
    const [used_space, setUsedSpace] = useState<number>(0)
    const [low_space, setLowSpace] = useState<boolean>(false)
    const [progress, setProgress] = useState(false)
    const [count, setCount] = useState<number>(0)
    const [current_page, setCurrentPage] = useState<number>(1)

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
        try {
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
                        'username': user.user.username,
                        'order': order
                    })
                }
            )
            const data = await res.json()
            setListFile(data)
            setFullListSave(data)
            setCount(Math.ceil(data.length/12))
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getListFiles()
    },[order])

    const uploadFile = async () => {
        setProgress(true)
        const formData = new FormData()

        let valid_file = true
        for (let i=0; i<unauthorized_extensions.length; i++) {
            if (file?.name.includes(`.${unauthorized_extensions[i]}`)) {
                setShowNot(true)
                setToastBgColor('danger')
                setToastTextColor('text-white')
                setToastMessage('El archivo no es compatible')
                setProgress(false)
                valid_file = false
                handleCloseUploadModal()
            }
        }

        if (valid_file === true){
            formData.append('Authorization', `Bearer ${Cookies.get('access-token')}`)
            formData.append('username', user.user.username)
            //@ts-ignore
            formData.append('file', file)
            try {
                const res = await fetch(
                    `${process.env["REACT_APP_API_URL"]}/api/upload-file/`,
                    {
                        method: 'POST',
                        body:formData
                    }
                )
                setProgress(false)
                getListFiles()
                handleCloseUploadModal()
                if (res.status === 201){
                    setShowNot(true)
                    setToastBgColor('success')
                    setToastTextColor('text-white')
                    setToastMessage('El archivo fue subido con éxito!')
                }
                if (res.status === 406){
                    setShowNot(true)
                    setToastBgColor('danger')
                    setToastTextColor('text-white')
                    setToastMessage('El archivo no es compatible o está corrupto')
                }
                if (res.status === 507){
                    setShowNot(true)
                    setToastBgColor('danger')
                    setToastTextColor('text-white')
                    setToastMessage('No hay suficiente espacio en el servidor')
                }
                if (res.status === 208){
                    setShowNot(true)
                    setToastBgColor('danger')
                    setToastTextColor('text-white')
                    setToastMessage('El archivo ya existe en el servidor')
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const handleDeleteFile = () => {
        setCurrentPage(1) 
        const DeleteMapData = async () => {
            try {
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
                            'username': user.user.username,
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
                    let mapInicialData:mapData = JSON.parse(localStorage.getItem('mapData') || 'null')
                    if (mapInicialData !== null) {
                        for (let i=0; i<mapInicialData.name_files_list.length; i++) {
                            if (mapInicialData.name_files_list[i] === element_delete) {
                                localStorage.removeItem('mapData')
                            }
                        }
                    }

                }
            }
            catch (error) {
                console.log(error)
            }
        }
        DeleteMapData()
        setShowDelete(false)
    }

    useEffect(()=>{
        setCurrentPage(1)
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
                setCount(Math.ceil(list_new_maps.length/12))
            }
            if (full_list_save && filter === '') {
                setCount(Math.ceil(full_list_save.length/12))
            } 
        }
        handleFilter()
    },[filter])


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
                setServerSpace(data.server_space)
                setUsedSpace(data.used_space)
                let percent_used = 100 - ((data.used_space / data.server_space) * 100)
                if (percent_used < 10){
                    setLowSpace(true)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        getContentSite()
    }, [list_file])


    return(
        <>
            <Card className="mt-3 mb-3 shadow">
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
                                <Form.Control type="search" placeholder="Buscar" onChange={e=>setFilter(e.target.value)}/>
                                <Search className="mt-2 ms-1"/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <div className="mt-3 mb-3 flex-row">
                        <h4 className={ low_space ? 'text-danger' : 'text-success' }><Storage className="mb-1" titleAccess="Espacio en el servidor"/> {used_space} / {server_space} GB { low_space && '(Poco espacio en el servidor)' }</h4>
                    </div>
                    <div className="border rounded">
                    <Table striped bordered hover>
                        <thead className="shadow">
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
                                (index < 12 * current_page && index >= 12 * (0 + current_page - 1))  &&
                                <tr>
                                    <td className="text-center pt-3">{index+1}</td>
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
                    <div className="align-item-center">
                        <div className="text-center p-2 mt-3 rounded align-self-center" style={{backgroundColor:'white', display:'inline-block', border:'2px solid gray'}}><Pagination variant="outlined" color={'primary'} count={count} page={current_page} onChange={(e, page)=>setCurrentPage(page)}/></div>
                    </div>   
                </Card.Body>
            </Card>

            <Modal show={showDelete} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Archivo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>¿Está seguro(a) que desea eliminar este archivo del servidor? Esta acción es irreversible</span>
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