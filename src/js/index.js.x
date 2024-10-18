// html elems
const { controllsElem, webViewsElem, tabsElem } = require("./js/elems.js")
//app state data
const data = require("./js/data.js")
// toggle menu
require("./js/key-down.js")

function createWebview([url = data.searchEngine, metaData = null]) {
    const webviewElem = document.createElement("webview")

    webviewElem.src = url

    return webviewElem
}

function createWebviewTab([url = data.searchEngine, metaData = null]) {
    const tabElem = document.createElement("div")

    tabElem.innerText = url

    return tabElem
}

function createNewTab(pos, tabData = [data.searchEngine, null]) {
    // If position is invalid or no items exist, add tab at the end
    if (pos < 0 || data.tabs.length === 0 || webViewsElem.children.length === 0) {
        // Add tab to data
        data.tabs.push(tabData);
        // Add elements to DOM
        webViewsElem.append(createWebview(tabData));
        tabsElem.append(createWebviewTab(tabData)); // Assuming createWebviewTab creates the tab control
        return;
    }

    // Add tab to data at the correct position
    data.tabs.splice(pos, 0, tabData);

    // Insert the new webview before the element at position pos
    webViewsElem.insertBefore(createWebview(tabData), webViewsElem.children[pos]);

    // Insert the new tab control before the element at position pos
    tabsElem.insertBefore(createWebviewTab(tabData), tabsElem.children[pos]);
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

window.addEventListener('error', (event) => {
    console.error('Global error caught: ', event.error);
});
