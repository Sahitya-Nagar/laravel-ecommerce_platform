import React, { useContext, useState, useEffect } from 'react';
import Layout from './common/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './context/Cart';
import { toast } from 'react-toastify';
import { apiUrl, userToken } from './common/http';
import { useForm } from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Checkout = () => {
    const { cartData, subTotal, grandTotal, shipping } = useContext(CartContext);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const navigate = useNavigate();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [loadingCities, setLoadingCities] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            try {
                const res = await fetch(`${apiUrl}/get-account-detail`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${userToken()}`,
                    },
                });
                const result = await res.json();
                if (result.status === 200 && result.data) {
                    if (result.data.state) {
                        setSelectedState(result.data.state);
                        fetchCitiesByState(result.data.state);
                    }
                    return {
                        name: result.data.name,
                        email: result.data.email,
                        address: result.data.address,
                        city: result.data.city,
                        mobile: result.data.mobile,
                        state: result.data.state,
                        zip: result.data.zip,
                    };
                }
                return {};
            } catch (error) {
                console.error("Error loading user details:", error);
                return {};
            }
        },
    });

    const watchedState = watch('state');

    useEffect(() => {
        if (watchedState && watchedState !== selectedState) {
            setSelectedState(watchedState);
            fetchCitiesByState(watchedState);
            setValue('city', '');
        }
    }, [watchedState, setValue, selectedState]);

    const fetchStates = async () => {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country: 'India'
                })
            });
            const result = await response.json();
            if (result.data && result.data.states) {
                setStates(result.data.states);
            }
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const fetchCitiesByState = async (stateName) => {
        setLoadingCities(true);
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country: 'India',
                    state: stateName
                })
            });
            const result = await response.json();
            setLoadingCities(false);
            if (result.data) {
                setCities(result.data);
            }
        } catch (error) {
            setLoadingCities(false);
            console.error("Error fetching cities:", error);
            setCities([]);
        }
    };

    useEffect(() => {
        fetchStates();
    }, []);

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
        setPaymentError(null);
    };

    const updateUserDetails = async (formData) => {
        try {
            const res = await fetch(`${apiUrl}/update-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                    city: formData.city,
                    mobile: formData.mobile,
                    state: formData.state,
                    zip: formData.zip,
                }),
            });
            const result = await res.json();
            if (result.status !== 200) {
                console.error('Failed to update user details:', result);
                toast.error('Failed to update account details');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
            toast.error('Error updating account details');
        }
    };

    const saveOrder = async (formData, paymentStatus, paymentIntentId = null) => {
        const newFormData = {
            ...formData,
            grand_total: grandTotal(),
            subtotal: subTotal(),
            shipping: shipping(),
            discount: 0,
            payment_status: paymentStatus,
            status: 'pending',
            cart: cartData,
            payment_method: paymentMethod,
            payment_intent_id: paymentIntentId,
        };

        try {
            const res = await fetch(`${apiUrl}/save-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`,
                },
                body: JSON.stringify(newFormData),
            });
            const result = await res.json();
            if (result.status === 201) {
                localStorage.removeItem('cart');
                navigate(`/order/confirmation/${result.id}`);
            } else {
                toast.error('Something went wrong while saving the order');
                console.log('Order save failed:', result);
            }
        } catch (error) {
            console.error('Error saving order:', error);
            toast.error('Error saving order');
        }
    };

    const processOrder = async (data) => {
        console.log('Form Data:', data);
        await updateUserDetails(data);

        if (paymentMethod === 'cod') {
            await saveOrder(data, 'not paid');
        } else if (paymentMethod === 'stripe') {
            if (!stripe || !elements) {
                toast.error('Stripe.js has not loaded yet.');
                return;
            }

            setPaymentLoading(true);
            setPaymentError(null);

            try {
                // Create PaymentIntent on the backend
                const response = await fetch(`${apiUrl}/create-payment-intent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${userToken()}`,
                    },
                    body: JSON.stringify({
                        amount: grandTotal(), // Amount in INR
                    }),
                });
                const result = await response.json();

                if (result.status !== 200) {
                    throw new Error(result.error || 'Failed to create payment intent');
                }

                const { clientSecret } = result;

                // Confirm the payment with Stripe
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: data.name,
                            email: data.email,
                            address: {
                                city: data.city,
                                state: data.state,
                                postal_code: data.zip,
                                line1: data.address,
                                country: 'IN',
                            },
                        },
                    },
                });

                if (error) {
                    setPaymentError(error.message);
                    toast.error(error.message);
                    setPaymentLoading(false);
                    return;
                }

                if (paymentIntent.status === 'succeeded') {
                    await saveOrder(data, 'paid', paymentIntent.id);
                } else {
                    toast.error('Payment failed');
                    setPaymentLoading(false);
                }
            } catch (error) {
                setPaymentError(error.message);
                toast.error(error.message);
                setPaymentLoading(false);
            }
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
            },
        },
    };

    return (
        <Layout>
            <div className="container pb-5">
                <form onSubmit={handleSubmit(processOrder)}>
                    <div className="row">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" className="py-4">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Checkout
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-7">
                            <h3 className="border-bottom pb-3">
                                <strong>Billing Details</strong>
                            </h3>
                            <div className="row pt-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            {...register('name', {
                                                required: 'The Name field is required',
                                            })}
                                            type="text"
                                            className={`form-control ${errors.name && 'is-invalid'}`}
                                            placeholder="Name"
                                        />
                                        {errors.name && (
                                            <p className="invalid-feedback">{errors.name?.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        {...register('email', {
                                            required: 'The Email field is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        type="email"
                                        className={`form-control ${errors.email && 'is-invalid'}`}
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <p className="invalid-feedback">{errors.email?.message}</p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="address">
                                        Address
                                    </label>
                                    <textarea
                                        {...register('address', {
                                            required: 'The Address field is required',
                                        })}
                                        className={`form-control ${errors.address && 'is-invalid'}`}
                                        rows={3}
                                        placeholder="Address"
                                    />
                                    {errors.address && (
                                        <p className="invalid-feedback">{errors.address?.message}</p>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="state">
                                            State
                                        </label>
                                        <select
                                            {...register('state', {
                                                required: 'The State field is required',
                                            })}
                                            className={`form-select ${errors.state && 'is-invalid'}`}
                                        >
                                            <option value="">Select State</option>
                                            {states.map((state, index) => (
                                                <option key={index} value={state.name}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.state && (
                                            <p className="invalid-feedback">{errors.state?.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="city">
                                            City
                                        </label>
                                        <select
                                            {...register('city', {
                                                required: 'The City field is required',
                                            })}
                                            className={`form-select ${errors.city && 'is-invalid'}`}
                                            disabled={loadingCities || !selectedState}
                                        >
                                            <option value="">
                                                {loadingCities ? 'Loading cities...' : 'Select City'}
                                            </option>
                                            {cities.map((city, index) => (
                                                <option key={index} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.city && (
                                            <p className="invalid-feedback">{errors.city?.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="zip">
                                        ZIP
                                    </label>
                                    <input
                                        {...register('zip', {
                                            required: 'The Zip field is required',
                                            pattern: {
                                                value: /^\d{6}$/,
                                                message: 'Invalid Zip',
                                            },
                                        })}
                                        type="text"
                                        className={`form-control ${errors.zip && 'is-invalid'}`}
                                        placeholder="Zip"
                                    />
                                    {errors.zip && (
                                        <p className="invalid-feedback">{errors.zip?.message}</p>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="mobile">
                                        Contact Number
                                    </label>
                                    <input
                                        {...register('mobile', {
                                            required: 'The Mobile field is required',
                                            pattern: {
                                                value: /^\d{10}$/,
                                                message: 'Invalid Contact number',
                                            },
                                        })}
                                        type="text"
                                        className={`form-control ${errors.mobile && 'is-invalid'}`}
                                        title="Ten digit number"
                                        placeholder="Mobile"
                                    />
                                    {errors.mobile && (
                                        <p className="invalid-feedback">{errors.mobile?.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <h3 className="border-bottom pb-3">
                                <strong>Items</strong>
                            </h3>
                            <table className="table">
                                <tbody>
                                    {cartData && cartData.length > 0 ? (
                                        cartData.map((item) => (
                                            <tr key={`cart-${item.id}`}>
                                                <td width={100}>
                                                    <img src={item.image_url} width={80} alt={item.title} />
                                                </td>
                                                <td width={600}>
                                                    <h4>{item.title}</h4>
                                                    <div className="d-flex align-items-center pt-3">
                                                        <span>₹{item.price}</span>
                                                        {item.size && (
                                                            <div className="ps-3">
                                                                <button className="btn btn-size">{item.size}</button>
                                                            </div>
                                                        )}
                                                        <div className="ps-5">X {item.qty}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2}>Your cart is empty</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-between border-bottom pb-2">
                                        <div>Sub Total</div>
                                        <div>₹{subTotal()}</div>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div>Shipping</div>
                                        <div>₹{shipping()}</div>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div>
                                            <strong>Grand Total</strong>
                                        </div>
                                        <div>₹{grandTotal()}</div>
                                    </div>
                                </div>

                                <h3 className="border-bottom pt-4 pb-3">
                                    <strong>Payment Method</strong>
                                </h3>

                                <div>
                                    <input
                                        type="radio"
                                        checked={paymentMethod === 'cod'}
                                        value="cod"
                                        onChange={handlePaymentMethod}
                                    />
                                    <label className="form-label ps-2">Cash on Delivery</label>

                                    <input
                                        type="radio"
                                        checked={paymentMethod === 'stripe'}
                                        value="stripe"
                                        className="ms-3"
                                        onChange={handlePaymentMethod}
                                    />
                                    <label className="form-label ps-2">Credit/Debit Card</label>
                                </div>

                                {paymentMethod === 'stripe' && (
                                    <div className="mt-3">
                                        <label className="form-label">Card Details</label>
                                        <div className="border p-2">
                                            <CardElement options={cardElementOptions} />
                                        </div>
                                        {paymentError && (
                                            <p className="text-danger mt-2">{paymentError}</p>
                                        )}
                                    </div>
                                )}

                                <div className="d-flex py-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={paymentLoading || !cartData || cartData.length === 0}
                                    >
                                        {paymentLoading ? 'Processing...' : 'Place Order'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Checkout;