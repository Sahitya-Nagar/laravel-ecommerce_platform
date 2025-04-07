import React, { useContext, useEffect, useState } from 'react';
import Layout from './common/Layout';
import icon from '../assets/images/confirm-icon-17.jpg';
import { adminToken, apiUrl, userToken } from './common/http';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from './context/Auth';

const Confirmation = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${apiUrl}/save-order/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${userToken()}`,
          },
        });

        const result = await response.json();

        if (result.status === 200) {
          setOrder(result.data);
        } else {
          console.error('Failed to fetch order details');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <p className="mt-3">Loading order details...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="row d-flex justify-content-center text-center">
          <img src={icon} className="img-fluid mb-3" alt="Confirmation Icon" style={{ width: '150px' }} />
          <h3 className="text-success">Thank You!</h3>
          <p className="text-muted">Your order has been successfully placed.</p>

          <div className="col-md-8 mt-3">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="row g-0">
                {/* Left Side - Order Details */}
                <div className="col-md-6 bg-primary text-white p-4">
                  <h5 className="mb-4 text-white">Order Details</h5>
                  <div className="mb-3">
                    <span className="d-block small text-white-50">ORDER ID</span>
                    <span className="fs-5">#{order.id}</span>
                  </div>
                  <div className="mb-3">
                    <span className="d-block small text-white-50">DATE</span>
                    <span className="fs-5">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="mb-3">
                    <span className="d-block small text-white-50">STATUS</span>
                    <span className="badge bg-warning text-dark fs-6">{order.status}</span>
                  </div>
                  <div>
                    <span className="d-block small text-white-50">PAYMENT</span>
                    <span className="fs-5">{order.payment_method || "COD"}</span>
                  </div>
                </div>

                {/* Right Side - Customer Details */}
                <div className="col-md-6 bg-light p-4">
                  <h5 className="mb-4 text-primary">Delivery To</h5>
                  <div className="mb-3">
                    <span className="d-block small text-muted">CUSTOMER</span>
                    <span className="fs-5">{user.name}</span>
                  </div>
                  <div className="mb-3">
                    <span className="d-block small text-muted">ADDRESS</span>
                    <span className="fs-5">{order.address}</span>
                  </div>
                  <div>
                    <span className="d-block small text-muted">CONTACT</span>
                    <span className="fs-5">{order.mobile}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="card mt-4 border-0 shadow-sm">
              <div className="card-body">
                <table className="table table-borderless">
                  <thead>
                    <tr className="border-bottom">
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items && order.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>${item.price}</td>
                        <td>${(item.qty) * (item.price)}</td>
                      </tr>
                    ))}
                    <tr className="border-top">
                      <td colSpan="3" className="text-end"><strong>Subtotal</strong></td>
                      <td>${order.subtotal}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Shipping</strong></td>
                      <td>${order.shipping || 0}</td>
                    </tr>
                    <tr className="border-top">
                      <td colSpan="3" className="text-end"><strong>Grand Total</strong></td>
                      <td className="fw-bold">${order.grand_total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 d-flex justify-content-center gap-3">
              <Link to={`/order/${user?.id}`} className="btn btn-primary px-4 py-2">
                View Order Details
              </Link>
              <Link to="/" className="btn btn-outline-secondary px-4 py-2">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;

