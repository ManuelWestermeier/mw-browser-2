const getCurrentTabIndex = require("./js/get-current-tab-index.js")
// html elems
const { webViewsElem } = require("./js/elems.js")
//app state data
const data = require("./js/data.js")
// toggle menu
require("./js/key-down.js")

webViewsElem.onscroll = () => {
    data.currentTabIndex = getCurrentTabIndex()
}
// Other supporting functions
function createWebview([url = data.searchEngine, metaData = null]) {
    const webviewElem = document.createElement("webview");
    webviewElem.src = url;
    return webviewElem;
}

function renderAllWebViewFromStart() {
    if (!data.tabs.length) data.tabs = [[data.searchEngine, null]];
    webViewsElem.innerHTML = "";
    for (let index = 0; index < data.tabs.length; index++) {
        webViewsElem.append(createWebview(data.tabs[index]));
    }
}

// Initial render
renderAllWebViewFromStart();

console.log("prototype: ", Object.getPrototypeOf(document.createElement("webview")));