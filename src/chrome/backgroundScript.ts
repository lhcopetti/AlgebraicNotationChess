console.log('Background script initialized successfully');

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (!sender || !sender.tab) return;

        sendResponse({
            data: sender.tab.url,
        });
    },
);
