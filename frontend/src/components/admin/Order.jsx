import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import { Link } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import { adminToken, apiUrl } from '../common/http';
import Loader from '../common/Loader';
import Nostate from '../common/Nostate';
import ReactPaginate from 'react-paginate';

const Order = () => {
    const [loader, setLoader] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 5;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoader(true);
        try {
            const res = await fetch(`${apiUrl}/save-order`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
            });
            const result = await res.json();
            setLoader(false);
            
            if (result.status === 200) {
                setOrders(result.data);
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            setLoader(false);
            console.error("Error fetching orders:", error);
        }
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * ordersPerPage;
    const currentOrders = orders.slice(offset, offset + ordersPerPage);
    const pageCount = Math.ceil(orders.length / ordersPerPage);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Order Summary</h4>
                    </div>

                    <div className='col-md-3'>
                        <Sidebar />
                    </div>

                    <div className='col-md-9'>
                        <div className='card shadow'>
                            <div className='card-body p-4'>
                                {loader && <Loader />}
                                {!loader && orders.length === 0 && <Nostate text="Orders not found" />}

                                {orders.length > 0 && (
                                    <>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Customer</th>
                                                    <th>Email</th>  
                                                    <th>Amount</th>
                                                    <th>Date</th>
                                                    <th>Payment</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentOrders.map(order => (
                                                    <tr key={order.id}>
                                                        <td>{order.id}</td>
                                                        <td>{order.name}</td>
                                                        <td>{order.email}</td>
                                                        <td>{order.grand_total}</td>
                                                        <td>{order.created_at}</td>
                                                        <td>
                                                            {order.payment_status && order.payment_status.toLowerCase() === "non paid" ? (
                                                                <span className='badge bg-danger'>Unpaid</span>
                                                            ) : (
                                                                <span className='badge bg-success'>Paid</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                        <td>
                                                            {order.status ? (
                                                                order.status.toLowerCase() === "delivered" ? (
                                                                    <span className="badge bg-success">Delivered</span>
                                                                ) : order.status.toLowerCase() === "shipped" ? (
                                                                    <span className="badge bg-danger">Shipped</span>
                                                                ) : (
                                                                    <span className="badge bg-danger">{order.status}</span>
                                                                )
                                                            ) : (
                                                                <span className="badge bg-warning">Unknown</span>
                                                            )}
                                                        </td>
                                                        </td>
                                                        <td>
                                                            <Link to={`/admin/shipping/${order.id}`} className='btn btn-primary'>
                                                                Shipping Details
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <ReactPaginate
                                            previousLabel={'Previous'}
                                            nextLabel={'Next'}
                                            breakLabel={'...'}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination justify-content-center'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousClassName={'page-item mx-2'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'page-item mx-2'}
                                            nextLinkClassName={'page-link'}
                                            breakClassName={'page-item'}
                                            breakLinkClassName={'page-link'}
                                            activeClassName={'active'}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Order;
