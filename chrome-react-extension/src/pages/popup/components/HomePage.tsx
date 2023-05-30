import React from "react";
import logo2 from "@assets/img/logo2.svg";
import { FC } from "react";

const HomePage: FC<{ user; clickLogoutBtn }> = ({ user, clickLogoutBtn }) => {
  return (
    <div className="container">
      <img src={logo2} alt="logo" className="logo" />
      <div style={{ textAlign: "center" }}>
        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-email">
            <b>email</b> : {user.email}
          </div>
          <div className="user-location">
            <b>location</b> : {user.location}
          </div>
          <div className="user-major">
            <b>major</b> : {user.major}
          </div>
          <div className="user-grade">
            <b>interests</b> : {user.interests}
          </div>
        </div>
        <button className="logout-btn" onClick={clickLogoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
