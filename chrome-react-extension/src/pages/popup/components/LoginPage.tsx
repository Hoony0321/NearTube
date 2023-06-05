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
  createMemberAPI,
} from "../../../common/utils/backendUtils.js";
import { IUser } from "@src/common/interfaces.js";

const LoginPage: FC<{ setUser }> = ({ setUser }) => {
  const [showSignUpPage, setShowSignUpPage] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [userData, setUserData] = useState(undefined);

  const clickLoginBtn = async () => {
    await getTokenWithId()
      .then(async ({ userData, token, isNew }) => {
        setUserData(userData);
        if (isNew) {
          setShowSignUpPage(true);
          return;
        }

        //유저 정보 서버에서 가져오기
        const userInfo = await getMemberAPI(userData.id);
        console.log(userInfo);

        //구독 목록 정보 가져와서 저장
        const subscriptions = await getYoutubeSubscriptionsAPI(
          token,
          userData.id
        );
        if (subscriptions != undefined && subscriptions.length > 0) {
          await createSubscriptionAPI(userData.id, subscriptions);
        }

        //위치 정보 가져와서 저장
        const { latitude, longitude } = await getCurrentLocation();
        const location = await countMemberLocationAPI(
          userData.id,
          latitude,
          longitude
        );

        // set user
        const user: IUser = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          location:
            location.locationName == "NONE"
              ? "위치 정보 없음"
              : location.locationName,
          job: userInfo.job,
          interests: userInfo.interests,
        };
        await setUser(() => ({
          ...user,
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
    console.log("clickSubmitBtn");
    const userInfo = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      gender: gender == "남자" ? true : false,
      job: job,
      interests: interests,
    };

    console.log("userInfo : ", userInfo);
    await createMemberAPI(userInfo);

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
              placeholder="interests"
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
