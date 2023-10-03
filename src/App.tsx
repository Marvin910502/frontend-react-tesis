import React from 'react';
import Router from "./routes/router";
import Sidebar from "./components/sidebar";
import {Col, Row} from "react-bootstrap";


function App() {
  return (
    <>
        <Row style={{height:'100vh'}}>
            <Col lg={2} md={4} sm={4} style={{height:'100vh'}}>
                <Sidebar/>
            </Col>
            <Col lg={10} md={8} sm={8} className='ps-5 pe-5'>
                <Router/>
            </Col>
        </Row>
    </>
  );
}

export default App;
