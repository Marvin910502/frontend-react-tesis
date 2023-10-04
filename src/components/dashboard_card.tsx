import React from "react";
import {Link} from "react-router-dom";
import {Card, Image} from "react-bootstrap";

interface ChildProps {
    title: string,
    description: string,
    url: string,
    image_url: string
}


const DashboardCard: React.FC<ChildProps> = ({title, description, url, image_url}) => {
    return(
        <>
            <Link to={url} className='text-decoration-none'>
                <Card className='shadow-sm'>
                    <Card.Header>
                        <h3>{title}</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className='align-items-center'>
                            <Image
                                style={{maxWidth:'100%'}}
                                rounded
                                src={image_url}
                            />
                        </div>
                        <p>{description}</p>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}

export default DashboardCard