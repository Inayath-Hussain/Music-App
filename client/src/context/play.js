import { createContext, useState } from "react";

export const playcontext = createContext();

export const PlayContextProvider = ({ children }) => {
    const [uri, setUri] = useState([]);

    return (
        <playcontext.Provider value={{ uri, setUri }}>
            {children}
        </playcontext.Provider>
    )
}