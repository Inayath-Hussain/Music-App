import { useState, createContext } from "react";

export const codeContext = createContext();

const CodeContextProvider = ({ children }) => {
    const [access_token, setAccessToken] = useState(localStorage.getItem('accessToken'));


    const value = {
        access_token,
        setAccessToken
    }

    return (
        <codeContext.Provider value={value}>
            {children}
        </codeContext.Provider>
    )
}

export default CodeContextProvider;