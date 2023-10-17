import React, {useEffect, useState} from "react"
import Cookies from "js-cookie"
import {Button, Card, Col, Form, Row, Modal, Table} from "react-bootstrap"
import 'leaflet/dist/leaflet.css'
import Maps2dArea from "../components/maps_2d_area"
import GeoJsonObject from 'geojson'

const diagnostic_options = [
    {value: 'punto_de_condensacion', label: 'Punto de Condensación'},
    {value: 'temperatura', label: 'Temperatura'},
    {value: 'altura_del_terreno', label: 'Altura del Terreno'},
    {value: 'temperatura_superior_nubes', label: 'Temperatura Superior de las Nubes'},
    {value: 'helicidad_relativa_tormenta', label: 'Helicidad Realtiva de Tormenta'},
    {value: 'agua_precipitable', label: 'Agua Precipitable'},
    {value: 'humedad_relativa', label: 'Humedad Relativa'},
    {value: 'presion_nivel_del_mar', label: 'Presion a Nivel del Mar'},
    {value: 'helicidad_corriente_ascendente', label: 'Helicidad de Corriente Ascendente'}
]


interface UNIT {
    unit: string,
    label: string
}

interface FILE {
    name: string,
    path: string,
    size: string
}



function Maps2d(){

    let [geojson, setGeoJson] = useState<typeof GeoJsonObject | null>()
    let [center, setCenter] = useState({lat:25, lon:-87})
    let [zoom, setZoom] = useState(6)
    let [diagnostic, setDiagnostic] = useState( localStorage.getItem('diagnostic') || 'punto_de_condensacion')
    let [units, setUnits] = useState<string>(localStorage.getItem('units') || 'degC')
    let [list_units, setListUnits] = useState<UNIT[]>()
    let [max_index, setMaxIndex] = useState<number>(parseInt(localStorage.getItem('max_index') || '2'))
    let [index, setIndex] = useState(parseInt(localStorage.getItem('index') || '0'))
    let [section_amount, setSectionAmount] = useState(parseInt(localStorage.getItem('section_amount') || '10'))
    let [line_weight, setLineWeight] = useState(parseFloat(localStorage.getItem('line_weight') || '0.5'))
    let [fill_opacity, setFillOpacity] = useState(parseFloat(localStorage.getItem('fill_opacity') || '0.3'))
    let [list_file, setListFile] = useState<FILE[]>([])
    let [list_states, setListStates] = useState<boolean[]>()
    let [load_path, setLoadPath] = useState<string[]>(JSON.parse(localStorage.getItem('load_path') || '[]'))
    let [name_files_list, setNameFileList] = useState<string[]>(JSON.parse(localStorage.getItem('name_file_list') || '[]'))

    console.log(units)

    let initial_list_states:boolean[]

    console.log(load_path)

    const handleCleaning = () => {
        setGeoJson(null)
        setCenter({lat:25, lon:-87})
        setZoom(6)
        setDiagnostic('punto_de_condensacion')
        setUnits('degC')
        setIndex(0)
        setSectionAmount(10)
        setLineWeight(0.5)
        setFillOpacity(0.3)
        localStorage.removeItem('data')
        localStorage.removeItem('index')
        localStorage.removeItem('diagnostic')
        localStorage.removeItem('fill_opacity')
        localStorage.removeItem('line_weight')
        localStorage.removeItem('section_amount')
        localStorage.removeItem('units')
        localStorage.removeItem('load_path')
        localStorage.removeItem('name_file_list')
        localStorage.removeItem('max_index')
        window.location.reload()
    }


    useEffect(()=>{
        localStorage.setItem('line_weight', JSON.stringify(line_weight))
    },[line_weight])
    useEffect(()=>{
        localStorage.setItem('fill_opacity', JSON.stringify(fill_opacity))
    },[fill_opacity])
    useEffect(()=>{
        localStorage.setItem('load_path', JSON.stringify(load_path))
    },[load_path])
    useEffect(()=>{
        localStorage.setItem('name_file_list', JSON.stringify(name_files_list))
    },[name_files_list])
    useEffect(()=>{
        localStorage.setItem('max_index', JSON.stringify(max_index))
    },[max_index])


    const UnitsOptions = (diagnostic: string) => {
        switch (diagnostic) {
            case 'punto_de_condensacion':
                setUnits('degC')
                return [{unit: 'degC', label: 'grados C'}, {unit: 'K', label: 'K'}, {unit: 'degF', label: 'grados F'}]
            case 'temperatura':
                setUnits('defaultK')
                return [{unit: 'defaultK', label: 'K'}]
            case 'altura_del_terreno':
                setUnits('m')
                return [{unit: 'm', label: 'm'}, {unit: 'km', label: 'km'}, {unit: 'dm', label: 'dm'}, {unit: 'ft', label: 'pies'}, {unit: 'mi', label: 'millas'}]
            case 'temperatura_superior_nubes':
                setUnits('degC')
                return [{unit: 'degC', label: 'grados C'}, {unit: 'K', label: 'K'}, {unit: 'degF', label: 'grados F'}]
            case 'helicidad_relativa_tormenta':
                setUnits('defaultm2')
                return [{unit: 'defaultm2', label: 'm2'}]
            case 'agua_precipitable':
                setUnits('defaultkg')
                return [{unit: 'defaultkg', label: 'kg'}]
            case 'humedad_relativa':
                setUnits('default%')
                return [{unit: 'default%', label: 'porciento'}]
            case 'presion_nivel_del_mar':
                setUnits('hPa')
                return [{unit: 'hPa', label: 'hPa'}, {unit: 'Pa', label: 'Pa'}, {unit: 'mb', label: 'mb'}, {unit: 'torr', label: 'torr'}, {unit: 'mmhg', label: 'mmhg'}, {unit: 'atm', label: 'atm'}]
            case 'helicidad_corriente_ascendente':
                setUnits('defaultm2')
                return [{unit: 'defaultm2', label: 'm2'}]                                                                                
        }
            
    
    } 


    useEffect(()=>{
        setListUnits(UnitsOptions(diagnostic))
    }, [diagnostic])

    let local_unit = localStorage.getItem('units')
    useEffect(()=>{setUnits(localStorage.getItem('units') || 'degC')}, [local_unit])


    window.onload = function (){
        let verifyData = localStorage.getItem('data')
        let dataRefresh
        if (verifyData){
            dataRefresh = JSON.parse(verifyData)
            setGeoJson(JSON.parse(dataRefresh.geojson).features)
            setCenter({lat: 25, lon: -87})
            setZoom(6)
            setUnits(units)
        }
    }


    useEffect(()=>{
        const getMapData = async () => {
            const res = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/2d-variables-maps/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access-token')}`
                    },
                    body: JSON.stringify({
                        'url': load_path,
                        'diagnostic': diagnostic,
                        'units': units,
                        'index': index,
                        'section_amount': section_amount
                    })
                }
            )
            let data = await res.json()
            let geojson:typeof GeoJsonObject = JSON.parse(data.geojson).features
            setGeoJson(geojson)
            console.log(geojson)
            setCenter({lat: 25, lon: -87})
            setZoom(6)
            setUnits(units)
            localStorage.setItem('data', JSON.stringify(data))
            localStorage.setItem('diagnostic', diagnostic)
            localStorage.setItem('units', units)
            localStorage.setItem('section_amount', JSON.stringify(section_amount))
            localStorage.setItem('index', JSON.stringify(index))
        }
        if (load_path.length !== 0){
            getMapData()
        }
     
    },[index, load_path, units, section_amount])

    const getListFiles = async () => {
        const res = await fetch(
            `${process.env["REACT_APP_API_URL"]}/api/get-wrfout-list/`,
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
        setListFile(data)
    }

    useEffect(()=>{
        initial_list_states = []
        let count = list_file.length
        console.log(count)
        for (let i=0; i<count; i++){
            console.log(false)
            initial_list_states.push(false)
        }
        //console.log(initial_list_states)
        setListStates(initial_list_states)
    }, [list_file])

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    let load_path_array = []

    const handleLoadFiles = (e:any) => {
        e.preventDefault()
        let path_list:string[] = []
        let name_file_list:string[] = []
        if (list_file && list_states){
            for (let i=0; i<list_file.length; i++){
                if (list_states[i]){
                    path_list.push(list_file[i].path)
                    name_file_list.push(list_file[i].name) 
                }
            }
        }

        setLoadPath(path_list)
        setNameFileList(name_file_list)
        console.log(name_file_list.length)
        setMaxIndex(name_file_list.length * 3 - 1)    
        setShow(false)
    }

    const handleRowSelection = (index: string) => {
        console.log(index)
        let new_list_states:boolean[] = []
        if (list_states){
            let count = list_states.length
            for (let i=0; i<count; i++){
                if (i===parseInt(index)){
                    new_list_states.push(!list_states[i])
                }
                else{
                    new_list_states.push(list_states[i])
                }
            }
        }
        setListStates(new_list_states)
        console.log(new_list_states)
    }

    const handleShow = () => {
        getListFiles()
        setShow(true)
    }


/*     function Animate(){
        while(index<=max_index){
            setTimeout(()=>{
                setIndex(index++)
            },2000)
        }
    } */


    return(
        <>
            <div className='ps-2 pe-2'>
                <Row className='mt-3'>
                    <Col xl={9} lg={9} md={12} sm={12} className='mb-3'>
                        <Row className='ps-3 pe-3'>
                            <Card className='pt-3 pb-3 shadow'>
                                <Maps2dArea
                                //@ts-ignore
                                geojson={geojson}
                                center={center}
                                zoom={zoom}
                                units={units}
                                line_weight={line_weight}
                                fill_opacity={fill_opacity}
                                />
                            </Card>
                        </Row>
                        <Row className='ps-3 pe-3 mt-3'>
                            <Card className='pt-1 pb-1 shadow'>
                                <Row className="ps-2 pe-2">
                                    <Col xl={2} lg={12} md={12} sm={12} xs={12}>
                                    <h4 className="mt-1">Tiempo</h4>
                                    </Col>    
                                    <Col xl={9} lg={10} md={10} sm={10} xs={10}>
                                        <Form.Range className="mt-2" max={max_index} min={0} value={index} onChange={e=>setIndex(parseInt(e.target.value))} disabled={load_path.length === 0 && true}/>
                                    </Col>
                                    <Col xl={1} lg={2} md={2} sm={2} xs={2} className="pt-2">
                                        <span className="border rounded p-2">{index + 1}</span>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                        <Row className='ps-3 pe-3 mt-3'>
                            <Card className="shadow">
                                <h4 className="mt-2">Estilos</h4>
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
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12} className='mt-xl-0 mt-lg-0'>
                        <Card className='shadow mb-3'>
                            <h3 className='text-center'>Mapas con Variables en 2D</h3>
                        </Card>
                        <Card className='p-2 shadow'>
                            <h4 className="mt-2">Opciones</h4>
                            <hr className="mt-0"/>
                            <Form>
                                <Form.Group>
                                    <Row>
                                        <Form.Label>Archivo(s):</Form.Label>
                                    </Row>
                                    <Row>
                                        <Card className="ms-3 pt-2 pb-2 pt-3" style={{maxWidth:'90%', maxHeight:'120px'}}>
                                            <div style={{maxHeight:'120px', overflowY:'auto'}}>
                                            {name_files_list && name_files_list?.map((name)=>(
                                                <>
                                                    <small>{name}</small>
                                                    <hr/>
                                                </> 
                                            ))}
                                            </div>
                                        </Card> 
                                    </Row>
                                    {load_path.length === 0 && <div className="mt-2 bg-warning text-black rounded p-2 shadow"><small>Debe seleccionar el (los) archivo(s) para mapear</small></div>}
                                    <Form.Control type={'hidden'} name={'wrf_url'} value={load_path} required/>
                                    <Button className="mt-2" variant="primary" onClick={handleShow}>Selecionar Archivo(s)</Button>
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Seleccionar Diagnóstico</Form.Label>
                                    <Form.Select onChange={e=>setDiagnostic(e.target.value)} defaultValue={diagnostic}>
                                        {diagnostic_options.map((diag)=>(
                                            <option value={diag.value}>{diag.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Unidad de Medición</Form.Label>
                                    <Form.Select onChange={e=>setUnits(e.target.value)} defaultValue={units} value={units}>
                                        { list_units && list_units.map((unit)=>(
                                            <option value={unit.unit}>{unit.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Número de polígonos: {section_amount}</Form.Label>
                                    <Form.Range max={15} min={5} defaultValue={section_amount} onChange={e=>setSectionAmount(parseInt(e.target.value))}/>
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <Button onClick={handleCleaning}>Limpiar Mapa</Button>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Form id="load_file">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Agregar</th>
                                        <th>Nombre</th>
                                        <th>Tamaño</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list_file && list_file.map((file, index)=>(
                                        <tr>
                                            <td className='text-center'><Form.Check id={JSON.stringify(index)} value={file.path} name='file' onChange={e=>handleRowSelection(e.target.id)}/></td>
                                            <td className='text-center'>{file.name}</td>
                                            <td className='text-center'>{file.size}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Form>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" form="load_file" onClick={handleLoadFiles}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Maps2d