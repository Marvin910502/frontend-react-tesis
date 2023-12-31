import { useEffect, useState, useContext } from "react"
import Cookies from "js-cookie"
import { Button, Card, Col, Form, Row, Modal, Table } from "react-bootstrap"
import 'leaflet/dist/leaflet.css'
import Maps2dArea from "../components/maps_2d_area"
import GeoJsonObject from 'geojson'
import { UserContext } from "../context/context_provider"
import MyToast from "../components/my_toast"
import VerticalCut3dGraph from "../components/vertical_cut_3d_graph"
import { Delete, OpenWith, Save } from "@mui/icons-material"
import { LinearProgress, Slider } from "@mui/material"


const diagnostic_options = [
    { value: 'punto_de_condensacion', label: 'Punto de Condensación' },
    { value: 'temperatura', label: 'Temperatura' },
    { value: 'altura_del_terreno', label: 'Altura del Terreno' },
    { value: 'temperatura_superior_nubes', label: 'Temperatura Superior de las Nubes' },
    { value: 'helicidad_relativa_tormenta', label: 'Helicidad Relativa de Tormenta' },
    { value: 'agua_precipitable', label: 'Agua Precipitable' },
    { value: 'humedad_relativa', label: 'Humedad Relativa' },
    { value: 'presion_nivel_del_mar', label: 'Presión a Nivel del Mar' },
    { value: 'helicidad_corriente_ascendente', label: 'Helicidad de Corriente Ascendente' }
]


const diagnostic_labels = {
    'punto_de_condensacion': 'Punto de Condensación',
    'temperatura': 'Temperatura',
    'altura_del_terreno': 'Altura del Terreno',
    'temperatura_superior_nubes': 'Temperatura Superior de las Nubes',
    'helicidad_relativa_tormenta': 'Helicidad Relativa de Tormenta',
    'agua_precipitable': 'Agua Precipitable',
    'humedad_relativa': 'Humedad Relativa',
    'presion_nivel_del_mar': 'Presión a Nivel del Mar',
    'helicidad_corriente_ascendente': 'Helicidad de Corriente Ascendente'
}


const map_color_palets = ['RdYlBu', 'viridis', 'plasma', 'inferno', 'magma', 'cividis', 'Greys', 'Purples', 'Blues', 'Greens', 'Oranges', 'Reds', 'YlOrBr', 'YlOrRd', 'OrRd', 'PuRd', 'RdPu', 'BuPu', 'GnBu', 'PuBu', 'YlGnBu', 'PuBuGn', 'BuGn', 'YlGn', 'PiYG', 'PRGn', 'BrBG', 'PuOr', 'RdGy', 'RdBu', 'RdYlGn', 'Spectral', 'coolwarm', 'bwr', 'seismic', 'twilight_shifted', 'hsv', 'Pastel1', 'Paired', 'Accent', 'Dark2', 'Set1', 'tab10']

const graphic_color_palets = ['Blackbody', 'Bluered', 'Blues', 'Earth', 'Electric', 'Greens', 'Greys', 'Hot', 'Jet', 'Picnic', 'Portland', 'Rainbow', 'RdBu', 'Reds', 'Viridis', 'YlGnBu', 'YlOrRd', 'Plasma', 'Cividis']

const units_lables = {
    'degC': 'grados C',
    'degCT': 'gradosC',
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


interface UNIT {
    unit: string,
    label: string
}

export interface FILE {
    name: string,
    path: string,
    size: string
}


export interface mapData {
    center: number[],
    diagnostic: string,
    map_palet: string,
    graphic_palet: string,
    units: string,
    polygons: number,
    index: number,
    max_index: number,
    fill_opacity: number,
    line_weight: number,
    load_path: string[],
    name_files_list: string[]
}


const defaultMapData: mapData = {
    center: [25, -89],
    diagnostic: 'punto_de_condensacion',
    map_palet: 'coolwarm',
    graphic_palet: 'RdBu',
    units: 'degC',
    polygons: 10,
    index: 0,
    max_index: 2,
    fill_opacity: 0.5,
    line_weight: 0,
    load_path: [],
    name_files_list: []
}


function Diagnostics() {

    let user = useContext(UserContext)

    let [mapInicialData, setMapInicialData] = useState<mapData>(JSON.parse(localStorage.getItem('mapData') || 'null') || defaultMapData)

    const [geojson, setGeoJson] = useState<typeof GeoJsonObject | null>({})
    const [center, setCenter] = useState<number[]>(mapInicialData.center)
    const [date_time, setDateTime] = useState()
    const [zoom, setZoom] = useState(6)
    const [units, setUnits] = useState<string>(localStorage.getItem('units') || 'degC')
    const [diagnostic, setDiagnostic] = useState<string>(mapInicialData.diagnostic)
    const [maximum, setMaximum] = useState<number>()
    const [minimum, setMinimum] = useState<number>()
    const [map_palet, setMapPalet] = useState(mapInicialData.map_palet)
    const [graphic_palet, setGraphicPalet] = useState(mapInicialData.graphic_palet)
    const [list_units, setListUnits] = useState<UNIT[]>()
    const [max_index, setMaxIndex] = useState<number>(mapInicialData.max_index)
    const [index, setIndex] = useState<number>(mapInicialData.index)
    const [polygons, setPolygons] = useState(mapInicialData.polygons)
    const [line_weight, setLineWeight] = useState(mapInicialData.line_weight)
    const [fill_opacity, setFillOpacity] = useState(mapInicialData.fill_opacity)
    const [list_file, setListFile] = useState<FILE[]>([])
    const [list_states, setListStates] = useState<boolean[]>()
    const [load_path, setLoadPath] = useState<string[]>(mapInicialData.load_path)
    const [name_files_list, setNameFileList] = useState<string[]>(mapInicialData.name_files_list)
    
    const [showNot, setShowNot] = useState(false)
    const [toast_message, setToastMessage] = useState<string>('')
    const [toast_bg_color, setToastBgColor] = useState<string>('')
    const [toast_text_color, setToastTextColor] = useState('')

    const [spinnerMap, setSpinnerMap] = useState(false)
    const [spinnerGraph, setSpinnerGraph] = useState(false)

    const [data, setData] = useState()
    const [x, setX] = useState()
    const [y, setY] = useState()
    const [minX, setMinX] = useState()
    const [maxX, setMaxX] = useState()
    const [minY, setMinY] = useState()
    const [maxY, setMaxY] = useState()
    const [rangeX, setRangeX] = useState<number[]>()
    const [rangeY, setRangeY] = useState<number[]>()

    const [showModal, setShowModal] = useState(false)
    const [showModalGraph, setShowModalGraph] = useState(false)
    const [blockUnits, setBlockUnits] = useState(false)

    let initial_list_states: boolean[]


    //for cleaning the localStorage map data
    const handleCleaning = () => {
        localStorage.removeItem('mapData')
        window.location.reload()
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleCloseModalGraph = () => {
        setShowModalGraph(false)
    }

    const handleOpacity = async (n:number) => {
        setTimeout(resolve => 1000)
        setFillOpacity(n)
    }


    //for update localStorage with the current data after every change in this values
    useEffect(() => {
        mapInicialData.fill_opacity = fill_opacity
        mapInicialData.line_weight = line_weight
        mapInicialData.load_path = load_path
        mapInicialData.name_files_list = name_files_list
        mapInicialData.max_index = max_index
        localStorage.setItem('mapData', JSON.stringify(mapInicialData))
    }, [fill_opacity, line_weight, load_path, name_files_list, max_index])


    //units selector for the diagnostic
    const UnitsOptions = (diagnostic: string) => {
        switch (diagnostic) {
            case 'punto_de_condensacion':
                setUnits('degC')
                return [{ unit: 'degC', label: 'grados C' }, { unit: 'K', label: 'K' }, { unit: 'degF', label: 'grados F' }]
            case 'temperatura':
                setUnits('defaultK')
                return [{ unit: 'defaultK', label: 'K' }]
            case 'altura_del_terreno':
                setUnits('m')
                return [{ unit: 'm', label: 'm' }, { unit: 'km', label: 'km' }, { unit: 'dm', label: 'dm' }, { unit: 'ft', label: 'pies' }, { unit: 'mi', label: 'millas' }]
            case 'temperatura_superior_nubes':
                setUnits('degCT')
                return [{ unit: 'degCT', label: 'grados C' }, { unit: 'K', label: 'K' }, { unit: 'degF', label: 'grados F' }]
            case 'helicidad_relativa_tormenta':
                setUnits('defaultm2')
                return [{ unit: 'defaultm2', label: 'm2' }]
            case 'agua_precipitable':
                setUnits('defaultkg')
                return [{ unit: 'defaultkg', label: 'kg' }]
            case 'humedad_relativa':
                setUnits('default%')
                return [{ unit: 'default%', label: 'porciento' }]
            case 'presion_nivel_del_mar':
                setUnits('hPa')
                return [{ unit: 'hPa', label: 'hPa' }, { unit: 'Pa', label: 'Pa' }, { unit: 'mb', label: 'mb' }, { unit: 'torr', label: 'torr' }, { unit: 'mmhg', label: 'mmhg' }, { unit: 'atm', label: 'atm' }]
            case 'helicidad_corriente_ascendente':
                setUnits('defaultm2a')
                return [{ unit: 'defaultm2a', label: 'm2' }]
        }


    }

    //get the list of units for the current diagnostic
    useEffect(() => {
        setListUnits(UnitsOptions(diagnostic))
    }, [diagnostic])


    //for units not change in an infinite loop
    useEffect(() => { setUnits(mapInicialData.units || 'degC') }, [mapInicialData])


    useEffect(() => {
        const getCrossSectionData = async () => {
            setBlockUnits(true)
            try {
                setSpinnerGraph(true)
                const res = await fetch(
                    `${process.env["REACT_APP_API_URL"]}/api/cross-sections/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${Cookies.get('access-token')}`
                        },
                        body: JSON.stringify({
                            'username': user.user.username,
                            'url': load_path,
                            'diagnostic': diagnostic,
                            'units': units,
                            'index': index,
                        })
                    }
                )
                if (res.status === 200) {
                    setBlockUnits(false)
                    setSpinnerGraph(false)
                    const response = await res.json()
                    setData(JSON.parse(response.data))
                    setX(JSON.parse(response.longitudes))
                    setY(JSON.parse(response.latitudes))
                    setMinX(response.min_long)
                    setMaxX(response.max_long)
                    setMinY(response.min_lat)
                    setMaxY(response.max_lat)
                    setRangeX([response.min_long, response.max_long])
                    setRangeY([response.min_lat, response.max_lat])
                }
                if (res.status === 500) {
                    setBlockUnits(false)
                    setSpinnerGraph(false)
                    setShowNot(true)
                    setToastBgColor('danger')
                    setToastTextColor('text-white')
                    setToastMessage('Error del servidor!')
                }
                if (res.status === 400) {
                    setBlockUnits(false)
                    setSpinnerGraph(false)
                    let data = await res.json()
                    if (data.error === 'No url data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontró ninguna url válida!')
                    }
                    if (data.error === 'No diagnostic data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontró ningún diagnóstico válido!')
                    }
                    if (data.error === 'No index data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontró ningún index correcto!')
                    }
                    if (data.error === 'No units data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontró unidad de medida correcta!')
                    }
                    if (data.error === 'No polygons data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontro el número de polígonos!')
                    }
                }
            }
            catch (error){
                console.log(error)
                setShowNot(true)
                setToastBgColor('danger')
                setToastTextColor('text-white')
                setToastMessage('No hubo respuesta del servidor!')
            }
        }
        if (load_path.length !== 0) {
            getCrossSectionData()
        }
    },[index, load_path, units])


    //hook for make a request every time than a value of the form changes
    useEffect(() => {
        const getMapData = async () => {
            setBlockUnits(true)
            try {
                setSpinnerMap(true)
                const res = await fetch(
                    `${process.env["REACT_APP_API_URL"]}/api/2d-variables-maps/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${Cookies.get('access-token')}`
                        },
                        body: JSON.stringify({
                            'username': user.user.username,
                            'url': load_path,
                            'diagnostic': diagnostic,
                            'map_palet': map_palet,
                            'units': units,
                            'index': index,
                            'polygons': polygons
                        })
                    }
                )
                if (res.status === 200) {
                    setBlockUnits(false)
                    setSpinnerMap(false)
                    let data = await res.json()
                    let geojson: typeof GeoJsonObject = JSON.parse(data.geojson)
                    //@ts-ignore
                    setGeoJson(geojson)
                    setCenter([data.lat, data.lon])
                    setZoom(6)
                    setUnits(units)
                    setMaxIndex(data.max_index)
                    setDateTime(data.date_time)
                    setMaximum(data.maximum)
                    setMinimum(data.minimum)
                    //saving on the localStorage
                    const mapCurrentData: mapData = {
                        center: [data.lat, data.lon],
                        diagnostic: diagnostic,
                        map_palet: map_palet,
                        graphic_palet: graphic_palet,
                        units: units,
                        polygons: polygons,
                        index: index,
                        max_index: max_index,
                        fill_opacity: fill_opacity,
                        line_weight: line_weight,
                        load_path: load_path,
                        name_files_list: name_files_list
                    }
                    setMapInicialData(mapCurrentData)
                    localStorage.setItem('mapData', JSON.stringify(mapCurrentData))
                    localStorage.setItem('units', units)
                }
                if (res.status === 500) {
                    setBlockUnits(false)
                    setSpinnerMap(false)
                    setShowNot(true)
                    setToastBgColor('danger')
                    setToastTextColor('text-white')
                    setToastMessage('Error del servidor!')
                }
                if (res.status === 400) {
                    setBlockUnits(false)
                    setSpinnerMap(false)
                    let data = await res.json()
                    if (data.error === 'No url data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontró ninguna url válida!')
                    }
                    if (data.error === 'No diagnostic data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontró ningún diagnóstico válido!')
                    }
                    if (data.error === 'No index data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontró ningún index correcto!')
                    }
                    if (data.error === 'No units data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontró unidad de medida correcta!')
                    }
                    if (data.error === 'No polygons data') {
                        setShowNot(true)
                        setToastBgColor('danger')
                        setToastTextColor('text-white')
                        setToastMessage('No se encontro el número de polígonos!')
                    }
                }
            }
            catch (error){
                console.log(error)
                setShowNot(true)
                setToastBgColor('danger')
                setToastTextColor('text-white')
                setToastMessage('No hubo respuesta del servidor!')
            }
        }
        if (load_path.length !== 0) {
            getMapData()
        }
    }, [index, load_path, units, polygons, map_palet])


    // request for get the list of wrfout files in the default folder
    const getListFiles = async () => {
        try {
            const res = await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/get-wrfout-list/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access-token')}`
                    },
                    body: JSON.stringify({
                        'username': user.user.username,
                        'order': 'name'
                    })
                }
            )
            const data = await res.json()
            setListFile(data)
        }
        catch (error) {
            console.log(error)
        }
    }


    //for save the map data in the database
    const saveDiagnosticData = async () => {
        setShowNot(false)
        try {
            if (load_path.length !== 0) {
                let file_name: string = ''
                //@ts-ignore
                file_name = `${map_palet}-${diagnostic}-${units_lables[mapInicialData.units]}-${date_time}`
                const res = await fetch(
                    `${process.env["REACT_APP_API_URL"]}/api/save-diagnostic/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${Cookies.get('access-token')}`
                        },
                        body: JSON.stringify({
                            'username': user.user.username,
                            'geojson': JSON.stringify(geojson),
                            'lat': center[0],
                            'lon': center[1],
                            'date_time': date_time,
                            'diagnostic': diagnostic,
                            'map_palet': map_palet,
                            'maximum': maximum,
                            'minimum': minimum,
                            'units': mapInicialData.units,
                            'polygons': polygons,
                            'file_name': file_name,
                            'z': data,
                            'x': x,
                            'y': y,
                            'minX': minX,
                            'maxX': maxX,
                            'minY': minY,
                            'maxY': maxY,
                        })
                    }
                )
                if (res.status === 201) {
                    setShowNot(true)
                    setToastBgColor('success')
                    setToastTextColor('text-white')
                    setToastMessage('Los datos de este mapa fueron guardados!')
                }
                if (res.status === 208) {
                    setShowNot(true)
                    setToastBgColor('danger')
                    setToastTextColor('text-white')
                    setToastMessage('Ya guardo este mapa anteriormente!')
                }
            }
            else {
                setShowNot(true)
                setToastBgColor('warning')
                setToastTextColor('text-black')
                setToastMessage('No hay datos para salvar')
            }
        }
        catch (error) {
            console.log(error)
            setShowNot(true)
            setToastBgColor('danger')
            setToastTextColor('text-white')
            setToastMessage('No hubo respuesta del servidor!')
        }
    }


    useEffect(() => {
        initial_list_states = []
        let count = list_file.length
        for (let i = 0; i < count; i++) {
            initial_list_states.push(false)
        }
        setListStates(initial_list_states)
    }, [list_file])

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    const handleLoadFiles = (e: any) => {
        e.preventDefault()
        let path_list: string[] = []
        let name_file_list: string[] = []
        if (list_file && list_states) {
            for (let i = 0; i < list_file.length; i++) {
                if (list_states[i]) {
                    path_list.push(list_file[i].path)
                    name_file_list.push(list_file[i].name)
                }
            }
        }

        setLoadPath(path_list)
        setNameFileList(name_file_list)
        setIndex(0)
        setShow(false)
        setShowNot(true)
        setToastBgColor('success')
        setToastTextColor('text-white')
        setToastMessage('Los archivos fueron cargados con éxito!')
    }

    const handleRowSelection = (index: string) => {
        let new_list_states: boolean[] = []
        if (list_states) {
            let count = list_states.length
            for (let i = 0; i < count; i++) {
                if (i === parseInt(index)) {
                    new_list_states.push(!list_states[i])
                }
                else {
                    new_list_states.push(list_states[i])
                }
            }
        }
        setListStates(new_list_states)
    }

    const handleShow = () => {
        getListFiles()
        setShow(true)
    }


    const minDistance = 2;

    const handleChangeXaxis = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                setRangeX([newValue[0], newValue[0] + minDistance]);
            } else {
                setRangeX([newValue[1] - minDistance, newValue[1]]);
            }
        } else {
            setRangeX(newValue as number[]);
        }
    }

    const handleChangeYaxis = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                setRangeY([newValue[0], newValue[0] + minDistance]);
            } else {
                setRangeY([newValue[1] - minDistance, newValue[1]]);
            }
        } else {
            setRangeY(newValue as number[]);
        }
    }



    return (
        <>
            <div className='ps-2 pe-2 mb-3'>
                <Row className='mt-3'>
                    <Col xl={6}>
                        <Card className='p-3 shadow' style={{ minHeight: '100%', maxHeight: '70vh' }}>
                            {spinnerMap && <LinearProgress />}
                            <Maps2dArea
                            key={JSON.stringify(center)}
                            //@ts-ignore
                            geojson={geojson.features}
                            center={center}
                            zoom={zoom}
                            units={units}
                            line_weight={line_weight}
                            fill_opacity={fill_opacity}
                            />
                        </Card>
                    </Col>
                    <Col xl={6} className="ps-4 ps-xl-2 ps-lg-4 ps-md-4 pe-xl-2 pe-lg-4 pe-md-4 pe-4">
                        <Row>
                            <Card className='p-3 mt-xl-0 mt-lg-3 mt-md-3 mt-sm-3 mt-3 shadow' style={{ minHeight: '650px', maxHeight: '700pxvh' }}>
                                {spinnerGraph && <LinearProgress />}
                                <VerticalCut3dGraph
                                    z={data}
                                    x={x}
                                    y={y}
                                    colorscale={graphic_palet}
                                    //@ts-ignore
                                    labelTitle={diagnostic_labels[diagnostic]}
                                    //@ts-ignore
                                    labelUnit={units_lables[units]}
                                    rangeX={rangeX}
                                    rangeY={rangeY}
                                />
                            </Card>
                        </Row>
                        <Row className="mt-3">
                            <Card className='p-3 shadow'>
                                <h5 className="mt-1 ms-2 mb-0">Fecha: {date_time}</h5>
                                <hr className="mt-0, mb-0" />
                                <Row className="p-2">
                                    <Col xl={6} className="text-center">
                                        <Button className="w-100" onClick={e => setShowModal(true)}><OpenWith className="me-2" />Ampliar Mapa</Button>
                                    </Col>
                                    <Col xl={6} className="text-center mt-xl-0 mt-lg-2 mt-md-2 mt-sm-2 mt-2">
                                        <Button className="w-100" onClick={e => setShowModalGraph(true)}><OpenWith className="me-2" />Ampliar Gráfica</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    </Col>
                </Row>
                <Row className='ps-3 pe-0 mt-3'>
                    <Card className='pt-1 pb-1 shadow'>
                        <Row className="ps-2 pe-2">
                            <Col xl={2} lg={12} md={12} sm={12} xs={12}>
                                <h4 className="mt-1 ms-1">Tiempo</h4>
                            </Col>
                            <Col xl={9} lg={10} md={10} sm={10} xs={10}>
                                {load_path.length !== 0 ?
                                    <Slider
                                        className="mt-1"
                                        aria-label="Temperature"
                                        value={index}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        min={0}
                                        max={max_index - 1}
                                        marks
                                        onChange={(e, n) => { setIndex(n as number) }}
                                    />
                                :
                                    <div className="bg-warning text-black rounded p-2 shadow"><small>Debe seleccionar el (los) archivo(s) para mapear</small></div>
                                }

                            </Col>
                            <Col xl={1} lg={2} md={2} sm={2} xs={2} className="pt-2">
                                { load_path.length !== 0 ? <span className="border rounded p-2">{index + 1} / {max_index}</span> : <span></span>}
                            </Col>
                        </Row>
                    </Card>
                </Row>
                <Row className='ps-3 pe-0 mt-3'>
                    <Card className="shadow">
                        <h4 className="mt-2">Estilos</h4>
                        <hr className="mt-0 mb-1" />
                        <Row>
                            <Col xl={6} lg={6} md={6} sm={12} >
                                <Form.Group className='mt-3 ps-3 pe-3 mb-3'>
                                    <Form.Label>Paletas del mapa</Form.Label>
                                    <Form.Select onChange={e => setMapPalet(e.target.value)} defaultValue={map_palet}>
                                        {map_color_palets.map((color) => (
                                            <option value={color}>{color}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={12} >
                                <Form.Group className='mt-3 ps-3 pe-3 mb-3'>
                                    <Form.Label>Paletas del gráfico</Form.Label>
                                    <Form.Select onChange={e => setGraphicPalet(e.target.value)} defaultValue={graphic_palet}>
                                        {graphic_color_palets.map((color) => (
                                            <option value={color}>{color}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={12} >
                                <Form.Group className='mt-3 ps-3 pe-3'>
                                    <Form.Label>Grueso de líneas: {line_weight}px</Form.Label>
                                    <Slider
                                        aria-label="Temperature"
                                        value={line_weight}
                                        valueLabelDisplay="auto"
                                        step={0.1}
                                        min={0}
                                        max={2}
                                        onChange={(e, n) => { setLineWeight(n as number) }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={12} >
                                <Form.Group className='mt-3 ps-3 pe-3'>
                                    <Form.Label>Opacidad de polígonos: {(fill_opacity * 100).toFixed(0)}%</Form.Label>
                                    <Slider
                                        aria-label="Temperature"
                                        value={fill_opacity}
                                        valueLabelDisplay="auto"
                                        step={0.05}
                                        min={0}
                                        max={1}
                                        onChange={(e, n) => { setFillOpacity(n as number) }}
                                    />
                                </Form.Group>
                            </Col>                            
                        </Row>
                    </Card>
                </Row>
                <Row className="mt-3 ps-3">
                    <Card className='shadow'>
                        <h4 className="mt-2">Opciones</h4>
                        <hr className="mt-0" />
                        <Form>
                            <Row>
                                <Col xl={6}>
                                    <Form.Group>
                                        <Row>
                                            <Form.Label className="ms-2 mt-3 mb-3">Archivo(s):</Form.Label>
                                        </Row>
                                        <Row>
                                            <Card className="ms-3 pt-2 pb-2 pt-3" style={{ maxWidth: '95%', height: '220px', maxHeight: '220px' }}>
                                                <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                                                    {name_files_list && name_files_list?.map((name) => (
                                                        <>
                                                            <small>{name}</small>
                                                            <hr />
                                                        </>
                                                    ))}
                                                </div>
                                            </Card>
                                        </Row>
                                        {load_path.length === 0 && <div className="mt-2 bg-warning text-black rounded p-2 shadow"><small>Debe seleccionar el (los) archivo(s) para mapear</small></div>}
                                        <Form.Control type={'hidden'} name={'wrf_url'} value={load_path} required />
                                        <Button className="mt-2 ms-2 mb-3" variant="primary" onClick={handleShow}>Seleccionar Archivo(s)</Button>
                                    </Form.Group>
                                </Col>
                                <Col xl={6}>
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Número de polígonos: {polygons}</Form.Label>
                                        <Slider
                                            aria-label="Temperature"
                                            value={polygons}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            min={5}
                                            max={15}
                                            onChange={(e, n) => { setPolygons(n as number) }}
                                        />
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Seleccionar Diagnóstico</Form.Label>
                                        <Form.Select onChange={e => setDiagnostic(e.target.value)} defaultValue={diagnostic}>
                                            {diagnostic_options.map((diag) => (
                                                <option value={diag.value}>{diag.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Unidad de Medición</Form.Label>
                                        <Form.Select onChange={e => setUnits(e.target.value)} defaultValue={units} value={units} disabled={blockUnits}>
                                            {list_units && list_units.map((unit) => (
                                                <option value={unit.unit}>{unit.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr className="mt-2 mb-0" />
                            <Row>
                                <Form.Group className='mt-3'>
                                    <Button className="ms-2 me-3 mb-3 btn-danger" onClick={handleCleaning} title="Limpiar archivos cargados"><Delete/></Button>
                                    <Button disabled={blockUnits} onClick={saveDiagnosticData} className="mb-3 btn-success" title="Salvar diagnóstico"><Save/></Button>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Card>
                </Row>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Archivos Subidos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Form id="load_file">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Agregar</th>
                                        <th>Nombre</th>
                                        <th>Tamaño</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list_file && list_file.map((file, index) => (
                                        <tr>
                                            <td className='text-center'><Form.Check id={JSON.stringify(index)} value={file.path} name='file' onChange={e => handleRowSelection(e.target.id)} /></td>
                                            <td className='text-center'>{file.name}</td>
                                            <td className='text-center'>{file.size} mb</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Form>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit" form="load_file" onClick={handleLoadFiles}>
                        Cargar Archivos
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal} onHide={handleCloseModal} className="modal-xl" style={{ minHeight: '800px' }}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-5">{
                        //@ts-ignore
                        diagnostic_labels[diagnostic]
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '67vh' }}>
                    <Card style={{ maxHeight: '63vh' }}>
                        <Maps2dArea
                            key={JSON.stringify(center)}
                            //@ts-ignore
                            geojson={geojson.features}
                            center={center}
                            zoom={6}
                            fill_opacity={fill_opacity}
                            line_weight={line_weight}
                            units={units}
                        />
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Row className='ps-3 pe-3 w-100'>
                        <Card className="shadow">
                            <h4 className="mt-2 fs-6">Estilos</h4>
                            <hr className="mt-0 mb-1" />
                            <Row className="ps-3 pe-3">
                                <Col xl={6} lg={6} md={6} sm={12} >
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Grueso de líneas: {line_weight}px</Form.Label>
                                        <Slider
                                            aria-label="Temperature"
                                            value={line_weight}
                                            valueLabelDisplay="auto"
                                            step={0.1}
                                            min={0}
                                            max={2}
                                            onChange={(e, n) => { setLineWeight(n as number) }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={12} >
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Opacidad de polígonos: {(fill_opacity * 100).toFixed(0)}%</Form.Label>
                                        <Slider
                                            aria-label="Temperature"
                                            value={fill_opacity}
                                            valueLabelDisplay="auto"
                                            step={0.05}
                                            min={0}
                                            max={1}
                                            onChange={(e, n) => { handleOpacity(n as number) }}
                                            
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalGraph} onHide={handleCloseModalGraph} className="modal-xl" style={{ minHeight: '800px' }}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-5">{
                        //@ts-ignore
                        diagnostic_labels[diagnostic]
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ minHeight: '65vh' }}>
                    <Card style={{ minHeight: '62vh' }} className="p-3">
                        <VerticalCut3dGraph
                            z={data}
                            x={x}
                            y={y}
                            colorscale={graphic_palet}
                            //@ts-ignore
                            labelTitle={diagnostic_labels[diagnostic]}
                            //@ts-ignore
                            labelUnit={units_lables[units]}
                            rangeX={rangeX}
                            rangeY={rangeY}
                        />
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Row className='ps-3 pe-3 w-100'>
                        <Card className="shadow">
                            <h4 className="mt-2 fs-6">Cortes Verticales</h4>
                            <hr className="mt-0 mb-1" />
                            <Row className="ps-3 pe-3">
                                <Col xl={6} lg={6} md={6} sm={12} className="ps-4 pe-4">
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Seleccionar Rango de Longitudes ( x )</Form.Label>    
                                        <Slider
                                            value={rangeX}
                                            onChange={handleChangeXaxis}
                                            valueLabelDisplay="auto"
                                            disableSwap
                                            //@ts-ignore
                                            min={minX}
                                            //@ts-ignore
                                            max={maxX}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={12} className="ps-4 pe-4">
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Seleccionar Rango de Latitudes ( y )</Form.Label>   
                                        <Slider
                                            value={rangeY}
                                            onChange={handleChangeYaxis}
                                            valueLabelDisplay="auto"
                                            disableSwap
                                            //@ts-ignore
                                            min={minY}
                                            //@ts-ignore
                                            max={maxY}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                </Modal.Footer>
            </Modal>

            <MyToast position={'bottom-end'} bg_color={toast_bg_color} text_color={toast_text_color} show={showNot} close={setShowNot} body_text={toast_message} />
        </>
    )
}

export default Diagnostics