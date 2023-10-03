import React from "react";
import {Link} from "react-router-dom";

interface ChildProps {
    title: string,
    description: string,
    url: string
}


const DashboardCard: React.FC<ChildProps> = ({title, description, url}) => {
    return(
        <>
            <Link to={url} className='text-decoration-none'>
                <div className='card shadow-sm'>
                    <div className='card-header'>
                        <h3>{title}</h3>
                    </div>
                    <div className='card-body'>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default DashboardCard