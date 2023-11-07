import { useEffect, useState } from "react";
import DashboardCard from "../components/dashboard_card";
import {Card, CardBody, Col, Image, Row} from "react-bootstrap";
import Cookies from 'js-cookie'


const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in vestibulum risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ac euismod nisl. Duis rhoncus massa in maximus congue. Quisque egestas aliquet erat, vitae consectetur leo convallis ac.'

function Dashboard(){

    const [homeContent, setHomeContent] = useState<string>('')
    const [cardDiagnostics, setCardDiagnostics] = useState<string>('')
    const [cardMyDiagnostics, setCardMyDiagnostics] = useState<string>('')

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
            <h1 className='mt-2' style={{fontSize: '5vh'}}>CFA - Gestor de Archivos WRFout</h1>
        </Card>
        <Card className='mt-3'>
            <Image
                style={{maxWidth:'100%'}}
                src={process.env.PUBLIC_URL + '/images/theme/dashboard_images/image-top-3.png'}
            />
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
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/mapas-2d.png'}
                    />
                </Col>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Mis Diagnósticos'
                        card_content={cardMyDiagnostics}
                        url='mis-diagnosticos'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/corte-vertical-3d.png'}
                    />
                </Col>
            </Row>
        </div>
        </div>
    )
}

export default Dashboard