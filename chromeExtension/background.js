import { fetchCreateMemberVideoAPI } from "./modules/backendAPI.js";
import { getVideoInfoByAPI } from "./modules/youtubeAPI.js";

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "get_videos_info") {
    const topVideoIds = request.topVideoIds;
    sendResponse({ message: "receiving top video ids2" });

    topVideoIds.forEach(async (videoId) => {
      videoInfo = await getVideoInfoByAPI(topVideoIds[0]);
      console.log(`${videoId} : ${videoInfo}`);
    });
  }
});
