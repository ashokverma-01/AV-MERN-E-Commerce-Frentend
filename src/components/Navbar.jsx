import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  

  const { setFilterData, products, auth, cart, user } =
    useContext(AppContext);

  const allProducts = () => {
    setFilterData(products);
  };

  const filterCategory = (cat) => {
    setFilterData(
      products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      )
    );
  };
  const filterPrice = (minPrice, maxPrice) => {
    const filteredProducts = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Now set the state or perform any other actions with filteredProducts
    setFilterData(filteredProducts);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/product/search/${search.trim()}`);
      setSearch("");
    }
  };

 

  return (
    <div>
      <div className="nav sticky-top">
        <div className="nav-bar">
          <div className="left">
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <h4>AV-E-Commerce</h4>
            </Link>
          </div>
          <form className="search-bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Product"
            />
          </form>
          <div className="right">
            {auth && (
              <>
                <Link to="/allproduct" className="btn btn-warning mx-3">
                  Admin
                </Link>
                <Link
                  to="/cart"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cart?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      <span className="visually-hidden">unread messages</span>
                      {cart?.length}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className=" mx-3">
                  {user && (
                    <img
                      src={`http://localhost:5000/${user.image}`}
                      alt="Product"
                      style={{
                        width: "35px",
                        height: "35px",
                        objectFit: "cover",
                       borderRadius:'50%',
                       border:'2px solid yellow'
                      }}
                    />
                  )}
                </Link>
              </>
            )}
            {!auth && (
              <>
                <Link to="/login" className="btn btn-secondary mx-3">
                  Login
                </Link>
                <Link to="/register" className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname == "/" && (
          <div className="sub-bar sticky-top my-5">
            <div className="items" onClick={() => allProducts(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterCategory("mobile")}>
              Mobile
            </div>
            <div className="items" onClick={() => filterCategory("laptop")}>
              LapTop
            </div>
            <div className="items" onClick={() => filterCategory("camera")}>
              Camera
            </div>
            <div className="items" onClick={() => filterCategory("headphone")}>
              HeadPhone
            </div>
            <div className="items" onClick={() => filterCategory("birds")}>
              Earbuds
            </div>
            <div className="items" onClick={() => filterCategory("tv")}>
              Tv
            </div>
            <div className="items" onClick={() => filterPrice(1000, 5000)}>
              1000 - 5000
            </div>
            <div className="items" onClick={() => filterPrice(5000, 10000)}>
              5000 - 10000
            </div>
            <div className="items" onClick={() => filterPrice(10000, 30000)}>
              10000 - 30000
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
