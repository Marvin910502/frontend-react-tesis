import {createContext, PropsWithChildren, useState} from "react"

export interface userInteface {
    username:string,
    isAuthenticated:boolean,
    department:string,
    name:string,
    last_names:string,
    isAdmin:boolean,
    isGuess:boolean,
    isManager:boolean,
    profile_image:string,
    image:string 
}

interface contextInterface {
    user: userInteface,
    setUser:Function
}

const v:userInteface = {username:'Anónimo', isAuthenticated:false, department:'', name:'', last_names:'', isAdmin:false, isGuess:false, isManager:false, profile_image:'', image:''}
const f:Function = ()=>{}

export const UserContext = createContext<contextInterface>({user:v,setUser:f})

const userData:userInteface = JSON.parse(localStorage.getItem('userData') || '{}')

export default function ContextProvider(props:PropsWithChildren<{}>){

    const [current_user, setCurrentUser] = useState<userInteface>({
                                                                   username:userData.username || 'Anónimo', 
                                                                   isAuthenticated:userData.isAuthenticated || false,
                                                                   department:userData.department || '',
                                                                   name:userData.name || '',
                                                                   last_names:userData.last_names || '',
                                                                   isAdmin:userData.isAdmin || false,
                                                                   isGuess:userData.isGuess || false,
                                                                   isManager:userData.isManager || false,
                                                                   profile_image:userData.profile_image || '',
                                                                   image:userData.image || '' 
                                                                })

    const user = {user:current_user, setUser:setCurrentUser}

    return(

            <UserContext.Provider value={user}>
                {props.children}
            </UserContext.Provider>

    )
}