import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedProducts = ({ products }) => {
  return (
    <section className="section-2 py-5">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="row mt-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col-md-3 col-6" key={`product-${product.id}`}>
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-100"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                    <div className="price">
                      ₹{product.price}{' '}
                      {product.compare_price && (
                        <span className="text-decoration-line-through">
                          ₹{product.compare_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No featured products available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;