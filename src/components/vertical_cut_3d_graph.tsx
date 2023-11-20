//@ts-nocheck
import React, { useEffect, useRef } from "react";
import Plot from 'react-plotly.js';


interface GRAPH_3D{
    x:number[] | undefined,
    y:number[] | undefined,
    z:number[] | undefined,
    colorscale: string | undefined,
    rangeX:number[] | undefined,
    rangeY:number[] | undefined,
    labelTitle:string | undefined,
    labelUnit:string | undefined,
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


const VerticalCut3dGraph:React.FC<GRAPH_3D> = ({ x, y, z, colorscale, labelTitle, labelUnit, rangeX, rangeY}) => {

    const bgColor = localStorage.getItem('themeMode') === 'dark' ? '#212529' : 'white'
    const textColor = localStorage.getItem('themeMode') === 'dark' ? 'white' : '#212529'

    const layout = {
        autosize:true,
        height:500,
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
        paper_bgcolor:bgColor,
        font: {
            color:textColor,
        },
        scene:{
            camera: {
                center: { x: 0, y: 0, z: 0 }, // Ubicación del centro de la cámara
                eye: { x: 2, y: -3.5, z: 1 }, // Ubicación del ojo de la cámara
                up: { x: 0, y: 0, z: 1 }, // Dirección hacia arriba de la cámara
                projection: { type: 'perspective' }, // Tipo de proyección (puede ser 'perspective' o 'orthographic')
              },
            aspectmode: 'manual',
            aspectratio: {x: 2.3, y: 2.3, z: 1.2},
            zaxis:{
                title:'Diagnóstico(z)',
                hoverformat:'.20f',
            },
            xaxis:{
                title:'Longitud(x)',
                hoverformat:'.20f',
                range:rangeX,               
            },
            yaxis:{
                title:'Latitud(y)',
                hoverformat:'.20f',
                range:rangeY,
            },

        },
    }

    const data = [{
        z: z,
        x: x,
        y: y,
        type: 'surface',
        colorscale: colorscale,
        contours: {
            z: {
              show:true,
              usecolormap: true,
              highlightcolor:"#42f462",
              project:{z: true}
            },
            },
        }]

    return(
        <>
            <Plot
                key={Math.random()}
                data={data}
                layout={layout}
                config={{responsive:true}}
            />
        </>
    )
}

export default VerticalCut3dGraph