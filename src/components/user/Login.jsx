import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({  email, password });
      if (result) {
        navigate('/');
      } else {
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Error during Login:", error);

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
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit} className="my-3">
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
        <div className="d-grid col-4 mx-auto my-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
export default Login;
