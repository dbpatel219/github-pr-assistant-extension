// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    console.log("Browser Action message....");
    chrome.tabs.sendMessage(activeTab.id, {"message": "pr_assist"});
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo && changeInfo.status == "complete"){
        console.log("onUpdated message...");
        chrome.tabs.sendMessage(tabId, {"message": "pr_assist"});
    }
});