import React, {createContext, PropsWithChildren, useContext, useState} from "react"

interface contextInteface {
    username:string,
    isAuthenticated:boolean
}

export const UserContext = createContext<contextInteface|null>(null)


export default function ContextProvider(props:PropsWithChildren<{}>){

    const [current_user, setCurrentUser] = useState<contextInteface>({username:'Anónimo', isAuthenticated:false})

    return(

            <UserContext.Provider value={current_user}>
                {props.children}
            </UserContext.Provider>

    )
}