function search(engine, info, tab, params = "") {
    try {
        const text = info.selectionText;
        const url = `https://www.${engine}/search?q=${encodeURIComponent(text)}&${params}`;
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

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case "searchOnAmazon":
            search("amazon.co.jp", info, tab);
            break;
        case "searchOnYouTube":
            search("youtube.com", info, tab);
            break;
        case "searchOnGoogle":
            break;
        case "searchOnGoogleImages":
            search("google.com", info, tab, "tbm=isch");
            break;
        case "searchOnGoogleVideos":
            search("google.com", info, tab, "tbm=vid");
            break;
        default:
            console.error("Unknown menu item ID: " + info.menuItemId);
            break;
    }
});
