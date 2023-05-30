import { resolve } from "path";
import { getMemberAPI, createMemberAPI } from "./backendUtils.js";

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/youtube",
];

export const getCurrentLocation = async () => {
  const permissions = await navigator.permissions.query({
    name: "geolocation",
  });

  if (permissions.state == "granted") {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("latitude : ", latitude);
    console.log("longitude : ", longitude);
    return { latitude: latitude, longitude: longitude };
  } else {
    alert("위치 정보를 허용해주세요.");
    return { latitude: undefined, longitude: undefined };
  }
};

export const getTokenWithId = async () => {
  return new Promise((resolve, reject) => {
    console.log("loginAPI 실행");
    chrome.identity.getAuthToken(
      { interactive: true, scopes: SCOPES },
      async (token) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        }

        // Get the user's email address
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        const userInfo = {
          id: data.id,
          email: data.email,
          name: data.family_name + data.given_name,
          picture: data.picture,
        };

        resolve({
          id: userInfo.id,
          token: token,
          isNew: (await getMemberAPI(userInfo.id)) == null,
        });
      }
    );
  });
};
