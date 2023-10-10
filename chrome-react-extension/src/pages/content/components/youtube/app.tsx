import { useEffect, useState, FC } from "react";
import logo from "@assets/img/logo.svg";
import {
  getClusterAPI,
  searchClusterAPI,
} from "../../../../common/utils/backendUtils.js";
import { checkVideoStatus } from "../../../../common/utils/youtubeUtils.js";
import VideoItem from "./VideoItem.js";
import ChannelItem from "./ChannelItem.js";
import { IGroup } from "@src/common/interfaces.js";
import GroupItem from "./GroupItem.js";

export const locationList = [
  "경영대학",
  "공과대학",
  "국제대학",
  "멀티미디어관",
  "사색의광장",
  "생명대학",
  "선승관",
  "예술관",
  "예술디자인대학",
  "외국어대학",
  "우정원",
  "전자정보대학",
  "정문건너편",
  "제2기숙사",
  "중앙도서관",
  "체육대학",
  "학생회관",
];

const App = () => {
  const [user, setUser] = useState(undefined);
  const [activeTab, setActiveTab] = useState("videoTab"); // ["videos", "channels", "info"
  const [channels, setChannels] = useState([]);
  const [videos, setVideos] = useState([]);
  const [group, setGroup] = useState<IGroup>(undefined);
  const [isToggled, setIsToggled] = useState(true);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  useEffect(() => {
    chrome.storage.local.get(["user"], (result) => {
      if (result.user != undefined && result.user != null) {
        setUser(result.user);
      }
    });
  }, []);

  useEffect(() => {
    if (user == undefined) return;
    setContent();
  }, [user]);

  useEffect(() => {
    document.getElementById(activeTab).classList.add("active");
  }, [activeTab]);

  const changeTab = async (tabName) => {
    document.getElementById(activeTab).classList.remove("active");
    await setActiveTab(tabName);
  };

  const setContent = async () => {
    // get cluser info from server
    const data = await getClusterAPI(user.id);
    if (data == undefined || data == null) {
      return;
    }

    setChannels(data.channels);

    // check video status
    const statuses = await Promise.all(
      data.videos.map((video) => checkVideoStatus(video.id))
    );

    // filter videos
    data.videos = data.videos.filter((video, index) => statuses[index]);

    setVideos(data.videos);

    const group: IGroup = {
      id: data.id,
      mainCategories: data.mainCategories,
      mainJob: data.mainJob,
      mainLocations: data.mainLocations,
    };
    setGroup(group);
  };

  const clickSearchButton = async () => {
    const data = await searchClusterAPI(selectedLocation, selectedJob);

    if (data == undefined || data == null) {
      alert("검색 결과가 없습니다.");
      return;
    }

    setChannels(data.channels);
    setVideos(data.videos);

    const group: IGroup = {
      id: data.id,
      mainCategories: data.mainCategories,
      mainJob: data.mainJob,
      mainLocations: data.mainLocations,
    };
    setGroup(group);
  };

  return (
    <div className="neartube-content-container">
      <div className={`toggle-container ${isToggled ? "active" : ""}`}>
        <button
          className="toggle-button"
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <span className={`slider ${isToggled ? "active" : ""}`} />
        </button>
      </div>

      {isToggled && (
        <>
          <div className="neartube-top-section">
            <div style={{ marginLeft: "1rem" }}>
              <img
                src={chrome.runtime.getURL(logo)}
                alt="logo"
                style={{ width: "15rem" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "1rem",
                marginTop: "1.5rem",
                gap: "1.2rem",
              }}
            >
              <select
                className="dropdown"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Location</option>
                {locationList.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <select
                className="dropdown"
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
              >
                <option value="">Job</option>
                <option value="학부생">학부생</option>
                <option value="대학원생">대학원생</option>
                <option value="교수">교수</option>
              </select>

              <button className="search-button" onClick={clickSearchButton}>
                검색
              </button>
            </div>
          </div>
          <div className="content-section">
            <div className="tab-container">
              <div
                className="tab active"
                id="videoTab"
                onClick={() => {
                  changeTab("videoTab");
                }}
              >
                영상
              </div>
              <div
                className="tab"
                id="channelTab"
                onClick={() => {
                  changeTab("channelTab");
                }}
              >
                채널
              </div>
              <div
                className="tab"
                id="infoTab"
                onClick={() => {
                  changeTab("infoTab");
                }}
              >
                정보
              </div>
            </div>
            <div className="content-box">
              {activeTab == "videoTab" &&
                videos.map((video) => (
                  <VideoItem key={video.id} video={video} />
                ))}
              {activeTab == "channelTab" &&
                channels.map((channel) => (
                  <ChannelItem key={channel.id} channel={channel} />
                ))}
              {activeTab == "infoTab" && <GroupItem group={group} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
