import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import {GeoJsonObject} from "geojson";
import 'leaflet/dist/leaflet.css'
import React from "react";
import Control from "react-leaflet-custom-control";
import {Card} from "react-bootstrap";

interface Map{
    geojson:GeoJsonObject[] | null | undefined,
    center: {
        lat:number,
        lon:number
    },
    zoom:number
    lvl:number[] | undefined,
    units:string | null
    unit_label: string
}

const units_lables = {
    'degC': 'grados C',
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

const Maps2dArea:React.FC<Map> = ({geojson,
                                  center,
                                  zoom,
                                  lvl,
                                  units,
                                  unit_label
                                  }) => {

    let layetlist = []
    let legendlist = []
    let saveColors:string[] = []
    if (geojson){
        // for (let i= geojson.length-1; i >= 0; i--){
        //     //@ts-ignore
        //     saveColors.push(geojson[i].properties.fill)
        // }
        for (let i= 0; i < geojson.length; i++){
            //@ts-ignore
            saveColors.push(geojson[i].properties.fill)
            layetlist.push(
                <GeoJSON
                    key={Math.random()}
                    //@ts-ignore
                    data={geojson[i]}
                    style={{
                        //@ts-ignore
                        fillColor: geojson[i].properties.fill,
                        weight: 0.5,
                        fillOpacity: 0.3,
                    }}
                />
            )
            if (i !== geojson.length) {
                //@ts-ignore
                legendlist.push({from: lvl[i], to: lvl[i + 1]})
            }
        }
    }

    function getColor(i:number){
        if (geojson)
            return saveColors[i]
    }

    return(
        <>
            <MapContainer
                style={{ width: "100%", height: "65vh" }}
                zoom={zoom}
                center={[center.lat, center.lon]}
                scrollWheelZoom={false}
                fadeAnimation={true}
                markerZoomAnimation={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {layetlist}

                <Control
                // @ts-ignore
                position='bottomleft'
                >
                    <Card className='p-2'>
                        <strong>{
                        //@ts-ignore 
                        units_lables[units]
                        }</strong>
                        <hr className='mt-1 mb-1'/>
                        {legendlist.map((grade, index) => (
                            <>
                                <div style={{display:"flex"}}>
                                    <div key={'grade-'+index} style={{backgroundColor:`${getColor(index)}`, opacity:'0.3', width:'15px', height:'15px', marginRight:'5px'}}></div>
                                    <div style={{float:'right'}}>
                                        <label htmlFor={'grade'+index}>{grade.from} - {grade.to}</label>
                                    </div>
                                </div>
                            </>
                        ))}
                    </Card>
                </Control>

            </MapContainer>
        </>
    )
}

export default Maps2dArea