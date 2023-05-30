const API_KEY = "AIzaSyBBOiLRjYI1zBufrBflw5XLlYaPF2ukdaw";

export const getVideoInfoByAPI = async (videoId) => {
  // Make the API request to retrieve video information
  const baseUrl = "https://www.googleapis.com/youtube/v3/videos";
  const apiUrl = `${baseUrl}?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log("data : ", data);

  return data;
};

export const getYoutubeSubscriptionsAPI = async (token, userId) => {
  const maxResults = 50; //최대 50개만 가능
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Use the token to make requests to Google APIs
  var apiUrl = `https://www.googleapis.com/youtube/v3/subscriptions?mine=true&part=snippet&maxResults=${maxResults}&key=${API_KEY}`;
  var headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });

  if (response.status != 200) return undefined;

  const data = await response.json();
  const subscriptions = [];

  data.items.forEach((item) => {
    let channelId = item.snippet.resourceId.channelId;
    let publishedAt = item.snippet.publishedAt;
    subscriptions.push({
      channelId: channelId,
      publishedAt: publishedAt,
    });
  });

  console.log("subscriptions : ", subscriptions);
  return subscriptions;
};
