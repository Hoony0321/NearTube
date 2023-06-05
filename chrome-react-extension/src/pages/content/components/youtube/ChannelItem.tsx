import React, { FC } from "react";
import { IChannel } from "@src/common/interfaces.js";

const ChannelItem: FC<{ channel: IChannel }> = ({ channel }) => {
  const moveToChannelPage = () => {
    window.location.href = `https://www.youtube.com/channel/${channel.id}`;
  };

  return (
    <div className="channel-item-wrapper" onClick={moveToChannelPage}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img className="channel-item-thumbnail" src={channel.thumbnail} />
        <p className="channel-item-title">{channel.title}</p>
      </div>
      <p className="channel-item-description">{channel.description}</p>
      <p className="channel-item-categories">카테고리 : {channel.categories}</p>
    </div>
  );
};

export default ChannelItem;
