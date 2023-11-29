import React from "react";



const ThemeProvider = (props: any) => {


    let theme: string | null = localStorage.getItem('themeMode')

    if (theme === null){
        localStorage.setItem('themeMode', 'dark')
        theme = 'dark'
    }

    return(
        <>
            <div>
                {props.children}
            </div>
        </>
    )
}

export default ThemeProvider

