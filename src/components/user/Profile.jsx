import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setAuth } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    alert("confirm logout user");
    navigate("/login");
  };

  return (
    <>
      <div
        className="profile"
        style={{ marginTop: "100px", color: "white", textAlign: "center" }}
      >
        {/* Conditionally render the welcome message */}
        {user && (
          <img
            src={`http://localhost:5000/${user.image}`}
            alt="Product"
            style={{
              width: "250px",
              height: "290px",
              objectFit: "cover",
              border: "2px solid yellow",
              borderRadius:'10px'
            }}
          />
        )}
        {user && <h1> {user.name}</h1>}
        {user && <h4>{user.email}</h4>}
        <br></br>
        <button onClick={logout} className="btn bg-dark" style={{border:'2px solid yellow',color:'white',fontWeight:'bold'}}>Logout</button>
      </div>
    </>
  );
};

export default Profile;
