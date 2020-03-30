import React from "react";
import "./Navbar.css";

export const Navbar = ({ user }) => {
  const handleLogout = () => {
    window.location.replace("/");
  };
  return (
    <nav className="border fixed split-nav">
      <div className="nav-brand">
        <h3>Chat App</h3>
      </div>
      {user.username && (
        <>
          <div className="navbar__username">
            {user.username},{" "}
            <span className="logout" onClick={handleLogout}>
              {" "}
              Logout
            </span>
          </div>
        </>
      )}
    </nav>
  );
};
