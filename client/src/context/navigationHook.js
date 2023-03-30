import { createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const navcontext = createContext();

const NavContextProvider = ({ children }) => {
    const nav = useNavigate();
    const navigate = useRef(nav)

    return (
        <navcontext.Provider value={navigate.current}>
            {children}
        </navcontext.Provider>
    )
}

export default NavContextProvider;