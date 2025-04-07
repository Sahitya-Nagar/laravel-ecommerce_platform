import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../common/Layout";
import Sidebar from "../common/Sidebar";
import { adminToken, apiUrl } from "../common/http";
import Loader from "../common/Loader";
import Nostate from "../common/Nostate";
import { toast } from "react-toastify";

const Shipping = () => {
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [shipping, setShipping] = useState(null);
    const [order, setOrder] = useState(null);
    const [detail, setDetail] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("pending");
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("not paid");

    // Fetch Order & Shipping Details
    const fetchShippingDetails = async () => {
        setLoader(true);
        try {
            console.log(`Fetching from: ${apiUrl}/shipping/${id}`);
            const res = await fetch(`${apiUrl}/shipping/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${adminToken()}`,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP status ${res.status}`);
            }

            const result = await res.json();
            setLoader(false);

            if (result.status === 200) {
                console.log("Shipping Data:", result);
                setOrder(result.order);
                setShipping(result.items);
            } else {
                console.log("Shipping details not found");
                setOrder(null);
                setShipping([]);
            }
        } catch (error) {
            setLoader(false);
            console.error("Error fetching shipping details:", error);
        }
    };

    const fetchItems = async () => {
        setLoader(true);
        try {
            console.log(`Fetching from: ${apiUrl}/order-detail/${id}`);
            const res = await fetch(`${apiUrl}/order-detail/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${adminToken()}`,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP status ${res.status}`);
            }

            const result = await res.json();
            setLoader(false);

            if (result.status === 200) {
                console.log("Items Data:", result);
                setDetail(result.data);
            } else {
                console.log("Items not found");
                setDetail(null);
            }
        } catch (error) {
            setLoader(false);
            console.error("Error fetching items:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                status: selectedStatus,
                paymentStatus: selectedPaymentStatus,
            };

            const res = await fetch(`${apiUrl}/order/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${adminToken()}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            console.log("Update API response:", result);

            if (!res.ok) {
                throw new Error(
                    `HTTP status ${res.status}: ${result.message || "Unknown error"} - ${result.error || "No detailed error"}`
                );
            }

            if (result.status === 200) {
                setOrder((prevOrder) => ({
                    ...prevOrder,
                    status: result.data.status,
                    paymentStatus: result.data.payment_status,
                }));
                toast.success("Status updated successfully!");
            } else {
                toast.error(`Failed to update status: ${result.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error(`Error updating status: ${error.message}`);
        }
    };

    useEffect(() => {
        if (!id || id.includes(":")) {
            console.error("Invalid order ID received:", id);
            return;
        }
        fetchShippingDetails();
        fetchItems();
    }, [id]);

    useEffect(() => {
        if (order) {
            setSelectedStatus(order.status);
            setSelectedPaymentStatus(order.payment_status);
            console.log("Order loaded:", order);
            console.log("Selected Status:", order.status);
            console.log("Selected Payment Status:", order.payment_status);
        }
    }, [order]);

    // Calculate shipping per item if not provided in items
    const calculateShippingPerItem = () => {
        if (!detail?.items || !order?.shipping) return 0;
        const totalItems = detail.items.length;
        return totalItems > 0 ? (order.shipping / totalItems).toFixed(2) : 0;
    };

    // Calculate total price per item (unit_price + shipping)
    const calculateItemTotal = (item) => {
        const shippingPerItem = item.shipping || calculateShippingPerItem();
        return (item.unit_price + parseFloat(shippingPerItem)).toFixed(2);
    };

    return (
        <Layout>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>

                    <div className="col-md-9">
                        <div className="card shadow-lg border-0 rounded-3">
                            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Shipping Details</h5>
                                {order && (
                                    <span
                                        className={`badge ${
                                            order.status === "shipped" ? "bg-success" : "bg-warning"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                )}
                            </div>

                            <div className="card-body p-4">
                                {loader && <Loader />}

                                {!loader && !order && <Nostate text="No shipping details found" />}

                                {!loader && order && (
                                    <>
                                        <div className="border-bottom pb-2">
                                            <h6 className="mb-1 text-muted">Order ID: #{order.id}</h6>
                                            <p>
                                                <strong>Customer:</strong> {order.name}
                                            </p>
                                            <p>
                                                <strong>Contact no:</strong> {order.mobile}
                                            </p>
                                            <p>
                                                <strong>Address:</strong> {order.address}, {order.city},{" "}
                                                {order.state} - {order.zip}
                                            </p>
                                        </div>

                                        <h5 className="mt-4 border-bottom pb-2">Order Items</h5>

                                        {shipping?.length === 0 ? (
                                            <p className="text-danger text-center">
                                                No items found for this order
                                            </p>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover text-center">
                                                    <thead className="bg-light">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Product</th>
                                                            <th>Image</th>
                                                            <th>Size</th>
                                                            <th>Quantity</th>
                                                            <th>Unit Price</th>
                                                            <th>Shipping Price</th>
                                                            <th>Total Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {detail?.items?.map((item) => {
                                                            const shippingPerItem =
                                                                item.shipping || calculateShippingPerItem();
                                                            const totalPrice = calculateItemTotal(item);
                                                            return (
                                                                <tr key={item.id} className="align-middle">
                                                                    <td>
                                                                        <strong>#{item.id}</strong>
                                                                    </td>
                                                                    <td>{item.name}</td>
                                                                    <td>
                                                                        <img
                                                                            src={item.product.image_url}
                                                                            alt={item.name}
                                                                            style={{
                                                                                width: "50px",
                                                                                height: "50px",
                                                                                objectFit: "cover",
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td>{item.size || "N/A"}</td>
                                                                    <td>
                                                                        <span className="badge bg-primary">
                                                                            {item.qty}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-success">
                                                                        ₹{item.unit_price}
                                                                    </td>
                                                                    <td className="text-success">
                                                                        ₹{shippingPerItem}
                                                                    </td>
                                                                    <td className="text-danger">
                                                                        ₹{totalPrice}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }) || (
                                                            <tr>
                                                                <td colSpan="8">No items found</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Status Updater Section */}
                                        <div className="mt-4">
                                            <h5 className="border-bottom pb-2">Update Status</h5>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Status</label>
                                                    <select
                                                        className="form-select"
                                                        value={selectedStatus}
                                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Payment Status</label>
                                                    <select
                                                        className="form-select"
                                                        value={selectedPaymentStatus}
                                                        onChange={(e) =>
                                                            setSelectedPaymentStatus(e.target.value)
                                                        }
                                                    >
                                                        <option value="paid">Paid</option>
                                                        <option value="not paid">Not Paid</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-primary"
                                                onClick={handleUpdate}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Link to="/admin/orders" className="btn btn-primary mt-2 mb-3">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Shipping;