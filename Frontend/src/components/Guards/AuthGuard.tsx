import { isLoggedIn } from "../../utilities/auth";
import { Navigate, Outlet } from "react-router-dom";


export const AuthGuard = () => {
    if (isLoggedIn()) {
        return <Outlet />
    }
    return <Navigate to="/logged-out-redirect" />
}
