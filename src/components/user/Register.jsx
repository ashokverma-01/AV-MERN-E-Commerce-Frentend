import React, { useContext, useState } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { useNavigate } from 'react-router-dom';
import { ShowToast } from '../../helper/toast'; // Import the ShowToast function

function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null, // Image field in state
  });

  const onchangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      // For image input, set the file
      setFormData({ ...formData, image: files[0] });
    } else {
      // For text inputs, set the value
      setFormData({ ...formData, [name]: value });
    }
  };

  const { name, email, password, image } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);
      formDataToSend.append('password', password);
      if (image) {
        formDataToSend.append("image", image); // Directly append the file object
      }

      const api = await axios.post(
        "http://localhost:5000/api/user/register",
        formDataToSend, // Pass FormData as the body
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensures multipart for file upload
          },
        }
      );

      // Show success message
      ShowToast(api.data.message, "success");

      // Clear form data
      setFormData({
        name: "",
        email: "",
        password: "",
        image: null, // Reset image field
      });

      navigate("/login"); // Redirect to login or some other page after success
    } catch (error) {
      // Show error message
      ShowToast("Registration error", "error");
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
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
          <div className="mb-3">
            <label htmlFor="imageInput" className="form-label">
              Profile Image
            </label>
            <input
              onChange={onchangeHandler}
              name="image"
              type="file"
              className="form-control"
              id="imageInput"
              accept="image/*"
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
