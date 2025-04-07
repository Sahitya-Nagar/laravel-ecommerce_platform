import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import Sidebar from '../common/Sidebar'
import { adminToken, apiUrl } from '../common/http'
import Loader from '../common/Loader'
import Nostate from '../common/Nostate'

const Users = () => {
    const [user, setUser] = useState([]);
    const [loader, setLoader] = useState(false);

    const fetchUsers = async () => {
        setLoader(true);
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
            setLoader(false);

            if (result.status === 200) {
                setUser(result.data);
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            setLoader(false);
            console.error("Error fetching Account Details:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>User Information</h4>
                    </div>

                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    
                    <div className='col-md-9'>
                        <div className='card shadow'>
                            <div className='card-body p-4'>
                                <div className='form-label'>
                                    {loader && <Loader />}
                                    {!loader && user.length === 0 && <Nostate text="Users not found" />}
                                    
                                    {!loader && user.length > 0 && (
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Email_Verified</th>
                                                    <th>Role</th>
                                                    <th>Created At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user.map((users) => (
                                                    <tr key={`profile-${users.id}`}>
                                                        <td>{users.id}</td>
                                                        <td>{users.name}</td>
                                                        <td>{users.email}</td>
                                                        <td>{users.email_verified_at === null ? "No" : "Yes"}</td>
                                                        <td>{users.role}</td>
                                                        <td>{new Date(users.created_at).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users;
