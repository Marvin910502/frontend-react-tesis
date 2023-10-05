import React from "react";
import DashboardCard from "../components/dashboard_card";
import {Card, CardBody, Col, Image, Row} from "react-bootstrap";

const paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in vestibulum risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ac euismod nisl. Duis rhoncus massa in maximus congue. Quisque egestas aliquet erat, vitae consectetur leo convallis ac. Duis a venenatis magna, id condimentum tortor. Suspendisse nulla dolor, pulvinar et cursus vel, fermentum sed urna. Donec rutrum maximus tempus. Vestibulum ut risus augue. Sed quis ex sagittis, facilisis elit ac, tempus orci. Nullam elementum, justo ac sodales eleifend, quam dolor feugiat quam, in feugiat lorem nibh et augue. Proin ornare enim felis, et pellentesque sem varius et. Ut molestie justo in lectus placerat posuere. Mauris scelerisque, augue nec malesuada interdum, urna nisl semper quam, molestie lacinia dui lacus nec enim. In a sem ornare, dignissim urna convallis, egestas eros.\n' +
    '\n' +
    'In et malesuada lectus. Phasellus neque diam, mollis nec massa vitae, eleifend condimentum sem. Nulla non magna dapibus, faucibus nulla laoreet, lobortis eros. Mauris sit amet tristique leo. Integer faucibus enim at ligula pretium viverra ut eu est. Quisque pharetra venenatis urna. In fringilla interdum lectus a interdum. Nunc id massa mollis, scelerisque metus eget, porta lectus. In placerat, lacus a aliquam ullamcorper, nisl enim maximus diam, in pulvinar nisl dolor sit amet nulla. In pretium felis dictum fringilla imperdiet.\n' +
    '\n' +
    'Maecenas volutpat ante ut consequat pellentesque. Vivamus et dui ut erat varius aliquet in nec metus. Nunc mattis sit amet metus sed suscipit. Sed eget tempus tortor. Morbi non imperdiet nunc. Nam elementum, erat at bibendum egestas, arcu elit porttitor nisl, ac scelerisque libero tellus finibus neque. Sed a lectus purus. Cras ut faucibus ex, id congue leo. Vestibulum vehicula odio nisi, id vestibulum nisl malesuada in.'

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in vestibulum risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ac euismod nisl. Duis rhoncus massa in maximus congue. Quisque egestas aliquet erat, vitae consectetur leo convallis ac.'

function Dashboard(){
    return(
        <div>
        <Card className='mt-3 text-center'>
            <h1 className='mt-2' style={{fontSize: '5vh'}}>CFA - Gestor de archivos WRFout</h1>
        </Card>
        <Card className='mt-3'>
            <Image
                style={{maxWidth:'100%'}}
                src={process.env.PUBLIC_URL + '/images/theme/dashboard_images/image-top-3.png'}
            />
            <CardBody className='ps-lg-5 pe-lg-5 ps-sm-2 pe-sm-2'>
                <h3>Archivos WRFout</h3>
                <hr/>
                <p>
                    {paragraph}
                </p>
                <Row className='mt-5'>
                    <Col lg={6} sm={12}>
                        <Image
                            style={{maxWidth:'100%'}}
                            src={process.env.PUBLIC_URL + '/images/theme/dashboard_images/text-image.png'}
                        />
                    </Col>
                    <Col lg={6} sm={12} className='ps-lg-5'>
                        <h4>Utilidad</h4>
                        <hr/>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in vestibulum risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ac euismod nisl. Duis rhoncus massa in maximus congue. Quisque egestas aliquet erat, vitae consectetur leo convallis ac. Duis a venenatis magna, id condimentum tortor. Suspendisse nulla dolor, pulvinar et cursus vel, fermentum sed urna. Donec rutrum maximus tempus. Vestibulum ut risus augue. Sed quis ex sagittis, facilisis elit ac, tempus orci.
                        </p>
                    </Col>
                </Row>
            </CardBody>
        </Card>
        <div className='mb-5'>
            <Row>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Mapas con datos 2d'
                        description={description}
                        url='mapas-2d'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/mapas-2d.png'}
                    />
                </Col>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Mapas con datos 3d'
                        description={description}
                        url='mapas-3d'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/mapas-3d.png'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Daos de corte vertical'
                        description={description}
                        url='corte-vertical'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/corte-vertical.png'}
                    />
                </Col>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Datos de corte vertical en 3d'
                        description={description}
                        url='corte-vertical-3d'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/corte-vertical-3d.png'}
                    />
                </Col>
            </Row>
        </div>
        </div>
    )
}

export default Dashboard