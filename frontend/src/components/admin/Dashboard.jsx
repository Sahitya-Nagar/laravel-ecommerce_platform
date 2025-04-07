import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Sidebar from '../common/Sidebar';
import { Link } from 'react-router-dom';
import { adminToken, apiUrl } from '../common/http';
import Loader from '../common/Loader';
import Nostate from '../common/Nostate';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders,setOrders] = useState([])
    const [loader, setLoader] = useState(false);
    
    const fetchProducts = async () => {
        try {
            setLoader(true)
            const response = await fetch(`${apiUrl}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                     'Authorization': `Bearer ${adminToken()}`
                }
            });
            const result = await response.json();
            if (result.status === 200) {
                setProducts(result.data);
                setLoader(false)
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
       
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                     'Authorization': `Bearer ${adminToken()}`
                }
            });
            const result = await response.json();
            if (result.status === 200) {
                setUsers(result.data);
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${apiUrl}/save-order`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                     'Authorization': `Bearer ${adminToken()}`
                }
            });
            const result = await response.json();
            if (result.status === 200) {
                setOrders(result.data);
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts()
        fetchUsers();
        fetchOrders()
    }, []); 

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Dashboard</h4>
                    </div>

                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='row'>
                            <div className='col-md-4'>
                                {
                                    loader == true && <Loader/>
                                }
                                    
                                {
                                    loader == false && users.length == 0 && <Nostate text=""/> 
                                }  
                                {
                                    users && users.length > 0 && 
                                    <div className='card shadow'>
                                        <div className='card-body'>
                                            <h2>
                                                    
                                                {users.length} 
                                            </h2>
                                            <span>Users</span>
                                            <div className='card-footer'>
                                                <a href="#">View Users</a>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className='col-md-4'>
                                {
                                    loader == true && <Loader/>
                                }
                                        
                                {
                                    loader == false && orders.length == 0 && <Nostate text=""/> 
                                }   
                                {
                                    orders && orders.length > 0 &&
                                    <div className='card shadow'>
                                        <div className='card-body'>
                                            <h2>
                                                {orders.length}
                                            </h2>
                                            <span>Orders</span>
                                            <div className='card-footer'>
                                                <a href="#">View Orders</a>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className='col-md-4'>
                                {
                                    loader == true && <Loader/>
                                }
                                        
                                {
                                    loader == false && products.length == 0 && <Nostate text=""/> 
                                }   
                                {
                                    products && products.length > 0 &&
                                    <div className='card shadow'>
                                        <div className='card-body'>
                                            <h2>
                                                {products.length}
                                            </h2>
                                            <span>Products</span>
                                            <div className='card-footer'>
                                                <Link to='/admin/products'>View Products</Link>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
