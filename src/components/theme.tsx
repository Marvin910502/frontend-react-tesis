import React, {useState} from "react";



const ThemeProvider = (props: any) => {


    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
    }

    return(
        <>
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" href="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Web site created using create-react-app"
                />
                <link rel="apple-touch-icon" href="" />
                <link rel="manifest" href="" />
                <script type="text/javascript" src="bootstrap-5.3.2-dist/js/bootstrap.min.js"/>
                <link rel="stylesheet" href="bootstrap-5.3.2-dist/css/bootstrap.css" />
                <title>CFA - Gestor de archivos WRFout</title>
            </head>
            <body className="container-fluid" style={{height:'100vh'}} data-bs-theme={theme}>
                {props.children}
            </body>
        </>
    )
}

export default ThemeProvider

