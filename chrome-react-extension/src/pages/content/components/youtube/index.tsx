import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/youtube/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { getTopVideos } from "@src/common/utils/youtubeUtils";

refreshOnUpdate("pages/content");

getTopVideos();

if (window.location.hostname === "www.youtube.com") {
  //데스크탑인 경우
  const headerElement = document.querySelector('[id*="primary"] #header');

  const contentView = document.createElement("div");
  contentView.id = "neartube-content-view";
  headerElement.parentElement.insertBefore(contentView, headerElement);

  createRoot(contentView).render(<App />);
} else if (window.location.hostname === "m.youtube.com") {
  //모바일인 경우
  const appElement = document.querySelector("#app") as HTMLElement;
  appElement.style.paddingTop = "0";
  const headerElement = document.querySelector("#header-bar");
  const headerHeight = headerElement.clientHeight;

  const contentView = document.createElement("div");
  contentView.style.paddingTop = `${2 * headerHeight}px`;
  contentView.id = "neartube-content-view";
  appElement.parentElement.insertBefore(contentView, appElement);

  createRoot(contentView).render(<App />);
}
