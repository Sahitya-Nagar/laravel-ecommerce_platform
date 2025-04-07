// import React from 'react';

// import LatestProducts from './common/LatestProducts';
// import FeaturedProducts from './common/FeaturedProducts';
// import Hero from './common/Hero';
// import Layout from './common/Layout';
// import Testimonials from './Testimonials';


// const Home = () => {
//   return (
//    <>
//       <Layout>
//           <Hero/>
//           <LatestProducts/>
//           <FeaturedProducts/>     
//           <Testimonials/>  
//       </Layout>
//    </>
//   )
// }

// export default Home

import React, { useEffect, useState } from 'react';
import { apiUrl } from './common/http'; // Adjust path as needed
import Layout from './common/Layout';
import Hero from './common/Hero';
import LatestProducts from './common/LatestProducts';
import FeaturedProducts from './common/FeaturedProducts';
import Testimonials from './Testimonials';
import Logo from '../assets/images/logoFinal.jpg';

const LoadingPage = () => (
  <div className="loading-page">
      <div className="loading-content">
          <img src={Logo} alt="Loading..." className="loading-logo" />
          <p>Loading your shopping experience</p>
      </div>
  </div>
);


const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data at once
  const fetchHomeData = async () => {
    try {
      setLoading(true);

      // Fetch Latest Products
      const latestRes = await fetch(`${apiUrl}/get-latest-products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      const latestResult = await latestRes.json();

      // Fetch Featured Products
      const featuredRes = await fetch(`${apiUrl}/get-featured-products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      const featuredResult = await featuredRes.json();

      // Set data only if both requests succeed
      if (latestResult.status === 200 && featuredResult.status === 200) {
        setLatestProducts(latestResult.data || []);
        setFeaturedProducts(featuredResult.data || []);
        prefetchImages([...(latestResult.data || []), ...(featuredResult.data || [])]);
      } else {
        console.error('Failed to fetch data:', { latestResult, featuredResult });
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prefetch images for both latest and featured products
  const prefetchImages = (products) => {
    products.forEach((product) => {
      const img = new Image();
      img.src = product.image_url;
    });
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  // Render nothing but the Loader until all data is ready
  if (loading) {
    return <LoadingPage />;
  }

  // Once loading is false, render the entire page
  return (
    <Layout>
      <Hero />
      <LatestProducts products={latestProducts} />
      <FeaturedProducts products={featuredProducts} />
      <Testimonials />
    </Layout>
  );
};

export default Home;