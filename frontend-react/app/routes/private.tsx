import { Navigate, Outlet } from "react-router"

const PrivateRoutes = () => {
    const token = localStorage.getItem("token");

    let auth = !!token;
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes