import React, { useEffect, useContext, useState } from "react";
import { Card, Table, Modal, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import GeoJsonObject from "geojson";
import Cookies from "js-cookie";
import { UserContext } from "../context/context_provider";
import { IconButton, Slider } from "@mui/material";
import { Delete, FormatLineSpacing, Search, Map, Equalizer } from '@mui/icons-material';
import Maps2dArea from "../components/maps_2d_area";
import VerticalCut3dGraph from "../components/vertical_cut_3d_graph";
import MyToast from "../components/my_toast";


const diagnostic_labels = {
    'punto_de_condensacion': 'Punto de Condensación',
    'temperatura': 'Temperatura',
    'altura_del_terreno': 'Altura del Terreno',
    'temperatura_superior_nubes': 'Temperatura Superior de las Nubes',
    'helicidad_relativa_tormenta': 'Helicidad Realtiva de Tormenta',
    'agua_precipitable': 'Agua Precipitable',
    'humedad_relativa': 'Humedad Relativa',
    'presion_nivel_del_mar': 'Presion a Nivel del Mar',
    'helicidad_corriente_ascendente': 'Helicidad de Corriente Ascendente'
}


const units_lables = {
    'degC': 'grados C',
    'degCT': 'gradosC',
    'degF': 'grados F',
    'K': 'K',
    'Pa': 'Pa',
    'hPa': 'hPa',
    'mb': 'mb',
    'torr': 'torr',
    'mmhg': 'mmhg',
    'atm': 'atm',
    'm': 'm',
    'km': 'km',
    'dm': 'dm',
    'ft': 'pies',
    'mi': 'millas',
    'defaultK': 'K',
    'defaultm2': 'm2',
    'default%': 'porciento',
    'defaultkg': 'kg'
}

const graphic_color_palets = ['Blackbody', 'Bluered', 'Blues', 'Earth', 'Electric', 'Greens', 'Greys', 'Hot', 'Jet', 'Picnic', 'Portland', 'Rainbow', 'RdBu', 'Reds', 'Viridis', 'YlGnBu', 'YlOrRd', 'Plasma', 'Cividis']



interface diagnosticDataElement{
    geojson: string,
    lat: number,
    lon: number,
    diagnostic_label:string,
    map_palet:string,
    date_time:string,
    units_label:string,
    polygons: number,
    file_name:string,
    diagnostic: string,
    units: string,
    data: Array<number>,
    x: Array<number>,
    y: Array<number>,
    min_x: number,
    max_x: number,
    min_y: number,
    max_y: number,
}

function MyDiagnostics(){

    const user = useContext(UserContext)
    const [list_diagnostics, setListDiagnostics] = useState<diagnosticDataElement[]>()
    const [order, setOrder] = useState<string>('diagnostic')
    const [showModal, setShowModal] = useState(false)
    const [showModalGraph, setShowModalGraph] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [center, setCenter] = useState([28, -89])
    const [diagnostic, setDiagnostic] = useState<diagnosticDataElement>()
    const [diagnostic_label, setDiagnosticLabel] = useState<string>('')
    const [graphic_palet, setGraphicPalet] = useState('RdBu')
    const [geojsonObj, setGeoJsonObj] = useState<typeof GeoJsonObject | null>(null)
    const [units, setUnits] = useState<string>(localStorage.getItem('units') || 'degC')
    const [line_weight, setLineWeight] = useState( 0 )
    const [fill_opacity, setFillOpacity] = useState( 0.5 )
    const [element_delete, setElementDelete] = useState<string>('')
    const [filter, setFilter] = useState('')
    const [full_list_save, setFullListSave] = useState<diagnosticDataElement[]>()

    const [data, setData] = useState<Array<number>>()
    const [x, setX] = useState<Array<number>>()
    const [y, setY] = useState<Array<number>>()
    const [minX, setMinX] = useState<number>()
    const [maxX, setMaxX] = useState<number>()
    const [minY, setMinY] = useState<number>()
    const [maxY, setMaxY] = useState<number>()
    const [rangeX, setRangeX] = useState<number[]>()
    const [rangeY, setRangeY] = useState<number[]>()

    let [showNot, setShowNot] = useState(false)
    let [toast_message, setToastMessage] = useState<string>('')
    let [toast_bg_color, setToastBgColor] = useState<string>('')
    let [toast_text_color, setToastTextColor] = useState('')


    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleCloseModalGraph = () => {
        setShowModalGraph(false)
    }

    const handleCloseDeleteModal = () => {
        setShowDelete(false)
    }

    const handleOpenDeleteModal = (element:string) => {
        setShowDelete(true)
        setElementDelete(element)
    }

    const handleOpenModal = (diagnostic_element:diagnosticDataElement) => {
        console.log(diagnostic_element)
        setDiagnostic(diagnostic_element)
        let geo:typeof GeoJsonObject = JSON.parse(diagnostic_element.geojson).features
        setGeoJsonObj(geo)
        setCenter([diagnostic_element.lat, diagnostic_element.lon])
        setShowModal(true)
    }

    const handleOpenModalGraph = (diagnostic_element:diagnosticDataElement) => {
        setDiagnostic(diagnostic_element)
        setDiagnosticLabel(diagnostic_element.diagnostic_label)
        setUnits(diagnostic_element.units_label)
        //@ts-ignore
        setData(JSON.parse(diagnostic_element.data))
        //@ts-ignore
        setX(JSON.parse(diagnostic_element.x))
        //@ts-ignore
        setY(JSON.parse(diagnostic_element.y))
        setMinX(diagnostic_element.min_x)
        setMaxX(diagnostic_element.max_x)
        setMinY(diagnostic_element.min_y)
        setMaxY(diagnostic_element.max_y)
        setRangeX([diagnostic_element.min_x, diagnostic_element.max_x])
        setRangeY([diagnostic_element.min_y, diagnostic_element.max_y])
        setShowModalGraph(true)
    }

    const GetDiagnosticList = async () => {
        try {
            const res = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/get-diagnostic-list/`,
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
            const response:diagnosticDataElement[] = await res.json()
            setListDiagnostics(response)
            setFullListSave(response)
            console.log(list_diagnostics)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        GetDiagnosticList()
    },[order])

    const handleDeleteMapData = (file_name:string) => { 
        const DeleteMapData = async () => {
            try {
                const res = await fetch(
                    `${process.env["REACT_APP_API_URL"]}/api/delete-diagnostic/`,
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
                    GetDiagnosticList()
                    setShowNot(true)
                    setToastBgColor('success')
                    setToastTextColor('text-white')
                    setToastMessage('Los datos del mapa fueron eliminados!')
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        DeleteMapData()
        GetDiagnosticList()
        setShowDelete(false)
    }

    useEffect(()=>{
        setListDiagnostics(full_list_save) 
        const handleFilter = () => {
            const list_new_diagnostics:diagnosticDataElement[] = []
            if (full_list_save && filter !== ''){
                setFilter(filter.replace(/\s+/g, '_').toLowerCase())
                for (let i=0; i<full_list_save.length; i++) {
                    if (full_list_save[i].diagnostic_label.toLowerCase().replace(/\s+/g, '_').includes(filter) || full_list_save[i].units_label.toLowerCase().replace(/\s+/g, '_').includes(filter) || full_list_save[i].date_time.toLowerCase().replace(/\s+/g, '_').includes(filter)) {
                        list_new_diagnostics.push(full_list_save[i])
                    }
                }
                setListDiagnostics(list_new_diagnostics)
            } 
        }
        handleFilter()
    },[filter])


    const minDistance = 2;

    const handleChangeXaxis = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                setRangeX([newValue[0], newValue[0] + minDistance]);
            } else {
                setRangeX([newValue[1] - minDistance, newValue[1]]);
            }
        } else {
            setRangeX(newValue as number[]);
        }
    }

    const handleChangeYaxis = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                setRangeY([newValue[0], newValue[0] + minDistance]);
            } else {
                setRangeY([newValue[1] - minDistance, newValue[1]]);
            }
        } else {
            setRangeY(newValue as number[]);
        }
    }

    

    return(
        <>
            <Card className="mt-3 mb-3 shadow">
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
                    <div className="border rounded">
                    <Table striped bordered hover>
                        <thead className="shadow">
                            <tr>
                                <th className="bg-primary text-white text-center pb-3" style={{width:'50px'}}>
                                    #
                                </th>
                                <th className="bg-primary text-white" style={{width:'350px'}}>
                                <IconButton title="Ordenar por diagnóstico" color="inherit" onClick={e=>setOrder('diagnostic')}><FormatLineSpacing/></IconButton>
                                    Diagnóstico
                                </th>
                                <th className="bg-primary text-white" style={{width:'200px'}}>
                                <IconButton title="Ordenar por diagnóstico" color="inherit" onClick={e=>setOrder('map_palet')}><FormatLineSpacing/></IconButton>
                                    Paleta de Mapa
                                </th>
                                <th className="bg-primary text-white" style={{width:'120px'}}>
                                <IconButton title="Ordenar por unidad" color="inherit" onClick={e=>setOrder('unit')}><FormatLineSpacing/></IconButton>
                                    Unidad
                                </th>
                                <th className="bg-primary text-white" style={{width:'200px'}}>
                                <IconButton title="Ordenar por archivo" color="inherit" onClick={e=>setOrder('date_time')}><FormatLineSpacing/></IconButton>
                                    Fecha de Diagnóstico
                                </th>
                                <th className="bg-primary text-white pb-3" style={{width:'150px'}}>
                                    Administrar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_diagnostics && list_diagnostics.map((diagnostic_element, index)=>(
                                <tr>
                                    <td className="text-center pt-3">{index+1}</td>
                                    <td className="pt-3">{diagnostic_element.diagnostic_label}</td>
                                    <td className="pt-3">{diagnostic_element.map_palet}</td>
                                    <td className="pt-3">{diagnostic_element.units_label}</td>
                                    <td className="pt-3"><div style={{height:'auto', maxHeight:'20px', overflow:'hidden'}} title={diagnostic_element.date_time}>{diagnostic_element.date_time}</div></td>
                                    <td>
                                        <IconButton title="Abrir Mapa" color="success" onClick={e=>handleOpenModal(diagnostic_element)}><Map/></IconButton>
                                        <IconButton title="Abrir Gráfica" color="success" onClick={e=>handleOpenModalGraph(diagnostic_element)}><Equalizer/></IconButton>
                                        <IconButton title="Eliminar" color="error" onClick={e=>handleOpenDeleteModal(diagnostic_element.file_name)}><Delete/></IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                </Card.Body>
            </Card>


            <Modal show={showModal} onHide={handleCloseModal} className="modal-xl" style={{minHeight:'700px'}}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-5">{diagnostic?.diagnostic_label} / {diagnostic?.units_label} / Numero de Polígonos: {diagnostic?.polygons}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '67vh' }}>
                    <Card style={{ maxHeight: '63vh' }}>
                        <Maps2dArea 
                            key={JSON.stringify(center)}
                            //@ts-ignore
                            geojson={geojsonObj} 
                            center={center}
                            zoom={6} 
                            fill_opacity={fill_opacity} 
                            line_weight={line_weight}
                            units={diagnostic?.units || ''} 
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
                    <span>¿Está seguro(a) que desea eliminar los datos de este diagnóstico? Esta acción es irrebersible</span>
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

            <Modal show={showModalGraph} onHide={handleCloseModalGraph} className="modal-xl" style={{ minHeight: '800px' }}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-5">{
                        //@ts-ignore
                        diagnostic_labels[diagnostic]
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ minHeight: '65vh' }}>
                    <Card style={{ minHeight: '62vh' }} className="p-3">
                        <VerticalCut3dGraph
                            z={data}
                            x={x}
                            y={y}
                            colorscale={graphic_palet}
                            //@ts-ignore
                            labelTitle={diagnostic_label}
                            //@ts-ignore
                            labelUnit={units}
                            rangeX={rangeX}
                            rangeY={rangeY}
                        />
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Row className='ps-3 pe-3 w-100'>
                        <Card className="shadow">
                            <h4 className="mt-2 fs-6">Cortes Verticales</h4>
                            <hr className="mt-0 mb-1" />
                            <Row className="ps-3 pe-3">
                                <Col xl={4} lg={4} md={4} sm={12} className="ps-4 pe-4">
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Seleccionar Rango de Longitudes ( x )</Form.Label>    
                                        <Slider
                                            value={rangeX}
                                            onChange={handleChangeXaxis}
                                            valueLabelDisplay="auto"
                                            disableSwap
                                            //@ts-ignore
                                            min={minX}
                                            //@ts-ignore
                                            max={maxX}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={12} className="ps-4 pe-4">
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Seleccionar Rango de Latitudes ( y )</Form.Label>   
                                        <Slider
                                            value={rangeY}
                                            onChange={handleChangeYaxis}
                                            valueLabelDisplay="auto"
                                            disableSwap
                                            //@ts-ignore
                                            min={minY}
                                            //@ts-ignore
                                            max={maxY}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={12} >
                                <Form.Group className='mt-3 ps-3 pe-3 mb-3'>
                                    <Form.Label>Paletas del gráfico</Form.Label>
                                    <Form.Select onChange={e => setGraphicPalet(e.target.value)} defaultValue={graphic_palet}>
                                        {graphic_color_palets.map((color) => (
                                            <option value={color}>{color}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            </Row>
                        </Card>
                    </Row>
                </Modal.Footer>
            </Modal>

            <MyToast position={'bottom-end'} bg_color={toast_bg_color} text_color={toast_text_color} show={showNot} close={setShowNot} body_text={toast_message}/>
        </>
    )
}

export default MyDiagnostics