import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ShowProduct from "./components/product/ShowProduct";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Address from "./components/Address";


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/product/search/:term" element={<SearchProduct />} />
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/address" element={<Address/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
