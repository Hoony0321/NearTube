const getVideoInfoByAPI = async (videoId) => {
  console.log("getVideoInfoByAPI 실행");
  // Make the API request to retrieve video information
  const apiKey = "AIzaSyBBOiLRjYI1zBufrBflw5XLlYaPF2ukdaw"
  const baseUrl = "https://www.googleapis.com/youtube/v3/videos";
  const apiUrl = `${baseUrl}?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log("data : ", data);

  return data;
}

const fetchCreateVideoAPI = async (videoInfo) => {
  const host = "http://localhost:8080/api";

  const response = await fetch(`${host}/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoInfo),
  });

  console.log("server response : ", response);
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "get_top_videos") {
    const topVideoIds = request.topVideoIds;
    console.log("video ids :", topVideoIds);
    sendResponse({message : "receiving top video ids"});

    topVideoIds.forEach(async (videoId) => {
      const data = (await getVideoInfoByAPI(videoId)).items[0];

      if(data == undefined) return;

      const contentDetail = data.contentDetails;
      const snippet = data.snippet;
      const statistics = data.statistics;

      const videoInfo = {
        id : videoId,
        kind: data.kind,
        categoryId: snippet.categoryId,

        title: snippet.title,
        description: snippet.description,
        thumbnail : snippet.thumbnails.default.url,

        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,

        tags: (snippet.tags).join(","),
        duration: contentDetail.duration,
        viewCount: statistics.viewCount,
        likeCount: statistics.likeCount,
        publishedAt: snippet.publishedAt,
      }

      console.log(`${videoId} : ${JSON.stringify(videoInfo)}`);

      await fetchCreateVideoAPI(videoInfo);
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'loggedin') {
    console.log("logged in");
    // Do something when the user is logged in
    // ...
  }
});
