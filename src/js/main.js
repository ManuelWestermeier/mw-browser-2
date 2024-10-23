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

    if (data.tabs.length >= data.currentTabIndex) {
        webViewsElem.children?.[data.currentTabIndex]?.scrollIntoView?.({ behavior: "instant", block: "center" });
    }
}

function addNewTab(index) {
    // add tab to the data
    data.tabs.splice(index, 0, [data.searchEngine, null]);

    // Append the corresponding webview element
    webViewsElem.insertBefore(createWebview([data.searchEngine, null]), webViewsElem.children?.[index]);

    webViewsElem.children?.[index + 1]?.scrollIntoView?.({ behavior: "smooth", block: "center" });

    data.currentTabIndex = index + 1;
    // Re-render the tabs
    webViewsElem.children.item(data.currentTabIndex)
        .addEventListener("dom-ready", () => {
            renderTabs()
            openTab(index + 1)
        })

}


function removeTab(index) {
    // Remove the tab from the data
    data.tabs.splice(index, 1);

    // Remove the corresponding webview element
    webViewsElem.removeChild(webViewsElem.children[index]);

    data.currentTabIndex = getCurrentTabIndex();
    // Re-render the tabs
    if (data.tabs.length <= 0) {
        data.currentTabIndex = 0
        renderAllWebViewFromStart()
        webViewsElem.children.item(0).addEventListener("dom-ready", () => {
            openTab(0);
            renderTabs()
        })
    } else renderTabs();
}

// Initial render
renderAllWebViewFromStart();

console.log("prototype: ", Object.getPrototypeOf(document.createElement("webview")));