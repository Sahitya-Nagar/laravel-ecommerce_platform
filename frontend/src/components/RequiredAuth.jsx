import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/Auth";

export const RequireAuth = ({ children }) => {
    const { user } = useContext(AuthContext);

    // Check if user is an object (not just a string)
    if (!user || typeof user !== 'object') {
        return <Navigate to="/account/login" />;
    }

    return children;
};
