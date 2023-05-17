const API_KEY = "AIzaSyBBOiLRjYI1zBufrBflw5XLlYaPF2ukdaw";

const getCurrentLocation = async () => {
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

const countMemberLocationAPI = async (id, latitude, longitude) => {
  const data = {
    latitude: latitude,
    longitude: longitude,
  };

  const response = await fetch(
    `http://localhost:8080/api/members/${id}/locations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status == 200) {
    const data = await response.json();
    console.log("data : ", data);
    return data;
  } else {
    console.log("count member location fail");
  }
};

const getMemberAPI = async (id) => {
  const response = await fetch(`http://localhost:8080/api/members/${id}`, {
    method: "GET",
  });

  if (response.status != 200) {
    return null;
  } else {
    const data = await response.json();
    return data;
  }
};

const createMemberAPI = async (memberInfo) => {
  const response = await fetch(`http://localhost:8080/api/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberInfo),
  });

  if (response.status != 200) {
    return null;
  } else {
    const data = await response.json();
    return data;
  }
};

const getYoutubeActiviesAPI = async (token) => {
  console.log("****** execute get youtube activities api ******");

  // Use the token to make requests to Google APIs
  var apiUrl = `https://www.googleapis.com/youtube/v3/activities?mine=true&part=snippet&part=contentDetails&maxResults=128&key=${API_KEY}`;
  var headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });

  if (response.status != 200) return undefined;
  else {
    const data = await response.json();
    console.log("data : ", data);
    return data;
  }
};

const getYoutubeSubscriptionsAPI = async (token, userId) => {
  console.log("****** execute get youtube subscriptions api ******");

  const maxResults = 50; //최대 50개만 가능
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Use the token to make requests to Google APIs
  var apiUrl = `https://www.googleapis.com/youtube/v3/subscriptions?mine=true&part=snippet&maxResults=${maxResults}&key=${API_KEY}`;
  var headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });

  if (response.status != 200) return undefined;

  const data = await response.json();
  const subscriptions = [];

  data.items.forEach((item) => {
    let channelId = item.snippet.resourceId.channelId;
    let publishedAt = item.snippet.publishedAt;
    subscriptions.push({
      channelId: channelId,
      publishedAt: publishedAt,
    });
  });

  console.log("subscriptions : ", subscriptions);
  return subscriptions;
};

const createSubscriptionAPI = async (id, subscriptions) => {
  const response = await fetch(
    `http://localhost:8080/api/members/${id}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptions),
    }
  );

  if (response.status != 200) {
    console.log("error : ", response);
  } else {
    console.log("create subscription success : ", response);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["user"], (result) => {
    const user = result.user;

    if (user.status == "loggedin") {
      document.getElementById("loggedInBox").style.display = "block";
      document.getElementById("loggedOutBox").style.display = "none";
      document.getElementById("email").innerHTML = user.email;

      if (
        user.latitude != undefined ||
        user.longitude != undefined ||
        user.location != undefined
      ) {
        document.getElementById("latitude").innerHTML =
          "latitude : " + user.latitude;
        document.getElementById("longitude").innerHTML =
          "longitude: " + user.longitude;
        document.getElementById("location").innerHTML =
          "location : " + user.location;
      }
    } else {
      document.getElementById("loggedInBox").style.display = "none";
      document.getElementById("loggedOutBox").style.display = "block";
    }
  });
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  console.log("loginBtn clicked");
  const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/youtube",
  ];
  await chrome.identity.getAuthToken(
    { interactive: true, scopes: SCOPES },
    async (token) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        return;
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

      console.log("userInfo : ", userInfo);

      const result = await getMemberAPI(userInfo.id); //회원가입 여부 확인
      if (result == null) {
        createMemberAPI(userInfo);
      } //첫 로그인 시 회원가입

      //구독 목록 가져와서 저장
      const subscriptions = await getYoutubeSubscriptionsAPI(
        token,
        userInfo.id
      );

      if (subscriptions != undefined && subscriptions.length > 0) {
        await createSubscriptionAPI(userInfo.id, subscriptions);
      }

      const { latitude, longitude } = await getCurrentLocation();
      const location = await countMemberLocationAPI(
        userInfo.id,
        latitude,
        longitude
      );

      // Save the state of the pop-up window to chrome.storage
      chrome.storage.local.set({
        user: {
          status: "loggedin",
          id: userInfo.id,
          email: userInfo.email,
          location: location != undefined ? location.locationName : "ERROR",
          latitude: latitude,
          longitude: longitude,
        },
      });

      await chrome.runtime.sendMessage({
        type: "loggedin",
        userInfo: userInfo,
      });

      //   window.location.reload(); - for test
    }
  );
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  console.log("logoutBtn clicked");
  await chrome.storage.local.set({
    user: {
      status: "loggedout",
    },
  });

  await chrome.runtime.sendMessage({ type: "loggedOut" });
  window.location.reload();
});
