import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register({ name, email, password });
      if (result) {
        navigate('/login');
      } else {
        // Handle registration error (e.g., show a message to the user)
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Show error message to the user
    }
  };

  return (
    <div style={{marginTop:'100px'}}>
    <div
      className="container my-5 p-4"
      style={{
        width: "500px",
        border: "2px solid yellow",
        borderRadius: "10px",
      }}
    >
      <h1 className="text-center">Register</h1>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input
            value={formData.name}
            onChange={onchangeHandler}
            name="name"
            type="text"
            className="form-control"
            id="nameInput"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            value={formData.email}
            onChange={onchangeHandler}
            name="email"
            type="email"
            className="form-control"
            id="emailInput"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            value={formData.password}
            onChange={onchangeHandler}
            name="password"
            type="password"
            className="form-control"
            id="passwordInput"
          />
        </div>
        <div className="d-grid col-6 mx-auto my-3">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Register;
