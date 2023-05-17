const API_KEY = "AIzaSyBBOiLRjYI1zBufrBflw5XLlYaPF2ukdaw";

const getVideoInfoByAPI = async (videoId) => {
  console.log("getVideoInfoByAPI 실행");
  // Make the API request to retrieve video information
  const baseUrl = "https://www.googleapis.com/youtube/v3/videos";
  const apiUrl = `${baseUrl}?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log("data : ", data);

  return data;
};

const fetchCreateMemberVideoAPI = async (memberId, videoInfo) => {
  console.log("****** execute create member video api******");
  const host = "http://localhost:8080/api";
  const response = await fetch(`${host}/members/${memberId}/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoInfo),
  });

  console.log("server response : ", response);
};

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "get_top_videos") {
    const topVideoIds = request.topVideoIds;
    console.log("video ids :", topVideoIds);
    sendResponse({ message: "receiving top video ids" });

    topVideoIds.forEach(async (videoId) => {
      const data = (await getVideoInfoByAPI(videoId)).items[0];

      if (data == undefined) return;

      const contentDetail = data.contentDetails;
      const snippet = data.snippet;
      const statistics = data.statistics;

      const videoInfo = {
        id: videoId,
        kind: data.kind,
        categoryId: snippet.categoryId,

        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.default.url,

        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,

        tags: snippet.tags == undefined ? "" : snippet.tags.join(","),
        duration: contentDetail.duration,
        viewCount: statistics.viewCount,
        likeCount: statistics.likeCount,
        publishedAt: snippet.publishedAt,
      };

      console.log(`${videoId} : ${JSON.stringify(videoInfo)}`);

      const storageData = await chrome.storage.local.get(["user"]);
      if (storageData != undefined && storageData.user != undefined) {
        const userInfo = storageData.user;
        //create member video api
        if (userInfo != undefined && userInfo.id != undefined) {
          await fetchCreateMemberVideoAPI(userInfo.id, videoInfo);
        }
      }
    });
  }
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "loggedin") {
    console.log("userInfo : ", request.userInfo);
    console.log("logged in");
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "loggedOut") {
    console.log("logged out");
    // Do something when the user is logged in
    // ...
  }
});
