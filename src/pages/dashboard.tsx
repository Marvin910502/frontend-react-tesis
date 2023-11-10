import { useEffect, useState } from "react";
import DashboardCard from "../components/dashboard_card";
import {Card, CardBody, Col, Image, Row} from "react-bootstrap";
import Cookies from 'js-cookie'


function Dashboard(){

    const [homeContent, setHomeContent] = useState<string>('')
    const [cardDiagnostics, setCardDiagnostics] = useState<string>('')
    const [cardMyDiagnostics, setCardMyDiagnostics] = useState<string>('')
    const [site_title, setSiteTitle] = useState<string>('')
    const [home_image, setHomeImage] = useState<string>('')
    const [card_diagnostics_image, setCardDiagnosticsImage] = useState<string>('')
    const [card_my_diagnostics_image, setCardMyDiagnosticsImage] = useState<string>('')

    useEffect(() => {
        const getContentSite = async () => {
            const res = await fetch(
                `${process.env['REACT_APP_API_URL']}/api/get-content/`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access-token')}`
                    },
                }
                )
            const data = await res.json()
            setSiteTitle(data.site_title)
            setHomeImage(data.home_image)
            setCardDiagnosticsImage(data.card_diagnostics_image)
            setCardMyDiagnosticsImage(data.card_my_diagnostics_image)
            setHomeContent(data.home_content)
            setCardDiagnostics(data.card_diagnostics)
            setCardMyDiagnostics(data.card_my_diagnostics)
            console.log(data)
        }
        getContentSite()
    }, [])


    return(
        <div>
        <Card className='mt-3 text-center'>
            <h1 className='mt-2' style={{fontSize: '5vh'}}>{site_title}</h1>
        </Card>
        <Card className='mt-3'>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Image
                    style={{maxWidth:'55vh'}}
                    src={`${process.env["REACT_APP_API_URL"]}/api/media/get-image/${home_image}`}
                />
            </div>
            <CardBody className='ps-lg-5 pe-lg-5 ps-sm-2 pe-sm-2'>
                <div dangerouslySetInnerHTML={{__html: homeContent}}></div>
            </CardBody>
        </Card>
        <div className='mb-5'>
            <Row>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Diagnósticos'
                        card_content={cardDiagnostics}
                        url='diagnosticos'
                        image_url={`${process.env["REACT_APP_API_URL"]}/api/media/get-image/${card_diagnostics_image}`}
                    />
                </Col>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Mis Diagnósticos'
                        card_content={cardMyDiagnostics}
                        url='mis-diagnosticos'
                        image_url={`${process.env["REACT_APP_API_URL"]}/api/media/get-image/${card_my_diagnostics_image}`}
                    />
                </Col>
            </Row>
        </div>
        </div>
    )
}

export default Dashboard