import React, { useEffect, useState } from 'react';
import Layout from './common/Layout';
import { useParams } from 'react-router-dom';
import UserSidebar from './common/UserSidebar';
import { apiUrl, userToken } from './common/http';
import Loader from './common/Loader';
import Nostate from './common/Nostate';

const UserOrder = () => {
    const [loader, setLoader] = useState(false);
    const [orders, setOrders] = useState([]);
    const [productImages, setProductImages] = useState({});
    const [userInfo, setUserInfo] = useState({ name: '', email: '', mobile: '' });
    const { id } = useParams();

    useEffect(() => {
        fetchOrders();
    }, [id]);

    const fetchOrders = async () => {
        setLoader(true);
        try {
            const res = await fetch(`${apiUrl}/order-details/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`
                }
            });

            const result = await res.json();
            setLoader(false);

            if (result.status === 200 && result.data && result.data.length > 0) {
                setOrders(result.data);
                // Assuming user info is consistent across orders, take it from the first order
                setUserInfo({
                    name: result.data[0].name,
                    email: result.data[0].email,
                    mobile: result.data[0].mobile
                });
                fetchProductImages(result.data);
            } else {
                console.log("Something went wrong", result);
            }
        } catch (error) {
            setLoader(false);
            console.error("Error fetching orders:", error);
        }
    };

    const fetchProductImages = async (orders) => {
        const productIds = [...new Set(orders.flatMap(order => order.items.map(item => item.product_id || item.id)))];

        if (productIds.length === 0) return;

        try {
            const imagePromises = productIds.map(async (productId) => {
                const res = await fetch(`${apiUrl}/get-product/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${userToken()}`
                    }
                });
                const result = await res.json();
                if (result.status === 200 && result.data && result.data.image_url) {
                    return { id: productId, image_url: result.data.image_url };
                }
                return { id: productId, image_url: null };
            });

            const images = await Promise.all(imagePromises);
            const imageMap = images.reduce((acc, { id, image_url }) => {
                acc[id] = image_url || 'https://via.placeholder.com/80?text=No+Image';
                return acc;
            }, {});
            setProductImages(imageMap);
        } catch (error) {
            console.error("Error fetching product images:", error);
        }
    };

    const getProductImage = (item) => {
        const productId = item.product_id || item.id;
        return productImages[productId] || 'https://via.placeholder.com/80?text=No+Image';
    };

    return (
        <Layout>
            <div className="container mt-5 mb-5">
                <div className="row g-4">
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>

                    <div className="col-md-9">
                        <div className="card shadow-lg rounded-3 border-0 overflow-hidden">
                            <div className="card-header bg-primary text-white p-3">
                                <h4 className="mb-0 fw-bold">Order Details</h4>
                            </div>
                            <div className="card-body p-4">
                                {loader && <Loader />}
                                {!loader && orders.length === 0 && <Nostate text="No orders found" />}

                                {!loader && orders.length > 0 && (
                                    <>
                                        {/* Display User Info Once */}
                                        <div className="mb-4 p-3 bg-light rounded">
                                            <h5 className="fw-bold">User Information</h5>
                                            <p><strong>Name:</strong> {userInfo.name}</p>
                                            <p><strong>Email:</strong> {userInfo.email}</p>
                                            <p><strong>Contact No.:</strong> {userInfo.mobile}</p>
                                        </div>

                                        {/* Order Table */}
                                        <div className="table-responsive">
                                            <table className="table table-hover table-bordered text-center align-middle">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <th>Payment Status</th>
                                                        <th>Subtotal</th>
                                                        <th>Shipping</th>
                                                        <th>Grand Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map(order => (
                                                        <React.Fragment key={order.order_id}>
                                                            <tr className="fw-semibold bg-light">
                                                                <td>{order.order_id}</td>
                                                                <td>
                                                                    {order.payment_status?.toLowerCase() === "non paid" ? (
                                                                        <span className="badge bg-danger px-3 py-2">Unpaid</span>
                                                                    ) : (
                                                                        <span className="badge bg-success px-3 py-2">Paid</span>
                                                                    )}
                                                                </td>
                                                                <td>₹{order.subtotal.toFixed(2)}</td>
                                                                <td>₹{order.shipping.toFixed(2)}</td>
                                                                <td className="fw-bold text-success">₹{order.grand_total.toFixed(2)}</td>
                                                            </tr>

                                                            {order.items && order.items.length > 0 && (
                                                                <tr>
                                                                    <td colSpan="5" className="p-0">
                                                                        <div className="p-3 bg-secondary-subtle rounded">
                                                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                                                <h6 className="text-muted fw-bold mb-0">Order Items ({order.items.length})</h6>
                                                                                <span className="badge bg-info text-dark">Total Items: {order.items.length}</span>
                                                                            </div>
                                                                            <div className="table-responsive">
                                                                                <table className="table table-striped table-bordered">
                                                                                    <thead className="table-light">
                                                                                        <tr>
                                                                                            <th>Image</th>
                                                                                            <th>Product</th>
                                                                                            <th>Quantity</th>
                                                                                            <th>Unit Price</th>
                                                                                            <th>Total</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {order.items.map(item => (
                                                                                            <tr key={item.id} className="align-middle">
                                                                                                <td>
                                                                                                    <img
                                                                                                        src={getProductImage(item)}
                                                                                                        alt={item.name}
                                                                                                        className="img-fluid rounded"
                                                                                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                                                                    />
                                                                                                </td>
                                                                                                <td>{item.name}</td>
                                                                                                <td>{item.qty}</td>
                                                                                                <td>₹{item.unit_price.toFixed(2)}</td>
                                                                                                <td className="fw-semibold">₹{item.price.toFixed(2)}</td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
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

export default UserOrder;