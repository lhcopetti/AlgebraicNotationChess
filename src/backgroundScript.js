
console.log("Backgroudn script initialized successfully");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        sendResponse({
            data: sender.tab.url
        });
    }
);
