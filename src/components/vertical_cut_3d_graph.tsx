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
    labelX:string,
    labelY:string,
    labelZ:string,
    labelTitle:string,
}


const VerticalCut3dGraph:React.FC<GRAPH_3D> = ({x,y,z}) => {


    const layout = {
        margin:{
            l:0,
            r:0,
            b:0,
            t:50,
        },
        title:{
            text:'Presion Sobre el Nivel del Mar',
            x:0
        },
        paper_bgcolor:'#212529',
        font: {
            color:'white',
        },
        scene:{
            aspectmode: 'manual',
            aspectratio: {x: 2, y: 2, z: 0.8},
            zaxis:{
                title:'PSM(z)',
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
            />
        </>
    )
}

export default VerticalCut3dGraph