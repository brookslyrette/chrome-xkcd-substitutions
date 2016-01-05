// plugin is enabled by default.
var enabled = true;
chrome.storage.sync.get('xkcdEnabled', function(result){
    if (result.xkcdEnabled === undefined) {
        // add config option to local storage
        chrome.storage.sync.set({'xkcdEnabled': enabled}, function(){});
    }
    else {
        // config is already set
        enabled = result.xkcdEnabled;
    }
    //update the icon status
    updateXkcdState();
});

function toggleXkcdState() {
    // flip the plugin status
    enabled = !enabled;
    // save the new value
    chrome.storage.sync.set({'xkcdEnabled': enabled}, function(){
        // update the icon state
        updateXkcdState();
        // reload the page
        chrome.tabs.reload();
    });
}

function updateXkcdState() {
    if (enabled) {
        chrome.browserAction.setIcon({path:'/img/icon_on.png'});
    }
    else {
        chrome.browserAction.setIcon({path:'/img/icon_off.png'});
    }
}

chrome.browserAction.onClicked.addListener(toggleXkcdState);
