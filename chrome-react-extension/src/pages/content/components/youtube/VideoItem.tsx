import React, { FC } from "react";
import { IVideo } from "@src/common/interfaces.js";

const VideoItem: FC<{ video: IVideo }> = ({ video }) => {
  const moveToVideoPage = () => {
    window.location.href = `https://www.youtube.com/watch?v=${video.id}`;
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
  return (
    <div className="video-item-wrapper" onClick={moveToVideoPage}>
      <img src={thumbnailUrl} alt="thumbnail" className="video-item-img" />
      <p className="video-item-title">{video.title}</p>
    </div>
  );
};

export default VideoItem;
