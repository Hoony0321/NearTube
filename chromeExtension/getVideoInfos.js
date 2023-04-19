const getVideoInfoByAPI = async (videoId) => {
    console.log("getVideoInfoByAPI 실행");
    // Make the API request to retrieve video information
    const apiKey = "AIzaSyBBOiLRjYI1zBufrBflw5XLlYaPF2ukdaw"
    const baseUrl = "https://www.googleapis.com/youtube/v3/videos";
    const apiUrl = `${baseUrl}?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    console.log("data : ", data);
  
    return data;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)){
    if(request.message === "get_videos_info"){
        const topVideoIds = request.topVideoIds;
        sendResponse({message : "receiving top video ids2"});

        topVideoIds.forEach(async (videoId) => {
            videoInfo = await getVideoInfoByAPI(topVideoIds[0]);
            console.log(`${videoId} : ${videoInfo}`)
        });
    }

}