import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/Auth";
import { FaUserCircle } from "react-icons/fa"; // Import a user icon


const UserIcon = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext); 

    const handleUserClick = () => {
        if (user) {
            navigate(`/account/${user?.id}`);  // Redirect to dashboard if logged in
        } else {
            navigate(`/account/login`);  
        }
    };

    return (
        <div onClick={handleUserClick} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            {user?.profileImage ? (
                <img src={user.profileImage} alt="User" style={{ width: 40, height: 40, borderRadius: "50%" }} />
            ) : (
                <FaUserCircle size={30} color="#555" />
            )}
        </div>
    );
};

export default UserIcon;
