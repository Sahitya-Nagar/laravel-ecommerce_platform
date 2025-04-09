// import React, { useEffect, useState } from "react";
// import Layout from "./common/Layout";
// import { Link, useSearchParams } from "react-router-dom";
// import { apiUrl } from "../components/common/http";
// import LoadingPage from "../components/LoadingPage"; // Ensure this component exists

// const Shop = () => {
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [catChecked, setCatChecked] = useState(() => {
//     return searchParams.get("category") ? searchParams.get("category").split(",") : [];
//   });

//   const [brandChecked, setBrandChecked] = useState(() => {
//     return searchParams.get("brand") ? searchParams.get("brand").split(",") : [];
//   });

//   const updateSearchParams = () => {
//     const params = new URLSearchParams();
    
//     if (catChecked.length > 0) {
//       params.append("category", catChecked.join(","));
//     }

//     if (brandChecked.length > 0) {
//       params.append("brand", brandChecked.join(","));
//     }

//     setSearchParams(params);
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetch(`${apiUrl}/get-products?${searchParams}`)
//       .then((res) => res.json())
//       .then((result) => {
//         if (result.status === 200) {
//           setProducts(result.data);
//         } else {
//           console.log("Something went wrong");
//         }
//         setLoading(false);
//       });
//   }, [searchParams]);

//   useEffect(() => {
//     fetch(`${apiUrl}/get-categories`)
//       .then((res) => res.json())
//       .then((result) => {
//         if (result.status === 200) {
//           setCategories(result.data);
//         } else {
//           console.log("Something went wrong");
//         }
//       });
//   }, []);

//   useEffect(() => {
//     fetch(`${apiUrl}/get-brands`)
//       .then((res) => res.json())
//       .then((result) => {
//         if (result.status === 200) {
//           setBrands(result.data);
//         } else {
//           console.log("Something went wrong");
//         }
//       });
//   }, []);

//   const handleCategory = (e) => {
//     const { checked, value } = e.target;
//     setCatChecked((prev) => (checked ? [...prev, value] : prev.filter((id) => id !== value)));
//   };

//   const handleBrand = (e) => {
//     const { checked, value } = e.target;
//     setBrandChecked((prev) => (checked ? [...prev, value] : prev.filter((id) => id !== value)));
//   };

//   useEffect(() => {
//     updateSearchParams();
//   }, [catChecked, brandChecked]);

//   return (
//     <Layout>
//       <div className="container">
//         {loading ? (
//           <LoadingPage />
//         ) : (
//           <>
//             <nav aria-label="breadcrumb" className="py-4">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li className="breadcrumb-item active" aria-current="page">
//                   Shop
//                 </li>
//               </ol>
//             </nav>

//             <div className="row">
//               <div className="col-md-3">
//                 <div className="card shadow border-0 mb-3">
//                   <div className="card-body py-4">
//                     <h3 className="mb-3">Categories</h3>
//                     <ul>
//                       {categories &&
//                         categories.map((category) => (
//                           <li key={`cat-${category.id}`} className="mb-2">
//                             <input
//                               checked={catChecked.includes(category.id.toString())}
//                               value={category.id}
//                               type="checkbox"
//                               onChange={handleCategory}
//                             />
//                             <label htmlFor="" className="ps-2">
//                               {category.name}
//                             </label>
//                           </li>
//                         ))}
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="card shadow border-0 mb-3">
//                   <div className="card-body py-4">
//                     <h3 className="mb-3">Brands</h3>
//                     <ul>
//                       {brands &&
//                         brands.map((brand) => (
//                           <li key={`brand-${brand.id}`} className="mb-2">
//                             <input
//                               checked={brandChecked.includes(brand.id.toString())}
//                               value={brand.id}
//                               type="checkbox"
//                               onChange={handleBrand}
//                             />
//                             <label htmlFor="" className="ps-2">
//                               {brand.name}
//                             </label>
//                           </li>
//                         ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-9">
//                 <div className="row pb-5">
//                   {products &&
//                     products.map((product) => (
//                       <div className="col-md-4 col-6" key={`product-${product.id}`}>
//                         <div className="product card border-0">
//                           <div className="card-img">
//                             <Link to={`/product/${product.id}`}>
//                               <img src={product.image_url} alt="" className="w-100" />
//                             </Link>
//                           </div>
//                           <div className="card-body pt-3">
//                             <Link to={`/product/${product.id}`}>{product.title}</Link>
//                           </div>
//                           <div className="price">
//                             ₹{product.price} &nbsp;
//                             {product.compare_price && (
//                               <span className="text-decoration-line-through">₹{product.compare_price}</span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Shop;


import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { apiUrl } from "../components/common/http";
import LoadingPage from "../components/LoadingPage";
import '../assets/css/shop.scss';

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [catChecked, setCatChecked] = useState(() => {
    return searchParams.get("category") ? searchParams.get("category").split(",") : [];
  });

  const [brandChecked, setBrandChecked] = useState(() => {
    return searchParams.get("brand") ? searchParams.get("brand").split(",") : [];
  });

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (catChecked.length > 0) params.append("category", catChecked.join(","));
    if (brandChecked.length > 0) params.append("brand", brandChecked.join(","));
    setSearchParams(params);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/get-products?${searchParams}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) setProducts(result.data);
        else console.log("Something went wrong");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [searchParams]);

  useEffect(() => {
    fetch(`${apiUrl}/get-categories`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) setCategories(result.data);
        else console.log("Something went wrong");
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/get-brands`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) setBrands(result.data);
        else console.log("Something went wrong");
      })
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  const handleCategory = (e) => {
    const { checked, value } = e.target;
    setCatChecked((prev) => (checked ? [...prev, value] : prev.filter((id) => id !== value)));
  };

  const handleBrand = (e) => {
    const { checked, value } = e.target;
    setBrandChecked((prev) => (checked ? [...prev, value] : prev.filter((id) => id !== value)));
  };

  useEffect(() => {
    updateSearchParams();
  }, [catChecked, brandChecked]);

  return (
    <Layout>
      <div className="shop-container">
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <nav className="shop-breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Shop
                </li>
              </ol>
            </nav>

            <div className="shop-grid">
              <div className="shop-sidebar">
                <div className="filter-card">
                  <div className="card-body">
                    <h3>Categories</h3>
                    <ul className="list-unstyled">
                      {categories?.map((category) => (
                        <li key={`cat-${category.id}`}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              checked={catChecked.includes(category.id.toString())}
                              value={category.id}
                              type="checkbox"
                              id={`cat-${category.id}`}
                              onChange={handleCategory}
                            />
                            <label htmlFor={`cat-${category.id}`}>
                              {category.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="filter-card">
                  <div className="card-body">
                    <h3>Brands</h3>
                    <ul className="list-unstyled">
                      {brands?.map((brand) => (
                        <li key={`brand-${brand.id}`}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              checked={brandChecked.includes(brand.id.toString())}
                              value={brand.id}
                              type="checkbox"
                              id={`brand-${brand.id}`}
                              onChange={handleBrand}
                            />
                            <label htmlFor={`brand-${brand.id}`}>
                              {brand.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="shop-products">
                <div className="products-grid">
                  {products?.map((product) => (
                    <div className="product-col" key={`product-${product.id}`}>
                      <div className="product-card">
                        <div className="product-image">
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={product.image_url}
                              alt={product.title}
                              className="w-100"
                            />
                          </Link>
                        </div>
                        <div className="product-body">
                          <Link to={`/product/${product.id}`} className="product-title">
                            {product.title}
                          </Link>
                          <div className="product-price">
                            <span className="current-price">₹{product.price}</span>
                            {product.compare_price && (
                              <span className="old-price">₹{product.compare_price}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Shop;