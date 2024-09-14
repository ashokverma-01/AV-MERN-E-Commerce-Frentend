import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

function SearchProduct() {
  const { products } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { term } = useParams();
  console.log(useParams())
   
  useEffect(() => {
    if (products && term) {
      setFilteredProducts(
        products.filter((data) =>
          data.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  }, [term, products]);

  return (
    <div className="container text-center" style={{marginTop:'100px'}}>
      {/* <h1>Search Results</h1>      */}
      {filteredProducts?.map((product) => (
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
                <button className="btn btn-warning">Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchProduct;
