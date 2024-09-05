import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const Profile = () => {
  const { user } = useContext(AppContext);

  // Log user data for debugging
  console.log("User data:", user);

  return (
    <>
      <div className="profile" style={{ marginTop: '100px', color: 'white',textAlign:'center' }}>
        {/* Conditionally render the welcome message */}
        {user && <h1>Wel-Come {user.name}</h1>}
        {user && <h4>Email: {user.email}</h4>}
      </div>
    </>
  );
};

export default Profile;
