import Plot from "react-plotly.js"

interface GRAPH {
    diag_label:string,
    max_list:number[],
    min_list:number[],
    dates:string[],
    unit:string
}


const MaxMinGraph:React.FC<GRAPH> = ({diag_label, max_list, min_list, dates, unit}) => {

    const bgColor = localStorage.getItem('themeMode') === 'dark' ? '#212529' : 'white'
    const textColor = localStorage.getItem('themeMode') === 'dark' ? 'white' : '#212529'

    

    const layout = {
        title:diag_label,
        paper_bgcolor:bgColor,
        plotBgColor:'lightgray',
        font: {
            color:textColor,
        },
        xaxis:{
            title:'Fechas(x)',              
        },
        yaxis:{
            title:`${unit}(y)`,
            fixedrange: true
        },
    }

    const data = [
        {
            x:dates,
            y:min_list,
            name:'Mínimos'
        },
        {
            x:dates,
            y:max_list,
            name:'Máximos'
        },
    ]

    return (
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


export default MaxMinGraph