import React from "react";
import DashboardCard from "../components/dashboard_card";


function Dashboard(){
    return(
        <div className='mb-5'>
            <div className='row'>
                <div className='col-lg-6 col-sm-12 col-md-6 ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Mapas con datos 2d'
                        description='Estos son los mapas con datos en 2d'
                        url='mapas-2d'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/AllIsometricAug-06.jpg'}
                    />
                </div>
                <div className='col-lg-6 col-sm-12 col-md-6 ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Mapas con datos 3d'
                        description='Estos son los mapas con datos en 3d'
                        url='mapas-3d'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/AllIsometricDEC16-07.jpg'}
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-6 col-sm-12 col-md-6 ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Daos de corte vertical'
                        description='Aqui se puede ver un corte vertical de los datos'
                        url='corte-vertical'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/AllIsometricJuly1-highRes-13.jpg'}
                    />
                </div>
                <div className='col-lg-6 col-sm-12 col-md-6 ps-3 pe-3 mt-5'>
                    <DashboardCard
                        title='Datos de corte vertical en 3d'
                        description='Aqui se pueden ver los datos de corte vertical en 3d'
                        url='corte-vertical-3d'
                        image_url={process.env.PUBLIC_URL + '/images/theme/dashboard_cards/AllIsometricJune1b-29.jpg'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard