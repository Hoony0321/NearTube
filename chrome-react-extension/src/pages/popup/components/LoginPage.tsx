import React, { FC, useState } from "react";
import logo2 from "@assets/img/logo2.svg";
import {
  getTokenWithId,
  getCurrentLocation,
} from "../../../common/utils/chromeUtils.js";
import { getYoutubeSubscriptionsAPI } from "../../../common/utils/youtubeUtils.js";
import {
  getMemberAPI,
  createSubscriptionAPI,
  countMemberLocationAPI,
} from "../../../common/utils/backendUtils.js";

const LoginPage: FC<{ user; setUser }> = ({ user, setUser }) => {
  const [showSignUpPage, setShowSignUpPage] = useState<boolean>(false);
  const [major, setMajor] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [job, setJob] = useState<string>("");

  const clickLoginBtn = async () => {
    await getTokenWithId()
      .then(async ({ id, token, isNew }) => {
        if (isNew) {
          setShowSignUpPage(true);
          return;
        }

        //유저 정보 서버에서 가져오기
        const userInfo = await getMemberAPI(id);
        console.log(userInfo);

        //구독 목록 정보 가져와서 저장
        const subscriptions = await getYoutubeSubscriptionsAPI(token, id);
        if (subscriptions != undefined && subscriptions.length > 0) {
          await createSubscriptionAPI(id, subscriptions);
        }

        //위치 정보 가져와서 저장
        const { latitude, longitude } = await getCurrentLocation();
        const location = await countMemberLocationAPI(id, latitude, longitude);

        // set user
        await setUser((prev) => ({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          location:
            location.locationName == "NONE"
              ? "위치 정보 없음"
              : location.locationName,
          major: userInfo.major,
          interests: userInfo.interests,
        }));

        // set user to chrome storage
        await chrome.storage.local.set({
          user: user,
        });
      })
      .catch((err) => {
        alert(`로그인 실패 : ${err}`);
      });
  };

  const clickSubmitBtn = async () => {
    setShowSignUpPage(false);
  };

  const clickCancelBtn = async () => {
    setShowSignUpPage(false);
  };

  return (
    <div className="container">
      {showSignUpPage ? (
        <>
          <p className="logo-title">Sign Up</p>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Major"
              onChange={(e) => {
                () => {
                  setMajor(e.target.value);
                };
              }}
            />
            <input
              className="input"
              type="text"
              placeholder="Gender"
              onChange={(e) => {
                () => {
                  setGender(e.target.value);
                };
              }}
            />
            <input
              className="input"
              type="text"
              placeholder="Job"
              onChange={(e) => {
                () => {
                  setJob(e.target.value);
                };
              }}
            />
            <input
              className="input"
              type="text"
              placeholder="Interests"
              onChange={(e) => {
                () => {
                  setInterests(e.target.value);
                };
              }}
            />

            <div className="btn-container">
              <button className="btn" onClick={clickCancelBtn}>
                Cancel
              </button>
              <button
                className="btn"
                style={{ backgroundColor: "blue" }}
                onClick={clickSubmitBtn}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={logo2} alt="logo" className="logo" />
          <button className="btn" onClick={clickLoginBtn}>
            Login with google
          </button>
        </>
      )}
    </div>
  );
};

export default LoginPage;
