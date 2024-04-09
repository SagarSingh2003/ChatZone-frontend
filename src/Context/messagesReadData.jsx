import { useEffect } from "react";
import {useContext} from React;

const MessagesDataContext = createContext();

export default function MessagesReadDataContextProvider({children}){

    const ListOfMessagesData = useState([]);

    useEffect(() => {
        fetch(api+"/messages/messages-read-data" , {
            mode : "cors",
            method : "GET", 
            headers : {
                "Authentication" : localStorage.getItem("Authentication")
            }
        })
    } , [])

    return(
        <MessagesDataContext.Provider>
            {children}
        </MessagesDataContext.Provider>
    )
}