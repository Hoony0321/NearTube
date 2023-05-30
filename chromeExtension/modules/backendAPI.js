export const fetchRecommendAPI = async (memberId) => {
  console.log("****** execute recommend api******");
  const host = "http://localhost:8080/api";
  const response = await fetch(`${host}/members/${memberId}/recommend`, {
    method: "GET",
  });

  const data = await response.json();
  console.log("data : ", data);
  return data;
};

export const fetchCreateMemberVideoAPI = async (memberId, videoInfo) => {
  console.log("****** execute create member video api******");
  const host = "http://localhost:8080/api";
  const response = await fetch(`${host}/members/${memberId}/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoInfo),
  });

  console.log("server response : ", response);
};
