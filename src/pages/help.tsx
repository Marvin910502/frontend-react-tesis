import { Card } from "react-bootstrap"
import { useState, useEffect } from "react"
import Cookies from 'js-cookie'


const Help = () => {

    const [helpContent, setHelpContent] = useState<string>('')

    useEffect(() => {
        const getContentSite = async () => {
            try {
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
                setHelpContent(data.help_content)
            }
            catch (error) {
                console.log(error)
            }
        }
        getContentSite()
    }, [])

    return(
        <div>
            <Card className="mt-3 mb-4">
                <Card.Header>
                    <h3>Ayuda</h3>
                </Card.Header>
                <Card.Body className="ps-lg-5 pe-lg-5 ps-sm-2 pe-sm-2 pt-4 pb-3">
                    <div dangerouslySetInnerHTML={{__html: helpContent}}></div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Help