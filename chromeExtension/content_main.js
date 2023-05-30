import {
  createChannelItem,
  createLargeText,
  createMediumText,
  createVideoItem,
  createXLargeText,
} from "./modules/createElement.js";
import { fetchRecommendAPI } from "./modules/backendAPI.js";
import { getTopVideos } from "./modules/getTopVideos.js";

var user;
var headerElement;
var recommendData;
var isMobile = false;

const setContent = () => {

  <div><a></a></div>
  var title;
  var container = document.createElement("div");
  container.id = "neartube-container";
  container.style.flexDirection = "column";

  var titleElement = document.createElement("p");
  titleElement.id = "neartube-logo-title";

  titleElement.innerHTML = "NearTube";

  var locationElement = document.createElement("div");
  locationElement.classList.add("neartube-content-container");
  title = createXLargeText("Location");
  locationElement.appendChild(title);

  var videoElement = document.createElement("div");
  videoElement.classList.add("neartube-content-container");
  title = createXLargeText("Video");
  videoElement.appendChild(title);

  var channelElement = document.createElement("div");
  channelElement.classList.add("neartube-content-container");
  title = createXLargeText("Channel");
  channelElement.appendChild(title);

  setContentInfo(locationElement, videoElement, channelElement);
  container.appendChild(titleElement);
  container.appendChild(locationElement);
  container.appendChild(videoElement);
  container.appendChild(channelElement);

  if (!isMobile) {
    headerElement.parentElement.insertBefore(container, headerElement);
  } else {
    console.log("is Mobile!");
    var headerBox = document.querySelector("#filter-chip-bar > div");
    console.log(headerBox.offsetHeight + "px");
    container.style.marginTop = headerBox.offsetHeight + "px";
    headerElement.insertBefore(container, headerElement.firstChild);

    console.log(container);
  }
};

const setContentInfo = (locationElement, videoElement, channelElement) => {
  if (recommendData.locations != undefined) {
    var contentBox = document.createElement("div");
    contentBox.classList.add("neartube-content-box");

    recommendData.locations.forEach((location) => {
      contentBox.appendChild(createLargeText(location.name));
    });

    locationElement.appendChild(contentBox);
  }

  if (recommendData.videos != undefined) {
    var contentBox = document.createElement("div");
    contentBox.classList.add("neartube-content-box");

    recommendData.videos.forEach((video) => {
      contentBox.appendChild(createVideoItem(video));
    });

    videoElement.appendChild(contentBox);
  }

  if (recommendData.channels != undefined) {
    var contentBox = document.createElement("div");
    contentBox.classList.add("neartube-content-box");

    recommendData.channels.forEach((channel) => {
      contentBox.appendChild(createChannelItem(channel));
    });

    channelElement.appendChild(contentBox);
  }
};

const init = async () => {
  //set header element
  headerElement = document.querySelector('[id*="primary"] #header');
  if (headerElement == undefined) {
    headerElement = document.querySelector("#app");
    isMobile = true;
  }

  //set content
  if (headerElement == undefined) {
    console.log("header element is undefined!!!");
  } else {
    await chrome.storage.local.get(["user"], async (result) => {
      user = result.user;
      recommendData = await fetchRecommendAPI(user.id);
      await setContent(headerElement);
    });
  }
};

export function main() {
  getTopVideos();
  init();
}
