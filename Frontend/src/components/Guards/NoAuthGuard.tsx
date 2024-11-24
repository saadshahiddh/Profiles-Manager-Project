import { isLoggedIn } from "../../utilities/auth";
import { Navigate, Outlet } from "react-router-dom";


export const NoAuthGuard = () => {
    if (isLoggedIn()) {
        return <Navigate to="/logged-in-redirect" />
    }
    return <Outlet />
}
