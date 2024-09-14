import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, decreaseQty, addToCart, removeCart, cartClear } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (cart && Array.isArray(cart)) {
      // Calculate total price
      const totalPrice = cart.reduce((acc, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQty = parseInt(item.qty, 10) || 0;
        return acc + itemPrice * itemQty;
      }, 0);

      // Calculate total quantity
      const totalQty = cart.reduce((acc, item) => {
        const itemQty = parseInt(item.qty, 10) || 0;
        return acc + itemQty;
      }, 0);

      setPrice(totalPrice);
      setQty(totalQty);
    }
  }, [cart]);

  return (
    <>
      <div className="" style={{ marginTop: "90px" }}>
        {cart?.length == 0 ? (
          <>
            <div className="container  my-5 text-center" style={{border:'2px solid yellow',padding:'5px',width:'20%',borderRadius:'10px'}}>
              <Link to="/" style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>Continue Shopping.....</Link>
            </div>
          </>
        ) : (
          <>
            <div className="container my-5 text-center">
              <div
                className="button btn btn-info mx-3"
                style={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Total Qty :-{qty}
              </div>
              <div
                className="button btn btn-warning mx-3"
                style={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Total Price :-{price}
              </div>
            </div>
          </>
        )}
        {cart?.map((product) => {
          return (
            <div
              key={product.id}
              className="container bg-dark my-5 p-3 text-center"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div className="cart-image">
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.title}
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="cart-info">
                  <h1>{product.title}</h1>
                  <h5>
                    {product.price} {"₹"}
                  </h5>
                  <h6>Qty:-{product.qty}</h6>
                </div>
                <div className="cart-actions">
                  <div
                    className="button btn btn-warning mx-3"
                    style={{ fontWeight: "bold" }}
                    onClick={() =>
                      addToCart(
                        product.productId,
                        product.title,
                        product.price / product.qty,
                        1,
                        product.image
                      )
                    }
                  >
                    +
                  </div>
                  <div
                    className="button btn btn-info mx-3"
                    style={{ fontWeight: "bold" }}
                    onClick={() => decreaseQty(product?.productId, 1)}
                  >
                    -
                  </div>
                  <div
                    className="button btn btn-danger mx-3"
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      if (confirm("Are you Soure Remove This Item")) {
                        removeCart(product?.productId);
                      }
                    }}
                  >
                    Remove
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {cart?.length > 0 && (
          <>
            <div className="container my-5 text-center">
              <Link
                to="/address"
                className="button btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
              >
                CheckOut
              </Link>
              <button
                className="button btn btn-danger mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  if (confirm("Are you soure remove this cart")) {
                    cartClear();
                  }
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
