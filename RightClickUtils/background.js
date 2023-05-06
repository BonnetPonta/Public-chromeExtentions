function search(url) {
    try {
        chrome.tabs.create({ url });
    } catch (e) {
        console.error(e);
        alert("An error occurred while searching. Please try again.");
    }
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "searchOnAmazon",
        title: "Search on Amazon",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "searchOnYouTube",
        title: "Search on YouTube",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "searchOnGoogle",
        title: "Search on Google",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "searchOnGoogleImages",
        parentId: "searchOnGoogle",
        title: "Search on Google Images",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "searchOnGoogleVideos",
        parentId: "searchOnGoogle",
        title: "Search on Google Videos",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info) {
    switch (info.menuItemId) {
        case "searchOnAmazon":
            search(`https://www.amazon.co.jp/s?k=${encodeURIComponent(info.selectionText)}`);
            break;
        case "searchOnYouTube":
            search(`https://www.youtube.com/results?search_query=${encodeURIComponent(info.selectionText)}`);
            break;
        case "searchOnGoogle":
            break;
        case "searchOnGoogleImages":
            search(`https://www.google.com/search?q=${encodeURIComponent(info.selectionText)}&tbm=isch`);
            break;
        case "searchOnGoogleVideos":
            search(`https://www.google.com/search?q=${encodeURIComponent(info.selectionText)}&tbm=vid`);
            break;
        default:
            console.error("Unknown menu item ID: " + info.menuItemId);
            break;
    }
});
