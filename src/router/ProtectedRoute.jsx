import { Navigate, Outlet } from "react-router-dom";
import Auth from "../utils/Auth";

export default function ProtectedRoute() {
    if (Auth.isAuthorization()) {
        return <Navigate to="/dashboard" replace={true} />;
    }
    return <Outlet />;
}
