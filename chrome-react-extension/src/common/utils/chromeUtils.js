import { resolve } from "path";
import { getMemberAPI } from "./backendUtils.js";

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
    console.log(`현위치 정보: ${latitude} ${longitude}`);
    return { latitude: latitude, longitude: longitude };
  } else {
    alert("위치 정보를 허용해주세요.");
    return { latitude: undefined, longitude: undefined };
  }
};

// OAuth 로그인 - Google API 사용
export const getTokenWithId = async () => {
  return new Promise((resolve, reject) => {
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
        const family_name =
          data.family_name == undefined ? "" : data.family_name;
        const userInfo = {
          id: data.id,
          email: data.email,
          name: family_name + data.given_name,
          picture: data.picture,
        };

        resolve({
          userData: userInfo,
          token: token,
          isNew: (await getMemberAPI(userInfo.id)) == null,
        });
      }
    );
  });
};
