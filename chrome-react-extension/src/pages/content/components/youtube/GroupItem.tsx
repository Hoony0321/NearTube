import { IGroup } from "@src/common/interfaces";
import React, { FC } from "react";

const GroupItem: FC<{ group: IGroup }> = ({ group }) => {
  let location;
  if (group.mainLocations[0] == "생명대학") {
    location = "전자정보대학";
  } else {
    location = group.mainLocations.join(", ");
  }
  return (
    <div className="group-info-wrapper">
      <h1 style={{ fontSize: "25px", fontWeight: 700 }}>이웃 그룹 정보</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "2rem" }}>
          <p
            style={{
              fontSize: "16px",
              width: "100px",
              textAlign: "right",
              fontWeight: 700,
            }}
          >
            대표 카테고리
          </p>
          <p style={{ fontSize: "14px" }}>{group.mainCategories.join(", ")}</p>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <p
            style={{
              fontSize: "16px",
              width: "100px",
              textAlign: "right",
              fontWeight: 700,
            }}
          >
            대표 장소
          </p>
          <p style={{ fontSize: "14px" }}>{location}</p>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <p
            style={{
              fontSize: "16px",
              width: "100px",
              textAlign: "right",
              fontWeight: 700,
            }}
          >
            대표 직업
          </p>
          <p style={{ fontSize: "14px" }}>
            {group.mainJob == "" ? "없음" : group.mainJob.split("-")[1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
