import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () =>{
    let isAuthenticated = sessionStorage.getItem('access')
    return isAuthenticated ? <Outlet/> : <Navigate to={'/sign-in'} replace/>
}

export default ProtectedRoute