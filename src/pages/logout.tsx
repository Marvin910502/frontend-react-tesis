import React from "react";

interface authState{
    logoutNow:Function,
}

const Logout:React.FC<authState> = ({logoutNow}) => {

    return (
        <>
            {logoutNow()}
        </>
    )
}

export default Logout