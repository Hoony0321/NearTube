import { fetchCreateMemberVideoAPI } from "./backendUtils.js";

const API_KEY = "AIzaSyBBOiLRjYI1zBufrBflw5XLlYaPF2ukdaw";

// 유튜브 비디오 정보 수집 - Youtube API 사용
export const getVideoInfoByAPI = async (videoId) => {
  // Make the API request to retrieve video information
  const baseUrl = "https://www.googleapis.com/youtube/v3/videos";
  const apiUrl = `${baseUrl}?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  return data;
};

export const getYoutubeSubscriptionsAPI = async (token, userId) => {
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

  return subscriptions;
};

function fetchTopVideos() {
  const videos = document.querySelectorAll("#contents ytd-rich-item-renderer");
  const videoArray = Array.from(videos);
  const topVideoIds = [];

  for (let i = 0; i < (videoArray.length < 10 ? videoArray.length : 10); i++) {
    if (!videoArray[i].classList.contains("ytd-rich-grid-row")) continue;
    const titleElement = videoArray[i].querySelector("#video-title-link");
    if (titleElement == undefined || titleElement == null) continue;
    const videoUrl = titleElement.href;
    topVideoIds.push(videoUrl.split("v=")[1]);
  }

  return topVideoIds;
}

function fetchMobileTopVideos() {
  const videos = document.querySelectorAll("ytm-rich-item-renderer");
  const videoArray = Array.from(videos);
  const topVideoIds = [];

  for (let i = 0; i < (videoArray.length < 10 ? videoArray.length : 10); i++) {
    const linkElement = videoArray[i].querySelector(".media-item-metadata > a");
    if (linkElement == undefined || linkElement == null) continue;
    const videoUrl = linkElement.href;
    topVideoIds.push(videoUrl.split("v=")[1]);
  }

  return topVideoIds;
}

export const getTopVideos = () => {
  console.log("상단 노출 비디오 정보 수집");
  window.onload = function () {
    const currentUrl = window.location.href;
    let topVideoIds;

    // get top video ids
    if (currentUrl.includes("m.youtube.com")) {
      topVideoIds = fetchMobileTopVideos();
    } else if (currentUrl.includes("youtube.com")) {
      topVideoIds = fetchTopVideos();
    }

    // get video info
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

      const storageData = await chrome.storage.local.get(["user"]);
      if (storageData != undefined && storageData.user != undefined) {
        const userInfo = storageData.user;
        //create member video api
        if (userInfo != undefined && userInfo.id != undefined) {
          await fetchCreateMemberVideoAPI(userInfo.id, videoInfo);
        }
      }
    });
  };
};
