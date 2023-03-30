import { useLocation } from "react-router-dom"

export const SidebarAuth = ({ children }) => {
    const location = useLocation();
    if (location.pathname === '/login') {
        return null;
    }
    else {
        return children
    }
}