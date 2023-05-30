import React, { useState } from "react";
import SignUp from "./components/SignUpPage.js";
import "@pages/popup/Popup.css";
import { IUser } from "../../common/interfaces.js";
import LoginPage from "./components/LoginPage.js";
import HomePage from "./components/HomePage.js";

const Popup = () => {
  const [user, setUser] = useState<IUser>(undefined);
  const [showSignUpPage, setShowSignUpPage] = useState<boolean>(false);

  const clickLogoutBtn = () => {
    setUser(undefined);
    chrome.storage.local.set({
      user: undefined,
    });
  };

  return (
    <div className="container">
      {user == undefined ? (
        <LoginPage user={user} setUser={setUser} />
      ) : (
        <HomePage clickLogoutBtn={clickLogoutBtn} user={user} />
      )}
      {showSignUpPage && <SignUp />}
    </div>
  );
};

export default Popup;
