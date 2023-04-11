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

function mobileGetTopVideos() {
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
  
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'get_top_videos') {
    const topVideos = getTopVideos();
    sendResponse(topVideos);
  }
  if (request.message === 'mobile_get_top_videos') {
    const topVideos = mobileGetTopVideos();
    sendResponse(topVideos);
  }
});
  

  