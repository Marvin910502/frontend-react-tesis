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
    units:string | null
    line_weight:number,
    fill_opacity:number,
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
                                  units,
                                  line_weight,
                                  fill_opacity
                                  }) => {

    const layetlist = []
    const legend_list = []
    if (geojson){
        for (let i= 0; i < geojson.length; i++){
            //@ts-ignore
            legend_list.push({color: geojson[i].properties.fill, label: geojson[i].properties.title})
            layetlist.push(
                <GeoJSON
                    key={Math.random()}
                    //@ts-ignore
                    data={geojson[i]}
                    //@ts-ignore
                    //pane={geojson[i].properties.title}
                    style={{
                        //@ts-ignore
                        fillColor: geojson[i].properties.fill,
                        weight: line_weight,
                        fillOpacity: fill_opacity,
                    }}
                />
            )
        }
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
                        {legend_list.map((geoItem, index) => (
                            <>
                                <div style={{display:"flex"}}>
                                    <div key={'grade-'+index} style={{backgroundColor:`${geoItem.color}`, opacity:'0.3', width:'15px', height:'15px', marginRight:'5px'}}></div>
                                    <div style={{float:'right'}}>
                                        <label htmlFor={'grade'+index}>{geoItem.label}</label>
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