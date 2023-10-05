import React, {useState, useEffect} from 'react';
import Router from "./routes/router";
import Sidebar from "./components/sidebar";
import {Col, Row} from "react-bootstrap";
import NavbarMini from "./components/navbarmini";


function App() {

    const [isDesktop, setDesktop] = useState(window.innerWidth > 700);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 700);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


  return (
    <>
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

    </>
  );
}

export default App;
