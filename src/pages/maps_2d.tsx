import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import 'leaflet/dist/leaflet.css'
import Maps2dArea from "../components/maps_2d_area";
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



function Maps2d(){

    const [url, setUrl]:any = useState()
    let [geojson, setGeoJson] = useState<typeof GeoJsonObject | null>()
    let [center, setCenter] = useState({lat:25, lon:-87})
    let [zoom, setZoom] = useState(6)
    let [diagnostic, setDiagnostic] = useState( localStorage.getItem('diacnostic') || 'punto_de_condensacion')
    let [lvl, setLvL] = useState<number[] | undefined>()
    let [units, setUnits] = useState<string | null>('')
    let [unit_label, setUnitLabel] = useState<string>()
    let [list_units, setListUnits] = useState<UNIT[]>()

    const handleUnits = (value:any, label:any) => {
        setUnits(value)
        setUnitLabel(label)
    }
    

    const UnitsOptions = (diagnostic: string) => {
        switch (diagnostic) {
            case 'punto_de_condensacion':
                setUnits('degC')
                return [{unit: 'degC', label: 'grados C'}, {unit: 'K', label: 'K'}, {unit: 'degF', label: 'grados F'}]
                break;
            case 'temperatura':
                setUnits('defaultK')
                return [{unit: 'defaultK', label: 'K'}]
                break;
            case 'altura_del_terreno':
                setUnits('m')
                return [{unit: 'm', label: 'm'}, {unit: 'km', label: 'km'}, {unit: 'dm', label: 'dm'}, {unit: 'ft', label: 'pies'}, {unit: 'mi', label: 'millas'}]
                break
            case 'temperatura_superior_nubes':
                setUnits('degC')
                return [{unit: 'degC', label: 'grados C'}, {unit: 'K', label: 'K'}, {unit: 'degF', label: 'grados F'}]
                break 
            case 'helicidad_relativa_tormenta':
                setUnits('defaultm2')
                return [{unit: 'defaultm2', label: 'm2'}]
                break 
            case 'agua_precipitable':
                setUnits('defaultkg')
                return [{unit: 'defaultkg', label: 'kg'}]
                break 
            case 'humedad_relativa':
                setUnits('default%')
                return [{unit: 'default%', label: 'porciento'}]
                break 
            case 'presion_nivel_del_mar':
                setUnits('hPa')
                return [{unit: 'hPa', label: 'hPa'}, {unit: 'Pa', label: 'Pa'}, {unit: 'mb', label: 'mb'}, {unit: 'torr', label: 'torr'}, {unit: 'mmhg', label: 'mmhg'}, {unit: 'atm', label: 'atm'}]
                break 
            case 'helicidad_corriente_ascendente':
                setUnits('defaultm2')
                return [{unit: 'defaultm2', label: 'm2'}]
                break                                                                                  
        }
            
    
    } 

    console.log(units)

    useEffect(()=>{
        setListUnits(UnitsOptions(diagnostic)) 
    }, [diagnostic])


    window.onload = function (){
        let verifyData = localStorage.getItem('data')
        let dataRefresh
        if (verifyData){
            dataRefresh = JSON.parse(verifyData)
            setGeoJson(JSON.parse(dataRefresh.geojson).features)
            setCenter({lat: 25, lon: -87})
            setZoom(6)
            setLvL(dataRefresh.lvl)
            setUnits(units)
        }
    }


    const getMapData = async (e:any) => {
        e.preventDefault()
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
                    'url': url,
                    'diagnostic': diagnostic,
                    'units': units
                })
            }
        )
        let data = await res.json()
        let geojson:typeof GeoJsonObject = JSON.parse(data.geojson).features
        setGeoJson(geojson)
        setCenter({lat: 25, lon: -87})
        setZoom(6)
        setLvL(data.lvl)
        setUnits(units)
        localStorage.setItem('data', JSON.stringify(data))
        localStorage.setItem('diagnostic', diagnostic)
    }


    return(
        <>
            <div className='ps-2 pe-2'>
                <script type="text/javascript" src='leaflet/dist/leaflet.js' />
                <link rel="stylesheet" href="leaflet/dist/leaflet.css" />
                <Card className='mt-3'>
                    <h1 className='text-center'>Mapas con Variables en 2D</h1>
                </Card>
                <Row className='mt-3'>
                    <Col xl={9} lg={9} md={12} sm={12} className='mb-3'>
                        <Row className='ps-3 pe-3'>
                            <Card className='pt-3 pb-3'>
                                <Maps2dArea
                                //@ts-ignore
                                geojson={geojson}
                                center={center}
                                zoom={zoom}
                                lvl={lvl}
                                units={units}
                                unit_label={unit_label ? unit_label : ''}
                                />
                            </Card>
                        </Row>
                        <Row className='ps-3 pe-3 mt-3'>
                            <Card>
                                <p>Descripcion del mapa</p>
                            </Card>
                        </Row>
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12} className='mt-xl-0 mt-lg-0'>
                        <Card className='p-2'>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Direccion de Archivo</Form.Label>
                                    <Form.Control type={'text'} name={'wrf_url'} onChange={e=>setUrl(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Seleccionar Diagnóstico</Form.Label>
                                    <Form.Select onChange={e=>setDiagnostic(e.target.value)}>
                                        {diagnostic_options.map((diag)=>(
                                            <option value={diag.value} selected={diagnostic===diag.value}>{diag.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Unidad de Medición</Form.Label>
                                    <Form.Select onChange={e=>handleUnits(e.target.value, e.target.innerText)}>
                                        { list_units && list_units.map((unit)=>(
                                            <option id={unit.label}  value={unit.unit}>{unit.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Floating className='mt-3'>
                                    <Form.Control type={'text'} name={'wrf_3'} value=''/>
                                    <Form.Label>Tipo de datas</Form.Label>
                                </Form.Floating>
                                <Form.Floating className='mt-3'>
                                    <Form.Control type={'text'} name={'wrf_4'} value=''/>
                                    <Form.Label>Tipo de datas</Form.Label>
                                </Form.Floating>
                                <Form.Floating className='mt-3'>
                                    <Form.Control type={'text'} name={'wrf_5'} value=''/>
                                    <Form.Label>Tipo de datas</Form.Label>
                                </Form.Floating>
                                <Form.Group className='mt-3'>
                                    <Button type={'submit'} onClick={getMapData}>Mapear</Button>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Maps2d