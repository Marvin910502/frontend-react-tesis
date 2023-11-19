import {useState, useEffect} from 'react';
import Router from "./routes/router";
import Sidebar from "./components/sidebar";
import {Col, Row} from "react-bootstrap";
import NavbarMini from "./components/navbarmini";
import Favicon from 'react-favicon';



function App() {

    const [isDesktop, setDesktop] = useState(window.innerWidth > 700);
    const [favicon, setFavIcon] = useState<string>('')

    const updateMedia = () => {
        setDesktop(window.innerWidth > 700);
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    })

    useEffect(() => {
        const getContentSite = async () => {
            try {
                const res = await fetch(
                    `${process.env['REACT_APP_API_URL']}/api/get-content/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                    }
                    )
                const data = await res.json()
                setFavIcon(data.favicon)
            }
            catch (error) {
                console.log(error)
            }
        }
        getContentSite()
    }, [])

  return (
    <div className='App'>
        <header className='App-header'>
            <title>CFA - WRF</title>
            <Favicon url={`${process.env["REACT_APP_API_URL"]}/api/media/get-icon/${favicon}`}/>
        </header>
        <div className='container-fluid'>
            { isDesktop ? (
                <Row style={{height:'100vh'}}>

                    <Col xl={2} lg={3} md={4} sm={4} xs={1} style={{height:'100vh'}}>
                        <Sidebar/>
                    </Col>
                    <Col xl={10} lg={9} md={8} sm={8} xs={11}>
                        <Router/>
                    </Col>
                </Row>
            ):(
                <Row>
                    <NavbarMini/>
                    <Row>
                        <Router/>
                    </Row>
                </Row>
            )
            }
        </div>
    </div>
  );
}

export default App;
