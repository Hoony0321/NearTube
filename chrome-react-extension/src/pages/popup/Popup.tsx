import React, { useEffect, useState, FC } from "react";
import SignUp from "./components/SignUpPage.js";
import "@pages/popup/Popup.css";
import { IUser } from "../../common/interfaces.js";
import LoginPage from "./components/LoginPage.js";
import HomePage from "./components/HomePage.js";

const Popup: FC<{ propsUser: IUser }> = ({ propsUser }) => {
  const [user, setUser] = useState<IUser>(undefined);

  useEffect(() => {
    console.log("popup init");
    console.log("propsUser : ", propsUser);
    if (propsUser != null && propsUser != undefined) {
      setUser(propsUser);
    }
  }, []);

  const clickLogoutBtn = async () => {
    console.log("logout");
    setUser(undefined);
    await chrome.storage.local.set({
      user: null,
    });
  };

  return (
    <div className="container">
      {user == undefined ? (
        <LoginPage setUser={setUser} />
      ) : (
        <HomePage clickLogoutBtn={clickLogoutBtn} user={user} />
      )}
    </div>
  );
};

export default Popup;
