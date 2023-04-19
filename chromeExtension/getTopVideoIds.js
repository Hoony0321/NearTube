function getTopVideos() {
  const videos = document.querySelectorAll('#contents ytd-rich-item-renderer');
  const videoArray = Array.from(videos);
  const topVideoIds = [];

  for(let i = 0; i < videoArray.length; i++) {
      if(!videoArray[i].classList.contains("ytd-rich-item-renderer")) continue;
      const titleElement = videoArray[i].querySelector("#video-title-link");
      const videoUrl = titleElement.href;
      topVideoIds.push(videoUrl.split('v=')[1]);
  }

  return topVideoIds;
}

function getMobileTopVideos() {
  const videos = document.querySelector('.rich-grid-renderer-contents').children;
  const videoArray = Array.from(videos);
  const topVideoIds = [];

  for(let i = 0; i < videoArray.length; i++) {
      if(!(videoArray[i].tagName === "YTM-RICH-ITEM-RENDERER")) continue;
      const linkElement = videoArray[i].querySelector(".media-item-metadata > a");
      const videoUrl = linkElement.href;
      topVideoIds.push(videoUrl.split('v=')[1]);
  }

  return topVideoIds;
}

const main = () => {
  console.log("get_top_videos 실행");
  const currentUrl = window.location.href;
  let topVideoIds;

  // get top video ids
  if(currentUrl.includes("m.youtube.com")) {
    topVideoIds = getMobileTopVideos();
  }
  else if(currentUrl.includes("youtube.com")) {
    topVideoIds = getTopVideos();
  }

  console.log("topVideoIds : ", topVideoIds);

  chrome.runtime.sendMessage({message: 'get_top_videos', topVideoIds: topVideoIds}, function(response){});
}

main();
  

  