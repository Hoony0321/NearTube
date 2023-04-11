chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("current url is: " + tab.url);
  if (changeInfo.status === 'complete') {
    if(tab.url.includes('m.youtube.com')){
      chrome.tabs.sendMessage(tabId, {message: 'mobile_get_top_videos'}, function(response) {
        console.log(response);
      });
    }
    else if(tab.url.includes('youtube.com')){
      chrome.tabs.sendMessage(tabId, {message: 'get_top_videos'}, function(response) {
        console.log(response);
      });
    }
    
  }
});  