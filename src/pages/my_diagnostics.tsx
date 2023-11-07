import React, { useEffect, useContext, useState } from "react";
import { Card, Table, Modal, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import GeoJsonObject from "geojson";
import Cookies from "js-cookie";
import { UserContext } from "../context/context_provider";
import { IconButton } from "@mui/material";
import { Delete, OpenWith, FormatLineSpacing, Search } from '@mui/icons-material';
import Maps2dArea from "../components/maps_2d_area";
import MyToast from "../components/my_toast";


interface mapDataElement{
    geojson: string,
    diagnostic_label:string,
    units_label:string,
    polygons: number,
    file_name:string,
    diagnostic: string,
    units: string,
}

function MyDiagnostics(){

    const user = useContext(UserContext)
    const [list_maps, setListMaps] = useState<mapDataElement[]>()
    const [order, setOrder] = useState<string>('diagnostic')
    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [map, setMap] = useState<mapDataElement>()
    const [geojsonObj, setGeoJsonObj] = useState<typeof GeoJsonObject | null>(null)
    const [line_weight, setLineWeight] = useState( 0.5 )
    const [fill_opacity, setFillOpacity] = useState( 0.3 )
    const [element_delete, setElementDelete] = useState<string>('')
    const [filter, setFilter] = useState('')
    const [full_list_save, setFullListSave] = useState<mapDataElement[]>()

    let [showNot, setShowNot] = useState(false)
    let [toast_message, setToastMessage] = useState<string>('')
    let [toast_bg_color, setToastBgColor] = useState<string>('')
    let [toast_text_color, setToastTextColor] = useState('')


    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleCloseDeleteModal = () => {
        setShowDelete(false)
    }

    const handleOpenDeleteModal = (element:string) => {
        setShowDelete(true)
        setElementDelete(element)
    }

    const handleOpenModal = (map_element:mapDataElement) => {
        setMap(map_element)
        let geo:typeof GeoJsonObject = JSON.parse(map_element.geojson).features
        setGeoJsonObj(geo)
        setShowModal(true)
    }

    const GetMapsList = async () => {
        const res = await fetch(
            `${process.env["REACT_APP_API_URL"]}/api/get-list-map-data/`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access-token')}`
                },
                body:JSON.stringify({
                    'username':user.user.username,
                    'order_element':order
                })
            }
        )
        const response:mapDataElement[] = await res.json()
        setListMaps(response)
        setFullListSave(response)
    }

    useEffect(()=>{
        GetMapsList()
    },[order])

    const handleDeleteMapData = (file_name:string) => { 
        const DeleteMapData = async () => {
            const res = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/delete-map-data/`,
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access-token')}`
                    },
                    body:JSON.stringify({
                        'username':user.user.username,
                        'file_name':file_name
                    })
                }
            )
            if (res.status === 200) {
                GetMapsList()
                setShowNot(true)
                setToastBgColor('success')
                setToastTextColor('text-white')
                setToastMessage('Los datos del mapa fueron eliminados!')
            }
        }
        DeleteMapData()
        setShowDelete(false)
    }

    useEffect(()=>{
        setListMaps(full_list_save) 
        const handleFilter = () => {
            const list_new_maps:mapDataElement[] = []
            if (full_list_save && filter !== ''){
                setFilter(filter.replace(/\s+/g, '_').toLowerCase())
                for (let i=0; i<full_list_save.length; i++) {
                    if (full_list_save[i].diagnostic_label.toLowerCase().replace(/\s+/g, '_').includes(filter) || full_list_save[i].units_label.toLowerCase().replace(/\s+/g, '_').includes(filter) || full_list_save[i].file_name.toLowerCase().replace(/\s+/g, '_').includes(filter)) {
                        list_new_maps.push(full_list_save[i])
                    }
                }
                setListMaps(list_new_maps)
            } 
        }
        handleFilter()
    },[filter])

    

    return(
        <>
            <Card className="mt-3 mb-3 shadow"  style={{height:'825px'}}>
                <Card.Header>
                    <Row>
                        <Col xl={8} lg={8} md={6} sm={12}>
                            <h4>Mis Mapas</h4>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={12}>
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
                                <IconButton title="Ordenar por diagnóstico" color="inherit" onClick={e=>setOrder('diagnostic')}><FormatLineSpacing/></IconButton>
                                    Diagnóstico
                                </th>
                                <th className="bg-primary text-white" style={{width:'120px'}}>
                                <IconButton title="Ordenar por unidad" color="inherit" onClick={e=>setOrder('unit')}><FormatLineSpacing/></IconButton>
                                    Unidad
                                </th>
                                <th className="bg-primary text-white" style={{width:'280px'}}>
                                <IconButton title="Ordenar por archivo" color="inherit" onClick={e=>setOrder('file_name')}><FormatLineSpacing/></IconButton>
                                    Archivo
                                </th>
                                <th className="bg-primary text-white pb-3" style={{width:'100px'}}>
                                    Administrar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_maps && list_maps.map((map_element, index)=>(
                                <tr>
                                    <td className="text-center">{index+1}</td>
                                    <td>{map_element.diagnostic_label}</td>
                                    <td>{map_element.units_label}</td>
                                    <td><div style={{height:'auto', maxHeight:'20px', overflow:'hidden'}} title={map_element.file_name}>{map_element.file_name}</div></td>
                                    <td>
                                        <IconButton title="Abrir Mapa" color="inherit" onClick={e=>handleOpenModal(map_element)}><OpenWith/></IconButton>
                                        <IconButton title="Eliminar" color="error" onClick={e=>handleOpenDeleteModal(map_element.file_name)}><Delete/></IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                </Card.Body>
            </Card>


            <Modal show={showModal} onHide={handleCloseModal} className="modal-xl">
                <Modal.Header closeButton>
                    <Modal.Title className="fs-5">{map?.diagnostic_label} / {map?.units_label} / Numero de Polígonos: {map?.polygons}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Maps2dArea 
                            //@ts-ignore
                            geojson={geojsonObj} 
                            center={{lat:25, lon:-89}}
                            zoom={6} 
                            fill_opacity={fill_opacity} 
                            line_weight={line_weight}
                            units={map?.units || ''} 
                        />
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Row className='ps-3 pe-3 w-100'>
                        <Card className="shadow">
                            <h4 className="mt-2 fs-6">Estilos</h4>
                            <hr className="mt-0 mb-1"/>
                            <Row>
                                <Col xl={6} lg={6} md={6} sm={12} >
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Grueso de lineas: {line_weight}px</Form.Label>
                                        <Form.Range max={2} min={0} step={0.1} defaultValue={line_weight} onChange={e=>setLineWeight(parseFloat(e.target.value))}/>
                                    </Form.Group>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={12} >
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Opacidad de poligonos: {(fill_opacity * 100).toFixed(0)}%</Form.Label>
                                        <Form.Range max={1} min={0} step={0.05} defaultValue={fill_opacity} onChange={e=>setFillOpacity(parseFloat(e.target.value))}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Datos de este Mapa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>¿Está seguro(a) que desea eliminar los datos de este mapa? Esta acción es irrebersible</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" form="load_file" onClick={e=>handleDeleteMapData(element_delete)}>
                        Eliminar
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            <MyToast position={'bottom-end'} bg_color={toast_bg_color} text_color={toast_text_color} show={showNot} close={setShowNot} body_text={toast_message}/>
        </>
    )
}

export default MyDiagnostics