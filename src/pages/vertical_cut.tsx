import React, { useEffect, useState } from "react";
//@ts-ignore
import Plot from 'react-plotly.js';
import Cookies from "js-cookie";
import GeoJsonObject from "geojson";
import { Button } from "react-bootstrap";


function VerticalCut(){

    let [data, setData] = useState()
    let [x, setX] = useState()
    let [y, setY] = useState()

    const getCrossSectionData = async () => {
        const res = await fetch(
            `${process.env["REACT_APP_API_URL"]}/api/cross-sections/`,
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access-token')}`
                }
            }
        )
        const response = await res.json()
        setData(JSON.parse(response.data))
        setX(response.coords)
        setY(response.vertical)
        console.log(data)
        console.log(x)
        console.log(y)
    }

    //@ts-ignore
   //console.log(geojson[0].geometry.coordinates[0])

    useEffect(()=>{
        getCrossSectionData()
    },[])

    const X = ['26.8022, -91.8333', '26.8022, -91.5635', '26.8022, -91.2936', '26.8022, -91.0238', '26.8022, -90.7540', '26.8022, -90.4841', '26.8022, -90.2143', '26.8022, -89.9444', '26.8022, -89.6746', '26.8022, -89.4048', '26.8022, -89.1349', '26.8022, -88.8651', '26.8022, -88.5952', '26.8022, -88.3254', '26.8022, -88.0556', '26.8022, -87.7857', '26.8022, -87.5159', '26.8022, -87.2460', '26.8022, -86.9762', '26.8022, -86.7064']


    const layout = {
        width: 1000, 
        height: 800, 
        title: 'A Fancy Plot',
        scene:{
            zaxis:{
                hoverformat:'.20f'
            }    
        }
    }

    return(
        <>
            <Plot
                data={[{
                        z: data,
                        type: 'surface',
                        contours: {
                            //@ts-ignore
                            z: {
                              show:true,
                              usecolormap: true,
                              highlightcolor:"#42f462",
                              project:{z: true}
                            }
                      },
                }]}
                layout={layout}
            />
            <Button onClick={e=>getCrossSectionData()}>Graph</Button>
        </>
    )
}

export default VerticalCut