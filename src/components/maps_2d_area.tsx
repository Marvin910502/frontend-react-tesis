import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import {GeoJsonObject} from "geojson";
// import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React from "react";

interface Map{
    marker:boolean
    geojson:GeoJsonObject | null | undefined,
    center: {
        lat:number,
        lon:number
    },
    zoom:number
}

const Maps2dArea:React.FC<Map> = ({marker,
                                  geojson,
                                  center,
                                  zoom
                                  }) => {

    console.log(geojson)
    let layetlist = []
    if (geojson){
        //@ts-ignore
        for (let i= 0; i < geojson.length; i++){
            layetlist.push(
                <GeoJSON
                    //@ts-ignore
                    data={geojson[i]}
                    style={{
                        //@ts-ignore
                        fillColor: geojson[i].properties.fill,
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
                {
                  marker ?
                    <Marker position={[25, -87]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                      : ''
                }

                {layetlist}

            </MapContainer>
        </>
    )
}

export default Maps2dArea