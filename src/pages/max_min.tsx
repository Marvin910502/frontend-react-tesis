import { useEffect, useState, useContext } from "react"
import MaxMinGraph from "../components/max_min_graph"
import { Card } from "react-bootstrap"
import { UserContext } from "../context/context_provider"


interface DIAG_MAX_MIN {
    diag_label:string,
    max_list:number[],
    min_list:number[],
    dates:string[],
    unit:string
}


function MaxMin(){

    const [list_max_min, setListMaxMin] = useState<DIAG_MAX_MIN[]>([])

    const user = useContext(UserContext)

    useEffect(()=>{
        const getMaxMinData = async () => {
            const res = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/get-max-min/${user.user.username}`,
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
                    diag.diag_label !== 'Altura del terreno' &&
                    <div className="ps-2 pe-2 mb-5">
                        <Card className="mt-3 shadow ps-3 pe-3 pt-2 pb-2">
                            <MaxMinGraph diag_label={diag.diag_label} max_list={diag.max_list} min_list={diag.min_list} dates={diag.dates} unit={diag.unit}/>
                        </Card>
                    </div>
                    
                ))
            }
        </>
    )
}

export default MaxMin