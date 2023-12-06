import { useState } from "react";
import { Toast, ToastContainer, Button, Row, Col } from 'react-bootstrap';

interface toastInterface {
  show:boolean,
  close:Function,
  position: 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'
  body_text:string,
  bg_color:string,
  text_color:string,
}

const MyToast:React.FC<toastInterface> = ({show, close, position, body_text, bg_color, text_color}) => {

  const [showToast, setShowToast] = useState(show)
  

  function handleToast(){
    close(showToast)
    setShowToast(false)
  }

  return (
      <ToastContainer position={position} className={'p-3'} style={{ zIndex: 1, position:'fixed' }}>
        <Toast className={`${text_color}`} onClose={() => handleToast()} show={show} bg={`${bg_color}`} delay={5000} autohide animation={true}>
          <Toast.Body>
            <Row>
              <Col className="col-10 pt-1">
                {body_text}
              </Col>
              <Col className="col-2">
                  <Button variant="white" className={`p-0 ps-2 pe-2 ${text_color}`} aria-label="cerrar" onClick={() => handleToast()}>X</Button>
              </Col>
            </Row>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    )
}

export default MyToast