import React, { useContext } from 'react';
import { AdminAuthContext } from '../context/AdminAuth';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { logout } = useContext(AdminAuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login'); 
    };

    return (
        <div className='card shadow mb-5 sidebar'>
            <div className='card-body p-4'>
                <ul>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li><Link to="/admin/categories">Categories</Link></li>
                    <li><Link to='/admin/brands'>Brands</Link></li>
                    <li><Link to='/admin/products'>Products</Link></li>
                    <li><Link to='/admin/orders'>Orders</Link></li>
                    <li><Link to='/admin/users'>Users</Link></li>
                    <li><Link to='/admin/shipping'>Shipping</Link></li>
                    <li><Link to='/admin/change-password'>Change Password</Link></li>
                    <li>
                        <a href="#" onClick={handleLogout} className="text-danger">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
