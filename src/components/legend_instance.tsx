import React from "react";

interface LegendProps {
    color: string,
    from: number,
    to: number
}


const LegendInstance:React.FC<LegendProps> = ({color, to, from}) => {
    return(
        <>
            <i style={{backgroundColor:`${color}`, opacity:'0.3'}}></i>
        </>
    )
}

export default LegendInstance