const API_KEY = "AIzaSyBBOiLRjYI1zBufrBflw5XLlYaPF2ukdaw";

export const getVideoInfoByAPI = async (videoId) => {
  console.log("getVideoInfoByAPI 실행");
  // Make the API request to retrieve video information
  const baseUrl = "https://www.googleapis.com/youtube/v3/videos";
  const apiUrl = `${baseUrl}?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log("data : ", data);

  return data;
};
