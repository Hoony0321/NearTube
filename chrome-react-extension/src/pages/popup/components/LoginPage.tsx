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
import { locations } from "../locations.type.js";

const LoginPage: FC<{ setUser }> = ({ setUser }) => {
  const [showSignUpPage, setShowSignUpPage] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [location1, setLocation1] = useState<string>("");
  const [location2, setLocation2] = useState<string>("");
  const [location3, setLocation3] = useState<string>("");
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
    const { latitude, longitude } = await getCurrentLocation();
    if (latitude == undefined || longitude == undefined) return;

    const userInfo = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      gender: gender == "남자" ? true : false,
      job: job,
      interests: interests,
      locations: [location1, location2, location3],
    };

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
            <div className="input-container">
              <label style={{ fontSize: "1rem", fontWeight: 600 }}>전공</label>
              <input
                className="input"
                type="text"
                placeholder="Major"
                value={job}
                onChange={(e) => {
                  setJob(e.target.value);
                }}
              />
            </div>

            <div className="input-container">
              <label style={{ fontSize: "1rem", fontWeight: 600 }}>
                관심사
              </label>
              <input
                className="input"
                type="text"
                placeholder="interests"
                value={interests}
                onChange={(e) => {
                  setInterests(e.target.value);
                }}
              ></input>
            </div>

            <div className="input-container">
              <label style={{ fontSize: "1rem", fontWeight: 600 }}>성별</label>
              <select
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="NONE">성별을 선택해주세요.</option>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
              </select>
            </div>

            <div className="input-container">
              <label style={{ fontSize: "1rem", fontWeight: 600 }}>장소1</label>
              <select
                className="input"
                value={location1}
                onChange={(e) => setLocation1(e.target.value)}
              >
                <option value="NONE">자주 이용하는 장소를 선택해주세요</option>
                {locations.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container">
              <label style={{ fontSize: "1rem", fontWeight: 600 }}>장소2</label>
              <select
                className="input"
                value={location2}
                onChange={(e) => setLocation2(e.target.value)}
              >
                <option value="NONE">자주 이용하는 장소를 선택해주세요</option>
                {locations.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container">
              <label style={{ fontSize: "1rem", fontWeight: 600 }}>장소3</label>
              <select
                className="input"
                value={location3}
                onChange={(e) => setLocation3(e.target.value)}
              >
                <option value="NONE">자주 이용하는 장소를 선택해주세요</option>
                {locations.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

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
