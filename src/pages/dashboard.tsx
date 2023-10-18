import DashboardCard from "../components/dashboard_card";
import {Card, CardBody, Col, Image, Row} from "react-bootstrap";


const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in vestibulum risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ac euismod nisl. Duis rhoncus massa in maximus congue. Quisque egestas aliquet erat, vitae consectetur leo convallis ac.'

function Dashboard(){
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
                <h3>Archivos WRFout</h3>
                <hr/>
                <p>
                    "WRF" significa Weather Research and Forecasting, que es un sistema de modelado numérico ampliamente utilizado para la predicción del tiempo y la simulación de la atmósfera. Los archivos WRFout son archivos de salida generados por el modelo WRF y contienen datos relacionados con la simulación del tiempo, como información sobre la temperatura, la presión, la velocidad del viento, la humedad, la precipitación, entre otros parámetros atmosféricos.

                    Estos archivos son utilizados por meteorólogos, científicos del clima y otros profesionales para analizar y visualizar datos de pronóstico del tiempo y realizar investigaciones en meteorología y climatología. Los archivos WRFout suelen estar en un formato específico y contienen una variedad de campos de datos que permiten un análisis detallado de las condiciones atmosféricas simuladas por el modelo WRF.

                    La estructura y el contenido exacto de los archivos WRFout pueden variar según la configuración de la simulación y las necesidades del usuario. Por lo general, se requiere software especializado para abrir y trabajar con estos archivos, como herramientas de visualización y análisis meteorológico.
                </p>
                <hr className="mt-5 mb-5"/>
                <Row className='mt-5'>
                    <Col xl={6} lg={12} md={12} sm={12}>
                        <Image
                            style={{maxWidth:'100%'}}
                            src={process.env.PUBLIC_URL + '/images/theme/dashboard_images/text-image.png'}
                        />
                    </Col>
                    <Col xl={6} lg={12} md={12} sm={12} className='ps-xl-5'>
                        <h4>Utilidad</h4>
                        <hr/>
                        <p>
                            Validación de pronósticos: Los archivos WRFout se utilizan para validar la precisión de los pronósticos meteorológicos generados por el modelo WRF. Comparando los resultados del modelo con observaciones reales, los meteorólogos pueden evaluar la calidad de los pronósticos y ajustarlos en consecuencia.<br/><br/>

                            <strong>Investigación científica:</strong> Los datos contenidos en los archivos WRFout son valiosos para la investigación científica en meteorología y climatología. Los científicos utilizan estos datos para comprender mejor los procesos atmosféricos, estudiar eventos climáticos extremos y analizar patrones climáticos a nivel regional y local.<br/><br/>   
                        </p>
                    </Col>
                    <Col lg={12}>
                        <p>
                            Planificación y toma de decisiones: Los archivos WRFout proporcionan información sobre las condiciones meteorológicas y climáticas pasadas y futuras. Esto es esencial para la planificación y la toma de decisiones en diversas industrias, como la agricultura, la energía, la aviación, la gestión del agua y la gestión de desastres naturales.<br/><br/>   

                            Predicciones a corto y largo plazo: Los datos de los archivos WRFout permiten generar pronósticos meteorológicos a corto y largo plazo. Estos pronósticos son fundamentales para la toma de decisiones en áreas como la gestión de recursos hídricos, la planificación urbana y la respuesta a eventos climáticos extremos.<br/><br/>

                            Estudios de calidad del aire: Los archivos WRFout se utilizan en la evaluación de la calidad del aire y en la predicción de la dispersión de contaminantes atmosféricos. Esto es importante para la regulación ambiental, la salud pública y la gestión de la contaminación del aire.<br/><br/>

                            Modelado climático: Los datos de los archivos WRFout son utilizados en modelos climáticos regionales y locales para proyectar cambios en el clima a lo largo del tiempo. Esto es crucial para la investigación sobre el cambio climático y la planificación de la adaptación.<br/><br/>

                            Investigación y pronóstico de eventos extremos: Los archivos WRFout se utilizan para estudiar y pronosticar eventos meteorológicos extremos, como tormentas, inundaciones, olas de calor y sequías. Esta información es esencial para la gestión de riesgos y la planificación de respuesta.
                        </p>
                    </Col>
                </Row>
            </CardBody>
        </Card>
        <div className='mb-5'>
            <Row>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Mapas con Datos 2D'
                        description={description}
                        url='mapas-2d'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/mapas-2d.png'}
                    />
                </Col>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Mapas con Datos 3D'
                        description={description}
                        url='mapas-3d'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/mapas-3d.png'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Datos de Corte Vertical'
                        description={description}
                        url='corte-vertical'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/corte-vertical.png'}
                    />
                </Col>
                <Col xl={6} lg={6} sm={12} md={12} className='ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Datos de Corte Vertical en 3D'
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