import {Form} from "react-bootstrap";
import React, {useState} from "react";


const Switch = () => {

    let theme = localStorage.getItem('themeMode')

    const [isChecked, setIsChecked] = useState(theme !== 'light')

    const checkHandle = () => {
        setIsChecked(!isChecked)
        theme = isChecked ? "light" : "dark"
        localStorage.setItem('themeMode', theme === "dark" ? "dark" : "light")
        window.location.reload()
    }


    return(
        <>
            <Form>
                <Form.Check
                    onChange={checkHandle}
                    type="switch"
                    id="custom-switch"
                    label={theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                    defaultChecked={isChecked}
                />
            </Form>
        </>
    )
}

export default Switch