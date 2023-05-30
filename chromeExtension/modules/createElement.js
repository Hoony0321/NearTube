export const createXLargeText = (text) => {
  const element = document.createElement("p");
  element.classList.add("neartube-xlarge-text");
  element.innerHTML = text;
  return element;
};

export const createLargeText = (text) => {
  const element = document.createElement("p");
  element.classList.add("neartube-large-text");
  element.innerHTML = text;
  return element;
};

export const createMediumText = (text) => {
  const element = document.createElement("p");
  element.classList.add("neartube-medium-text");
  element.innerHTML = text;
  return element;
};

export const createSmallText = (text) => {
  const element = document.createElement("p");
  element.classList.add("neartube-small-text");
  element.innerHTML = text;
  return element;
};

export const createVideoItem = (videoInfo) => {
  const element = document.createElement("div");
  element.classList.add("neartube-video-item");
  element.addEventListener("click", function () {
    window.location.href = `https://www.youtube.com/watch?v=${videoInfo.id}`;
  });

  const imgElement = document.createElement("img");
  var imgSrc = videoInfo.thumbnail.replace("/default.jpg", "/hq720.jpg");
  imgElement.src = imgSrc;
  imgElement.style.width = "100%";
  element.appendChild(imgElement);

  const titleElement = createLargeText(videoInfo.title);
  titleElement.style.width = "100%";
  element.appendChild(titleElement);

  return element;
};

export const createChannelItem = (channelInfo) => {
  const element = document.createElement("div");
  element.classList.add("neartube-channel-item");
  element.addEventListener("click", function () {
    window.location.href = `https://www.youtube.com/channel/${channelInfo.id}`;
  });

  const titleElement = createLargeText(channelInfo.title);
  titleElement.style.width = "100%";
  element.appendChild(titleElement);

  const discriptionElement = createMediumText(channelInfo.description);
  discriptionElement.style.width = "100%";
  element.appendChild(discriptionElement);

  const categoriesElement = createMediumText(channelInfo.categories);
  categoriesElement.style.width = "100%";
  element.appendChild(categoriesElement);

  return element;
};
