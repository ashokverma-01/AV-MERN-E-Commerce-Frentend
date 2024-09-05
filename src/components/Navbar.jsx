import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilterData, products, auth, cart, setAuth } =
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
  const filterPrice = (price) => {
    setFilterData(products.filter((data) => data.price === Number(price)));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/product/search/${search.trim()}`);
      setSearch("");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
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
                <Link
                  to="/cart"
                  type="button"
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
                <Link to="/profile" className="btn btn-success mx-3">
                  <span class="material-symbols-outlined">manage_accounts</span>
                </Link>
                <button className="btn btn-danger mx-3" onClick={logout}>
                  <span class="material-symbols-outlined">logout</span>
                </button>
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
            <div className="items" onClick={() => filterCategory("headPhone")}>
              HeadPhone
            </div>
            <div className="items" onClick={() => filterCategory("earbuds")}>
              Earbuds
            </div>
            <div className="items" onClick={() => filterCategory("tv")}>
              Tv
            </div>
            <div className="items" onClick={() => filterPrice("1000")}>
              20000
            </div>
            <div className="items" onClick={() => filterPrice("1500")}>
              30000
            </div>
            <div className="items" onClick={() => filterPrice("3000")}>
              40000
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
