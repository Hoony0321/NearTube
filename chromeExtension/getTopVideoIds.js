function getTopVideos() {
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

function getMobileTopVideos() {
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

const main = () => {
  window.onload = function () {
    console.log("get_top_videos 실행");
    const currentUrl = window.location.href;
    let topVideoIds;

    // get top video ids
    if (currentUrl.includes("m.youtube.com")) {
      topVideoIds = getMobileTopVideos();
    } else if (currentUrl.includes("youtube.com")) {
      topVideoIds = getTopVideos();
    }

    console.log("topVideoIds : ", topVideoIds);

    chrome.runtime.sendMessage(
      { message: "get_top_videos", topVideoIds: topVideoIds },
      function (response) {}
    );
  };
};

main();
