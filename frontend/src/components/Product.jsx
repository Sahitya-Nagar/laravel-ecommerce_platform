// import React, { useContext, useEffect, useState } from 'react'
// import Layout from './common/Layout';
// import { Rating } from 'react-simple-star-rating'
// import {Link, useParams} from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Thumbs, FreeMode, Navigation  } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';

// import ProductImgOne from '../assets/images/mens/five.jpg'
// import ProductImgTwo from '../assets/images/mens/six.jpg'
// import ProductImgThree from '../assets/images/mens/seven.jpg'
// import { apiUrl } from './common/http';
// import { CartContext } from './context/Cart';
// import { toast } from 'react-toastify';


// const Product = () => {
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [rating, setRating] = useState(4)
//     const [product, setProduct] = useState([])
//     const [productImages, setProductImages] = useState([])
//     const [productSizes, setProductSizes] = useState([])
//     const [sizeSelected, setSizeSelected] = useState(null)
//     const [logIn,setLogIn] = useState([])
//     const params = useParams()
//     const { addToCart } = useContext(CartContext)

//     const fetchProduct = ( ) => {
//           fetch(`${apiUrl}/get-product/${params.id}`,{
//                 method: 'GET',
//                 headers: {
//                       'Content-type' : 'application/json',
//                       'Accept' : 'application/json'
//                 }
//           })
//           .then(res => res.json())
//           .then(result => {
//                 console.log(result)
//                 if(result.status == 200){    
//                       setProduct(result.data)
//                       setProductImages(result.data.product_images)
//                       setProductSizes(result.data.product_sizes)
//                 }else{
//                       console.log("Something Went wrong")
//                 }
               
//           })
//       }

//     const handleAddToCart = () => {

//         if(productSizes.length > 0){
//             if(sizeSelected == null){
//                toast.error("Please select a size")
//             }else{   
//                     if (setLogIn) {
//                         addToCart(product,sizeSelected)
//                         toast.success("Product successfully added to cart")
//                     } else {
//                         toast.error("Please Login First")
//                         }
                    
//             }
//         }else{
//             addToCart(product,null)
//             toast.success("Product successfully added to cart")
//         }
//     }
    
//     useEffect (() => {
//         fetchProduct()
//     },[])

//   return (
//         <Layout>
//             <div className='container product-detail'>
//                 <div className='row'>
//                     <div className='col-md-12'>
//                     <nav aria-label="breadcrumb" className='py-4'>
//                         <ol className="breadcrumb">
//                         <li className="breadcrumb-item"><Link to="/">Home</Link></li>
//                         <li className="breadcrumb-item" aria-current="page"><Link to="/shop">Shop</Link></li>
//                         <li className="breadcrumb-item active" aria-current="page">Dummy Product Title</li>

//                         </ol>
//                     </nav>
//                     </div>
//                 </div>

//                 <div className='row mb-5'>

//                     <div className='col-md-5'>
//                         <div className='row'>
//                             <div className='col-2'>

//                             <Swiper
//                                 style={{
//                                     '--swiper-navigation-color': '#000',
//                                     '--swiper-pagination-color': '#000',
//                                     }}
//                                     onSwiper={setThumbsSwiper}
//                                     loop={true}
//                                     direction={`vertical`}
//                                     spaceBetween={10}
//                                     slidesPerView={6}
//                                     freeMode={true}
//                                     watchSlidesProgress={true}
//                                     modules={[FreeMode, Navigation, Thumbs]}
//                                     className="mySwiper mt-2"
//                                 >
//                                 {
//                                     productImages && productImages.map(product_images => {
//                                         return(
//                                             <SwiperSlide key={`image-${product_images.id}`}>
//                                             <div className='content'>
//                                                 <img 
//                                                     src={product_images.image_url} 
//                                                     alt="" 
//                                                     height={100}
//                                                     className='w-100' />
//                                             </div>                                                                      
//                                             </SwiperSlide>
//                                         )
//                                     })
//                                 }
//                         </Swiper>


//                             </div>

//                             <div className='col-10'>

//                                 <Swiper
//                                     style={{
//                                         '--swiper-navigation-color': '#000',
//                                         '--swiper-pagination-color': '#000',
//                                         }}
//                                         loop={true}
//                                         spaceBetween={0}
//                                         navigation={true}
//                                         thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
//                                         modules={[FreeMode, Navigation, Thumbs]}
//                                         className="mySwiper2"
//                                     >
//                                     {
//                                         productImages && productImages.map(product_images => {
//                                             return(
//                                                 <SwiperSlide key={`image-sm-${product_images.id}`}>
//                                                 <div className='content'>
//                                                     <img 
//                                                         src={product_images.image_url} 
//                                                         alt="" 
//                                                         className='w-100' />
//                                                 </div>                                                                      
//                                                 </SwiperSlide>
//                                             )
//                                         })
//                                     }
//                             </Swiper>


//                             </div>

//                         </div>
//                     </div>
                    
//                     <div className='col-md-7'>
//                         <h2>{product.title}</h2>
                          
//                             <div className='d-flex'>
//                             <Rating
//                                 size={20}
//                                 readonly
//                                 initialValue={rating}

//                             />
//                             <span className='pt-1 ps-2'>10 Reviews</span>
//                             </div>
                            
//                             <div className='price h3 py-3'>
//                                 ₹{product.price} &nbsp;                   
//                                 {
//                                 product.compare_price && 
//                                 <span className='text-decoration-line-through'>₹{product.compare_price}</span>
//                                 }
//                             </div>

//                             <div>
//                                {product.short_description}
//                             </div>
                            
//                             <div className='pt-3'>
//                                 <strong>Select Size</strong>

//                                 <div className='sizes pt-2'>
//                                     {
//                                        productSizes && productSizes.map(product_sizes => {
//                                         return(
//                                             <button key={`p-size-${product_sizes.id}`}
//                                             onClick={() => setSizeSelected(product_sizes.size.name)}
//                                             className={`btn btn-size me-2 ${sizeSelected == product_sizes.size.name ? 'active' : '' }`}           
//                                             >{product_sizes.size.name}</button>
//                                         )
//                                        }) 
//                                     }
//                                 </div>
//                             </div>

//                             <div className='add-to-cart my-4'>
//                                 <button
//                                 onClick={() => handleAddToCart()}
//                                 className='btn btn-primary text-uppercase'>Add To Cart</button>
//                             </div>

//                             <hr />
                                
//                             <div>
//                                 <strong>SKU</strong>
//                                 {product.sku}
//                             </div>

                        
//                     </div>


//                 </div>
                
//                 <div className='row pb-5'>
//                     <div className='col-md-12'>
//                     <Tabs
//                         defaultActiveKey="description"
//                         id="uncontrolled-tab-example"
//                         className="mb-3"
//                         >
//                         <Tab eventKey="description" title="Description">
//                             <div dangerouslySetInnerHTML={{__html:product.description}}>
//                             </div>
//                         </Tab>
//                         <Tab eventKey="reviews" title="Reviews (10)">
//                             Reviews Area
//                         </Tab>
//                     </Tabs>             
//                     </div>

//                 </div>
//             </div>
//         </Layout>


//   )
// }

// export default Product


import React, { useContext, useEffect, useState } from 'react'
import Layout from './common/Layout';
import { Rating } from 'react-simple-star-rating'
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl } from './common/http';
import { CartContext } from './context/Cart';
import { toast } from 'react-toastify';
import Logo from '../assets/images/logoFinal.jpg';


// Create a loading page component that appears before Layout
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
    const [rating, setRating] = useState(4)
    const [product, setProduct] = useState(null)
    const [productImages, setProductImages] = useState([])
    const [productSizes, setProductSizes] = useState([])
    const [sizeSelected, setSizeSelected] = useState(null)
    const [logIn, setLogIn] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const { addToCart } = useContext(CartContext)

    const fetchProduct = () => {
        setIsLoading(true);
        fetch(`${apiUrl}/get-product/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === 200) {
                setProduct(result.data);
                setProductImages(result.data.product_images);
                setProductSizes(result.data.product_sizes);
                
                // Preload images for smoother viewing experience
                const imagePromises = result.data.product_images.map(img => {
                    return new Promise((resolve) => {
                        const image = new Image();
                        image.onload = resolve;
                        image.onerror = resolve; // Handle errors gracefully
                        image.src = img.image_url;
                    });
                });
                
                Promise.all(imagePromises).then(() => {
                    setIsLoading(false);
                });
            } else {
                console.log("Something went wrong");
                setIsLoading(false);
            }
        })
        .catch(error => {
            console.error("Error fetching product:", error);
            setIsLoading(false);
        });
    }

    const handleAddToCart = () => {
        if (productSizes.length > 0) {
            if (sizeSelected === null) {
                toast.error("Please select a size");
            } else {
                    addToCart(product, sizeSelected);
                    toast.success("Product successfully added to cart");    
            }
        } else {
            addToCart(product, null);
            toast.success("Product successfully added to cart");
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [params.id]);

    // Show the loading page before the entire layout
    if (isLoading) {
        return <LoadingPage />;
    }

    if (!product) {
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
                                <li className="breadcrumb-item" aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className='row mb-5'>
                    <div className='col-md-5'>
                        <div className='row'>
                            <div className='col-2'>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    direction={`vertical`}
                                    spaceBetween={10}
                                    slidesPerView={6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >
                                    {
                                        productImages && productImages.map(product_images => {
                                            return (
                                                <SwiperSlide key={`image-${product_images.id}`}>
                                                    <div className='content'>
                                                        <img
                                                            src={product_images.image_url}
                                                            alt={`${product.title} thumbnail`}
                                                            height={100}
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>

                            <div className='col-10'>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    loop={true}
                                    spaceBetween={0}
                                    navigation={true}
                                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    {
                                        productImages && productImages.map(product_images => {
                                            return (
                                                <SwiperSlide key={`image-sm-${product_images.id}`}>
                                                    <div className='content'>
                                                        <img
                                                            src={product_images.image_url}
                                                            alt={`${product.title}`}
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-7'>
                        <h2>{product.title}</h2>

                        <div className='d-flex'>
                            <Rating
                                size={20}
                                readonly
                                initialValue={rating}
                            />
                            <span className='pt-1 ps-2'>10 Reviews</span>
                        </div>

                        <div className='price h3 py-3'>
                            ₹{product.price} &nbsp;
                            {
                                product.compare_price &&
                                <span className='text-decoration-line-through'>₹{product.compare_price}</span>
                            }
                        </div>

                        <div>
                            {product.short_description}
                        </div>

                        <div className='pt-3'>
                            <strong>Select Size</strong>

                            <div className='sizes pt-2'>
                                {
                                    productSizes && productSizes.map(product_sizes => {
                                        return (
                                            <button key={`p-size-${product_sizes.id}`}
                                                onClick={() => setSizeSelected(product_sizes.size.name)}
                                                className={`btn btn-size me-2 ${sizeSelected === product_sizes.size.name ? 'active' : ''}`}
                                            >{product_sizes.size.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='add-to-cart my-4'>
                            <button
                                onClick={() => handleAddToCart()}
                                className='btn btn-primary text-uppercase'>Add To Cart</button>
                        </div>

                        <hr />

                        <div>
                            <strong>SKU: </strong>
                            {product.sku}
                        </div>
                    </div>
                </div>

                <div className='row pb-5'>
                    <div className='col-md-12'>
                        <Tabs
                            defaultActiveKey="description"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="description" title="Description">
                                <div dangerouslySetInnerHTML={{ __html: product.description }}>
                                </div>
                            </Tab>
                            <Tab eventKey="reviews" title="Reviews (10)">
                                Reviews Area
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product