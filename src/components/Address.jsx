import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

function Address() {
  const navigate = useNavigate();
  const { addAddress, userAddress } = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    phoneNumber: "",
    address: "",
  });

  const { fullName, address, city, state, country, phoneNumber, pinCode } =
    formData; // Changed phone to phoneNumber

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Passing phoneNumber instead of phone
      const result = await addAddress(
        fullName,
        address,
        city,
        state,
        country,
        phoneNumber,
        pinCode
      );
      if (result.success) {
        navigate("/checkout");
      }
    } catch (error) {
      console.error("Error during address submission:", error);
    }
  };

  return (
    <div style={{ marginTop: "70px", fontWeight: "bold" }}>
      <div
        className="container my-1 p-4"
        style={{
          width: "75%",
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Shipping Address</h1>
        <form onSubmit={handleSubmit} className="my-3">
          {/* Full Name, Country, and State in one row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="nameInput" className="form-label">
                Full Name
              </label>
              <input
                value={formData.fullName}
                onChange={onchangeHandler}
                name="fullName"
                type="text"
                className="form-control bg-dark text-light"
                id="nameInput"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="countryInput" className="form-label">
                Country
              </label>
              <input
                value={formData.country}
                onChange={onchangeHandler}
                name="country"
                type="text"
                className="form-control bg-dark text-light"
                id="countryInput"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="stateInput" className="form-label">
                State
              </label>
              <input
                value={formData.state}
                onChange={onchangeHandler}
                name="state"
                type="text"
                className="form-control bg-dark text-light"
                id="stateInput"
                required
              />
            </div>
          </div>

          {/* City, Pin Code, and Phone Number in one row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="cityInput" className="form-label">
                City
              </label>
              <input
                value={formData.city}
                onChange={onchangeHandler}
                name="city"
                type="text"
                className="form-control bg-dark text-light"
                id="cityInput"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="pinCodeInput" className="form-label">
                Pin Code
              </label>
              <input
                value={formData.pinCode}
                onChange={onchangeHandler}
                name="pinCode"
                type="text"
                className="form-control bg-dark text-light"
                id="pinCodeInput"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="phoneNumberInput" className="form-label">
                Phone Number
              </label>
              <input
                value={formData.phoneNumber}
                onChange={onchangeHandler}
                name="phoneNumber"
                type="text"
                className="form-control bg-dark text-light"
                id="phoneNumberInput"
                required
              />
            </div>
          </div>

          {/* Address in one row */}
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="addressInput" className="form-label">
                AddressLine/Nearby
              </label>
              <textarea
                value={formData.address}
                onChange={onchangeHandler}
                name="address"
                className="form-control bg-dark text-light"
                id="addressInput"
                rows="2"
                required
              />
            </div>
          </div>

          {/* Submit and Use Old Address buttons */}
          <div
            className="d-grid col-12 mx-auto my-3"
            style={{ width: "50%", fontWeight: "bold" }}
          >
            <button type="submit" className="btn btn-primary mb-3" style={{fontWeight:'bold'}}>
              Submit
            </button>

           
          </div>
        </form>  
        {userAddress && (
           <div
           className="d-grid col-12 mx-auto my-3"
           style={{ width: "50%"}}
         >
           <Link to="/checkout" className="btn btn-warning" style={{fontWeight:'bold'}}>
             Use Old Address
           </Link>
         </div>

        )}    
      </div>
    </div>
  );
}

export default Address;
