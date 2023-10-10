// const host = "http://15.165.60.204:8080"; 변경 필요
const host = "http://localhost:8080";

export const getMemberAPI = async (id) => {
  const response = await fetch(`${host}/api/members/${id}`, {
    method: "GET",
  });

  if (response.status != 200) {
    console.log("회원 정보 조회 실패 : ", response);
    alert("회원 정보 조회에 실패했습니다.");
    return null;
  } else {
    const data = await response.json();
    console.log("회원 정보 조회 성공: ", data);
    return data;
  }
};

export const createMemberAPI = async (memberInfo) => {
  const response = await fetch(`${host}/api/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberInfo),
  });

  if (response.status != 200) {
    alert("회원가입에 실패했습니다.");
  } else {
    alert("회원가입에 성공했습니다.");
  }
};

export const createSubscriptionAPI = async (id, subscriptions) => {
  const response = await fetch(`${host}/api/members/${id}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscriptions),
  });

  if (response.status != 200) {
    console.log("구독 채널 정보 추가 실패 : ", response);
    alert("구독 채널 정보 추가에 실패했습니다.");
  } else {
    console.log("구독 채널 정보 추가 성공: ", response);
  }
};

export const countMemberLocationAPI = async (id, latitude, longitude) => {
  const data = {
    latitude: latitude,
    longitude: longitude,
  };

  const response = await fetch(`${host}/api/members/${id}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    console.log("회원 위치 정보 추가 실패 : ", response);
    alert("회원 위치 정보 추가에 실패했습니다.");
  }
};

export const getClusterAPI = async (id) => {
  const response = await fetch(`${host}/api/members/${id}/cluster`, {
    method: "GET",
  });

  if (response.status != 200) {
    console.log("클러스터 정보 조회 실패 : ", response);
    alert("클러스터 정보 조회에 실패했습니다.");
    return null;
  } else {
    const data = await response.json();
    console.log("클러스터 정보 조회 성공: ", data);
    return data;
  }
};

export const searchClusterAPI = async (location, job) => {
  const response = await fetch(
    `${host}/api/clusters/search?location=${location}&job=${job}`,
    {
      method: "GET",
    }
  );

  if (response.status != 200) {
    return null;
  } else {
    const data = await response.json();
    return data;
  }
};

// 회원-비디오에 새로운 비디오 정보 추가
export const fetchCreateMemberVideoAPI = async (memberId, videoInfo) => {
  const host = "http://localhost:8080/api";
  const response = await fetch(`${host}/members/${memberId}/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoInfo),
  });
};
