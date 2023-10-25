//@ts-nocheck
import React from "react";
import Plot from 'react-plotly.js';


function Maps3d(){

    const layout = {
        width: 1000, 
        height: 800, 
        title:{
            text:'Presion Sobre el Nivel del Mar',
        },
        paper_bgcolor:'#212529',
        font: {
            color:'white',
        },
        scene:{
/*             aspectmode: 'manual',
            aspectratio: {x: 2, y: 2, z: 0.8}, */
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
                range:[0,4.5],
            },
        },
    }

    return(
        <>
            <h1>Mapas con variables de 3d</h1>
            <Plot
                data={[{
                        z: [[3,5,7,8,5],[2,4,5,6,7,4],[3,5,6,7,7,5],[3,4,5,6,7,8],[3,4,5,6,7,8],[3,4,5,6,7,8],[3,4,5,6,7,8]],
                        x: [1,2,3,4,5,6,7],
                        y: [1,2,3,4,5,6,7],
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

export default Maps3d