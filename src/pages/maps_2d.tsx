import React, {useState} from "react";
import Cookies from "js-cookie";
import {Button, Card, Col, Form, Image, Row} from "react-bootstrap";
//@ts-ignore
import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, Popup} from 'react-leaflet'
import Maps2dArea from "../components/maps_2d_area";
import GeoJsonObject from 'geojson'




function Maps2d(){

    const [url, setUrl]:any = useState()
    const [marker, setMarker] = useState(false)
    let [geojson, setGeoJson] = useState<typeof GeoJsonObject | null>()
    let [center, setCenter] = useState({lat:25, lon:-87})
    let [zoom, setZoom] = useState(6)

    function handleMarker(){
        setMarker(!marker)
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
                    'url': url
                })
            }
        )
        let data = await res.json()
        let geojson:typeof GeoJsonObject = JSON.parse(data.geojson).features
        setGeoJson(geojson)
        setCenter({lat: 25, lon: -87})
        setZoom(6)

    }


    return(
        <>
            <div className='ps-2 pe-2'>
                <script type="text/javascript" src='leaflet/dist/leaflet.js' />
                <link rel="stylesheet" href="leaflet/dist/leaflet.css" />
                <Card className='mt-3'>
                    <h1 className='text-center'>Mapas con variables en 2D</h1>
                </Card>
                <Row className='mt-3'>
                    <Col xl={9} lg={9} md={12} sm={12} className='mb-3'>
                        <Row className='ps-3 pe-3'>
                            <Card className='pt-3 pb-3'>

                                <Maps2dArea marker={marker}
                                //@ts-ignore
                                geojson={geojson}
                                center={center}
                                zoom={zoom}
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
                                    <Form.Label>Direccion de archivo</Form.Label>
                                    <Form.Control type={'text'} name={'wrf_url'} onChange={e=>setUrl(e.target.value)}/>
                                </Form.Group>
                                <Form.Floating className='mt-3'>
                                    <Form.Control type={'text'} name={'wrf_1'} value=''/>
                                    <Form.Label>Tipo de datas</Form.Label>
                                </Form.Floating>
                                <Form.Floating className='mt-3'>
                                    <Form.Control type={'text'} name={'wrf_2'} value=''/>
                                    <Form.Label>Tipo de datas</Form.Label>
                                </Form.Floating>
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