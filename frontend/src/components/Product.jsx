import React, { useContext, useEffect, useState } from 'react';
import Layout from './common/Layout';
import { Rating } from 'react-simple-star-rating';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../assets/css/product.scss'; // Ensure this is your SCSS file
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl, userToken } from './common/http';
import { CartContext } from './context/Cart';
import { toast } from 'react-toastify';
import Logo from '../assets/images/logoFinal.jpg';

const LoadingPage = () => (
    <div className="loading-page">
        <div className="loading-content">
            <img src={Logo} alt="Loading..." className="loading-logo" />
            <p>Loading store...</p>
        </div>
    </div>
);

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(0);
    const [product, setProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [sizeSelected, setSizeSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [submitting, setSubmitting] = useState(false);
    const params = useParams();
    const { addToCart } = useContext(CartContext);

    // Check localStorage directly to avoid unnecessary userToken() calls
    const userInfo = localStorage.getItem('userInfo');
    let token = null;
    if (userInfo) {
        try {
            token = userToken(); // Only call if userInfo exists
        } catch (error) {
            console.error('Error retrieving token:', error);
            token = null;
        }
    }
    console.log('Token at render:', token, 'Type:', typeof token);
    const isAuthenticated = !!token;

    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/get-product/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            console.log('Fetch Product Response Status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Fetch Product API Result:', result);
            if (result && result.status === 200 && result.data) {
                setProduct(result.data);
                setProductImages(result.data.product_images || []);
                setProductSizes(result.data.product_sizes || []);
                const imagePromises = (result.data.product_images || []).map(img => {
                    return new Promise((resolve) => {
                        const image = new Image();
                        image.onload = resolve;
                        image.onerror = resolve;
                        image.src = img.image_url;
                    });
                });
                await Promise.all(imagePromises);
            } else {
                console.log("API returned unexpected format or error:", result);
                toast.error("Failed to load product details");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            toast.error("Error loading product");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${apiUrl}/reviews/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const result = await response.json();
            if (result.status === 200) {
                setReviews(result.data);
                const avgRating = result.data.length > 0
                    ? result.data.reduce((acc, review) => acc + review.rating, 0) / result.data.length
                    : 0;
                setRating(avgRating);
            } else {
                console.log("Fetch Reviews API Error:", result);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleAddToCart = () => {
        if (productSizes.length > 0 && !sizeSelected) {
            toast.error("Please select a size");
        } else {
            addToCart(product, sizeSelected);
            toast.success("Product successfully added to cart");
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error("Please log in to submit a review");
            return;
        }
        if (!newReview.rating) {
            toast.error("Please provide a rating");
            return;
        }

        setSubmitting(true);
        try {
            const currentToken = userToken(); // Safe to call here since isAuthenticated is true
            console.log('apiUrl:', apiUrl, 'Type:', typeof apiUrl);
            console.log('userToken in submit:', currentToken, 'Type:', typeof currentToken);
            const url = `${apiUrl}/reviews`;
            console.log('Submitting to URL:', url);

            if (!apiUrl || typeof apiUrl !== 'string') {
                throw new Error('Invalid apiUrl');
            }
            if (!currentToken || typeof currentToken !== 'string') {
                throw new Error('User not authenticated - invalid or missing token');
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${currentToken}`,
                },
                body: JSON.stringify({
                    product_id: params.id,
                    rating: newReview.rating,
                    comment: newReview.comment,
                }),
            });
            const result = await response.json();
            console.log('Submit Review API Response:', result);
            if (result.status === 200) {
                setReviews([result.data, ...reviews]);
                setNewReview({ rating: 0, comment: '' });
                toast.success("Review submitted successfully");
                fetchReviews();
            } else {
                console.log('Submit Review API Error:', result);
                toast.error(result.message || "Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error(error.message || "Error submitting review");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, [params.id]);

    // Determine Swiper loop and slidesPerView based on productImages length
    const hasEnoughImages = productImages.length >= 6;
    const slidesPerViewThumbs = Math.min(productImages.length, 6); // Adjust dynamically

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <Layout>
            <div className='container product-detail'>
                <div className='row'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{product ? product.title : 'Loading...'}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                {product && (
                    <div className='row mb-5'>
                        <div className='col-md-5'>
                            <div className='row'>
                                <div className='col-2'>
                                    <Swiper
                                        style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
                                        onSwiper={setThumbsSwiper}
                                        loop={hasEnoughImages} // Enable loop only if enough images
                                        direction={`vertical`}
                                        spaceBetween={10}
                                        slidesPerView={slidesPerViewThumbs} // Dynamic slidesPerView
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper mt-2"
                                    >
                                        {productImages.map(product_images => (
                                            <SwiperSlide key={`image-${product_images.id}`}>
                                                <div className='content'>
                                                    <img
                                                        src={product_images.image_url}
                                                        alt={`${product.title} thumbnail`}
                                                        height={100}
                                                        className='w-100'
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className='col-10'>
                                    <Swiper
                                        style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
                                        loop={productImages.length > 1} // Loop if more than 1 image
                                        spaceBetween={0}
                                        navigation={true}
                                        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper2"
                                    >
                                        {productImages.map(product_images => (
                                            <SwiperSlide key={`image-sm-${product_images.id}`}>
                                                <div className='content'>
                                                    <img
                                                        src={product_images.image_url}
                                                        alt={`${product.title}`}
                                                        className='w-100'
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-7'>
                            <h2>{product.title}</h2>
                            <div className='d-flex'>
                                <Rating size={20} readonly initialValue={rating} />
                                <span className='pt-1 ps-2'>{reviews.length} Reviews</span>
                            </div>
                            <div className='price h3 py-3'>
                                ₹{product.price} {product.compare_price && <span className='text-decoration-line-through'>₹{product.compare_price}</span>}
                            </div>
                            <div>{product.short_description}</div>
                            <div className='pt-3'>
                                <strong>Select Size</strong>
                                <div className='sizes pt-2'>
                                    {productSizes.map(product_sizes => (
                                        <button
                                            key={`p-size-${product_sizes.id}`}
                                            onClick={() => setSizeSelected(product_sizes.size.name)}
                                            className={`btn btn-size me-2 ${sizeSelected === product_sizes.size.name ? 'active' : ''}`}
                                        >
                                            {product_sizes.size.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className='add-to-cart my-4'>
                                <button onClick={handleAddToCart} className='btn btn-primary text-uppercase'>
                                    Add To Cart
                                </button>
                            </div>
                            <hr />
                            <div><strong>SKU: </strong>{product.sku}</div>
                        </div>
                    </div>
                )}

                <div className='row pb-5'>
                    <div className='col-md-12'>
                        <Tabs defaultActiveKey="description" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="description" title="Description">
                                {product ? (
                                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                ) : (
                                    <p>Loading description...</p>
                                )}
                            </Tab>
                            <Tab eventKey="reviews" title={`Reviews (${reviews.length})`}>
                                <div className="reviews-container">
                                    {isAuthenticated ? (
                                        <div className="review-form mb-4">
                                            <h4>Write a Review</h4>
                                            <form onSubmit={handleReviewSubmit}>
                                                <div className="mb-3">
                                                    <label className="form-label">Your Rating:</label>
                                                    <Rating
                                                        onClick={(rating) => setNewReview({ ...newReview, rating })}
                                                        initialValue={newReview.rating}
                                                        size={25}
                                                        allowFraction
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Your Review:</label>
                                                    <textarea
                                                        className="form-control"
                                                        value={newReview.comment}
                                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                        placeholder="Write your review here..."
                                                        rows="3"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    disabled={submitting}
                                                >
                                                    {submitting ? 'Submitting...' : 'Submit Review'}
                                                </button>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="login-prompt mb-4">
                                            <p>
                                                Please{' '}
                                                <Link to="/account/login" className="login-link">
                                                    log in
                                                </Link>{' '}
                                                to write a review.
                                            </p>
                                        </div>
                                    )}

                                    {reviews.length > 0 ? (
                                        reviews.map(review => (
                                            <div key={review.id} className="review-item mb-3">
                                                <div className="review-header">
                                                    <div>
                                                        <strong>{review.user.name}</strong>
                                                        <Rating size={20} readonly initialValue={review.rating} />
                                                    </div>
                                                    <span className="review-date">
                                                        {new Date(review.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="review-comment">{review.comment}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No reviews yet. Be the first to review this product!</p>
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Product;