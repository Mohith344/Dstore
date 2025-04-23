import React from "react";
import "./header.css"; // Import the CSS file for styling

const Header = ({ account }) => {
  return (
    <div className="header-container">
      <h1>Dstore</h1>
      {/* Logo on the left */}
      <div className="logo">
        <img src="/images.png" alt="Dstore Logo" className="logo-image" />
        {/* Account Details on hover */}
        <div className="account-details">
          {account ?` Connected Account: ${account} `: "Please connect your wallet"}
        </div>
      </div>
    </div>
  );
};

export default Header;