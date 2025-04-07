import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { Link } from 'react-router-dom'

const UserSidebar = () => {
    const { user, logout } = useContext(AuthContext); 

    return (
        <div className='card shadow mb-5 sidebar'>
            <div className='card-body p-4'>
                <ul>     
                    <li>
                        <Link to={`/account/${user?.id}`}>Account</Link>
                    </li>
                    <li>
                        <Link to={`/order/${user?.id}`}>Orders</Link>
                    </li>
                    <li>
                        <Link to={`/password/${user?.id}`}>Change Password</Link>
                    </li>
                    <li>
                        <a href="#" onClick={logout} className='text-danger'>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserSidebar;
