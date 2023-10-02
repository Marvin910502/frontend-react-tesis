import {Form, FormCheck} from "react-bootstrap";
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
                <FormCheck
                    onChange={checkHandle}
                    type="switch"
                    id="custom-switch"
                    label="Tema"
                    defaultChecked={isChecked}
                />
            </Form>
        </>
    )
}

export default Switch