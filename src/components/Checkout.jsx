import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";

function Checkout() {
  const { cart, decreaseQty, addToCart, removeCart, userAddress } =
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
      <div
        className=""
        style={{ marginTop: "70px", textAlign: "center", fontWeight: "bold" }}
      ></div>
      <div className="container my-5">
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="">
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
              Order Summary
            </h1>
          </div>
        </div>
        <table className="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Image
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Title
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Price
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Quantity
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Qty -
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Qty +
              </th>

              <th scope="col" className="bg-dark text-light text-center">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((product) => (
              <tr key={product.id}>
                <td className="bg-dark text-light text-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                    }}
                  />
                </td>
                <td className="bg-dark text-light text-center">
                  {product.title}
                </td>

                <td className="bg-dark text-light text-center">
                  {product.price} ₹
                </td>
                <td className="bg-dark text-light text-center">
                  {product.qty}
                </td>
                <td className="bg-dark text-light text-center">
                  <span
                    
                    class="material-symbols-outlined"
                    onClick={() => decreaseQty(product.productId, 1)}
                  >
                    do_not_disturb_on
                  </span>
                </td>
                <td className="bg-dark text-light text-center">
                  <span
                
                    class="material-symbols-outlined"
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
                    add_circle
                  </span>
                </td>

                <td className="bg-dark text-light text-center">
                  <span
                  
                    class="material-symbols-outlined"
              
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to remove this item?")
                      ) {
                        removeCart(product.productId);
                      }
                    }}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="bg-dark text-light text-center">
                <button className="btn btn-primary">Total</button>
              </td>

              <td className="bg-dark text-light text-center">
                <button className="btn btn-warning">{price} ₹</button>
              </td>
              <td className="bg-dark text-light text-center">
                <button className="btn btn-info">{qty}</button>
              </td>
              <td colSpan="2" className="bg-dark text-light text-center">
                <button className="btn btn-secondary">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Proceed To Pay
                  </Link>
                </button>{" "}
              </td>
              <td className="bg-dark text-light text-center">
                <button className="btn btn-success">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Continue Shopping
                  </Link>
                </button>{" "}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="text-center">
          <h1>Shipping Address</h1>
          <table className="table table-bordered border-primary">
            <thead>
              <tr>
                <th scope="col" className="bg-dark text-light">
                  FullName
                </th>
                <th scope="col" className="bg-dark text-light">
                  Country
                </th>
                <th scope="col" className="bg-dark text-light">
                  State
                </th>
                <th scope="col" className="bg-dark text-light">
                  City
                </th>
                <th scope="col" className="bg-dark text-light">
                  PhoneNumber
                </th>
                <th scope="col" className="bg-dark text-light">
                  PinCode
                </th>
                <th scope="col" className="bg-dark text-light">
                  AddressNear/Nearby
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-dark text-light">{userAddress.fullName}</td>
                <td className="bg-dark text-light">{userAddress.country}</td>
                <td className="bg-dark text-light">{userAddress.state}</td>
                <td className="bg-dark text-light">{userAddress.city}</td>
                <td className="bg-dark text-light">{userAddress.phone}</td>
                <td className="bg-dark text-light">{userAddress.pinCode}</td>
                <td className="bg-dark text-light">{userAddress.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Checkout;
