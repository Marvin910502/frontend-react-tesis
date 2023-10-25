//@ts-nocheck
import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";


interface GRAPH_3D{
    x:number[],
    y:number[],
    z:number[],
    propX:number,
    propY:number,
    propZ:number,
    cantX:number,
    cantY:number,
    cantZ:number,
    labelTitle:string,
    labelUnit:string
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
    'defaultkg': 'kg'
}


const VerticalCut3dGraph:React.FC<GRAPH_3D> = ({x,y,z,labelTitle, labelUnit}) => {


    const layout = {
        autosize:true,
        height:'100%',
        margin:{
            l:0,
            r:0,
            b:0,
            t:50,
        },
        title:{
            text:`Diagnóstico:<br>${labelTitle} ( ${labelUnit} )`,
            x:0
        },
        paper_bgcolor:'#212529',
        font: {
            color:'white',
        },
        scene:{
            camera: {
                center: { x: 0, y: 0, z: 0 }, // Ubicación del centro de la cámara
                eye: { x: 2, y: -3.5, z: 1 }, // Ubicación del ojo de la cámara
                up: { x: 0, y: 0, z: 1 }, // Dirección hacia arriba de la cámara
                projection: { type: 'perspective' }, // Tipo de proyección (puede ser 'perspective' o 'orthographic')
              },
            aspectmode: 'manual',
            aspectratio: {x: 2, y: 2, z: 0.8},
            zaxis:{
                title:'Diagnóstico(z)',
                hoverformat:'.20f',
                nticks:10,
            },
            xaxis:{
                title:'Longitud(x)',
                nticks:10,               
            },
            yaxis:{
                title:'Latitud(y)',
                nticks:10,
            },
        },
    }

    return(
        <>
            <Plot
                data={[{
                        z: z,
                        x: x,
                        y: y,
                        type: 'surface',
                        contours: {
                            z: {
                              show:true,
                              usecolormap: true,
                              highlightcolor:"#42f462",
                              project:{z: true}
                            },
                            x: {
                                show:true,
                                usecolormap: true,
                                highlightcolor:"#42f462",
                                project:{x: false}
                              }
                      },
                }]}
                layout={layout}
                config={{responsive:true}}
            />
        </>
    )
}

export default VerticalCut3dGraph