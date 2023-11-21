import { useEffect, useState } from "react"
import MaxMinGraph from "../components/max_min_graph"
import { Card } from "react-bootstrap"


interface DIAG_MAX_MIN {
    diag_label:string,
    max_list:number[],
    min_list:number[],
    dates:string[],
    unit:string
}


function MaxMin(){

    const [list_max_min, setListMaxMin] = useState<DIAG_MAX_MIN[]>([])

    useEffect(()=>{
        const getMaxMinData = async () => {
            const res = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/get-max-min/m91urias@gmail.com`,
            )
            const data:DIAG_MAX_MIN[] = await res.json()
            setListMaxMin(data)

        }
        getMaxMinData()
    }, [])

    return (
        <>
            {
                list_max_min.map((diag)=>(
                    <Card className="mt-3">
                        <MaxMinGraph diag_label={diag.diag_label} max_list={diag.max_list} min_list={diag.min_list} dates={diag.dates} unit={diag.unit}/>
                    </Card>
                ))
            }
        </>
    )
}

export default MaxMin