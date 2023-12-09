import React from "react";
import {Link} from "react-router-dom";
import {Card, Image} from "react-bootstrap";

interface ChildProps {
    title: string,
    card_content: string,
    url: string,
    image_url: string
}


const DashboardCard: React.FC<ChildProps> = ({title, card_content, url, image_url}) => {
    return(
        <>
            <Link to={url} className='text-decoration-none'>
                <Card className='shadow'>
                    <Card.Header>
                        <h3>{title}</h3>
                    </Card.Header>
                    <Card.Body>
                        <Image
                            style={{maxWidth:'100%'}}
                            rounded
                            src={image_url}
                        />
                        <div dangerouslySetInnerHTML={{__html: card_content}}></div>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}

export default DashboardCard