import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Severty, ShowToast } from "../helper/toast";

function AppState(props) {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [auth, setAuth] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAddress ,setUserAddress] = useState("")
  


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(
          "http://localhost:5000/api/product/get-product",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(api.data.products);
        setProducts(api.data.products);
        setFilterData(api.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
    userProfileData();
    userCart();
    getAddress();
  }, [token, loading]);

  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setAuth(true);
    }
  }, []);

 
  // User login function
  const login = async ({ email, password }) => {
    try {
      const api = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      ShowToast(api.data.message, Severty.SUCCESS);
      setToken(api.data.token);
      setAuth(true);
      localStorage.setItem("token", api.data.token); // Fixed typo
      return api.data;
    } catch (error) {
      ShowToast("login error", Severty.ERROR);
      return null;
    }
  };

  //user profile
  const userProfileData = async () => {
    try {
      const api = await axios.get("http://localhost:5000/api/user/profile", {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
      });
      // console.log(api.data.user);
      setUser(api.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  //cart
  const addToCart = async (productId, title, price, qty, image) => {
    try {
      const payload = {
        productId: productId,
        title: title,
        price: Number(price),
        qty: Number(qty),
        image: image,
      };
      const api = await axios.post(
        "http://localhost:5000/api/cart/add",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
        }
      );
      ShowToast(api.data.message, Severty.SUCCESS);
      // console.log(api.data);
      setLoading(!loading);
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  //user cart
  const userCart = async () => {
    try {
      const api = await axios.get("http://localhost:5000/api/cart/get", {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
      });
      // console.log(api.data.cartItems.items);
      setCart(api.data.cartItems.items);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  //remove qty
  const decreaseQty = async (productId, qty) => {
    try {
      const api = await axios.post(
        "http://localhost:5000/api/cart/qty",
        { productId, qty },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
        }
      );
      ShowToast(api.data.message, Severty.SUCCESS);
      setLoading(!loading);
    } catch (error) {
      console.error("Decrease Qty:", error);
    }
  };

  //remove product form  cart
  const removeCart = async (productId) => {
    try {
      const api = await axios.delete(
        `http://localhost:5000/api/cart/remove/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
        }
      );
      ShowToast(api.data.message, Severty.SUCCESS);
      setLoading(!loading);
    } catch (error) {
      console.error("Decrease Qty:", error);
    }
  };

  //remove product form  cart
  const cartClear = async () => {
    try {
      const api = await axios.delete(
        'http://localhost:5000/api/cart/clear/',
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
        }
      );
      ShowToast(api.data.message, Severty.SUCCESS);
      setLoading(!loading);
    } catch (error) {
      console.error("Decrease Qty:", error);
    }
  };

    //user add Address
    const addAddress = async (fullName, address, city, state, country, phone, pinCode) => {
      try {
        const api = await axios.post(
          `http://localhost:5000/api/address/add`,{fullName, address, city, state, country, phone, pinCode},
          {
            headers: {
              "Content-Type": "application/json",
              Auth: token, 
            },
          }
        );
        // console.log(api);
        
        setLoading(!loading)
        ShowToast(api.data.message, Severty.SUCCESS);
        return api.data
      } catch (error) {
        console.error("Error adding address:", error);
      }
    };
    
    //user get address
    const getAddress = async () => {
      try {
        const api = await axios.get(
          "http://localhost:5000/api/address/get",
          {
            headers: {
              "Content-Type": "application/json",
              Auth:token
            },
            
          }
        );
        // console.log(api.data);
        setUserAddress(api.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };


  //delete product form  table
  const deleteProduct = async (productId) => {
    try {
      const api = await axios.delete(
        `http://localhost:5000/api/product/delete-product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
        }
      );
      ShowToast(api.data.message, Severty.SUCCESS);
      setLoading(!loading);
    } catch (error) {
      console.error("Decrease Qty:", error);
    }
  };
  
  return (
    <AppContext.Provider
      value={{
        products,
        login,
        token,
        auth,
        user,
        setAuth,
        filterData,
        setFilterData,
        userProfileData,
        addToCart,
        cart,
        decreaseQty,
        removeCart,
        cartClear,
        addAddress,
        userAddress,
        deleteProduct,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
