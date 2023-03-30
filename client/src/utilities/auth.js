import { Navigate } from "react-router-dom";
import SideBar from "../components/sidebar";

const Auth = ({ children }) => {
    if (localStorage.getItem('code')) {
        return (
            <div className="container">
                <SideBar />
                <div className="main">
                    {children}
                </div>
            </div >
        );
    }
    else {
        return <Navigate replace to='/login' />
    }
}

export default Auth;