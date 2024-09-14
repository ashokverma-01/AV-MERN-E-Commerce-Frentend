import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import AppContext from "../../context/AppContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RelatedProduct({ category }) {
  const { products,addToCart } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products && category) {
      setRelatedProducts(
        products.filter(
          (data) => data.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
  }, [category, products]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container text-center">
      <h1>Related Products</h1>
      <Slider {...sliderSettings}>
        {relatedProducts?.map((product) => (
          <div key={product._id} className="p-3">
            <div
              className="card bg-dark text-light text-center"
              style={{ width: "18rem", margin: "0 auto" }}
            >
              <Link
                to={`/product/${product._id}`}
                className="d-flex justify-content-center align-items-center p-3"
              >
                <img
                  src={`http://localhost:5000/${product?.image}`}
                  className="card-img-top"
                  alt={product?.title || "Product Image"}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <div className="my-3">
                  <button className="btn btn-primary mx-3">
                    {product?.price} ₹
                  </button>
                  <button className="btn btn-warning"  onClick={() =>
                          addToCart(
                            product._id,
                            product.title,
                            product.price,
                            1,
                            product.image
                          )
                        }>Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RelatedProduct;
