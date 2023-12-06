import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import {GeoJsonObject} from "geojson";
import 'leaflet/dist/leaflet.css'
import React, { useState } from "react";
import Control from "react-leaflet-custom-control";
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter';
import {ControlPosition} from 'leaflet'
import {Card} from "react-bootstrap";
import { canvas } from 'leaflet';
import { match } from 'assert';

interface PluginOptions extends Object {
    cropImageByInnerWH?: boolean, // crop blank opacity from image borders
    hidden?: boolean, // hide screen icon
    preventDownload?: boolean, // prevent download on button click
    domtoimageOptions?: any, // see options for dom-to-image
    position?: ControlPosition, // position of take screen icon
    screenName?: string | (() => string), // string or function
    iconUrl?: string, // screen btn icon base64 or url
    hideElementsWithSelectors?: Array<string>,// by default hide map controls All els must be child of _map._container
    mimeType?: string, // used if format == image,
    caption?: string | (() => string | null) | null, // streeng or function, added caption to bottom of screen
    captionFontSize?: number,
    captionFont?: string,
    captionColor?: string,
    captionBgColor?: string,
    captionOffset?: number,
  }


  const pluginCreeen:PluginOptions = {
    hideElementsWithSelectors:[]
  }


interface Map{
    key:string | null,
    geojson:GeoJsonObject[] | null | undefined,
    center:number[] | null | undefined,
    zoom:number
    units:string | null
    line_weight:number,
    fill_opacity:number,
}

const units_lables = {
    'degC': 'grados C',
    'degCT': 'grados C',
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
    'defaultkg': 'kg',
    'defaultm2a': 'm2',
}

let screen_shot = false

const screen = new SimpleMapScreenshoter(pluginCreeen)

window.onload = ()=>{screen_shot=true}

const ScreenShot = () => {
    const map = useMap()
    screen.addTo(map)
    

    return(
        <></>
    )
}


const Maps2dArea:React.FC<Map> = ({
                                  key,
                                  geojson,
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

    console.log(units)
    return(
        <>
            <MapContainer
                key={key}
                style={{ width: "100%", maxHeight:'100%'}}
                zoom={zoom}
                //@ts-ignore
                center={center}
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
                                    <div key={'grade-'+index} style={{backgroundColor:`${geoItem.color}`, opacity:'0.5', width:'15px', height:'15px', marginRight:'5px'}}></div>
                                    <div style={{float:'right'}}>
                                        <label htmlFor={'grade'+index}>{geoItem.label}</label>
                                    </div>
                                </div>
                            </>
                        ))}
                    </Card>
                </Control>

                <ScreenShot/>

            </MapContainer>
        </>
    )
}

export default Maps2dArea