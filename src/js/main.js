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

function createWebview([url = data.searchEngine, metaData = null]) {
    const webviewElem = document.createElement("webview")

    webviewElem.src = url

    return webviewElem
}

function createNewTab(pos, tabData = [data.searchEngine, null]) {
    //no items
    if (pos < 0 || data.tabs.length == 0) {
        data.tabs.push(tabData)
        webViewsElem.append(createWebview(tabData))
        return
    }

    if (webViewsElem.children.length == 0) {
        webViewsElem.append(createWebview(tabData))
        return
    }

    const refElem = webViewsElem.children[pos];
    // Insert the new element before the element at position 2
    webViewsElem.insertBefore(createWebview(tabData), refElem);
}

function checkZeroTabs() {
    if (data.tabs.length == 0) {
        const tabData = [data.searchEngine, null]
        createNewTab(-1, tabData)
    }
}

function renderAllWebViewFromStart() {
    checkZeroTabs()
    webViewsElem.innerHTML = ""
    for (let index = 0; index < data.tabs.length; index++) {
        createNewTab(index, data.tabs[index])
    }
}

renderAllWebViewFromStart()