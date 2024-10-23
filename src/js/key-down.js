const { ipcRenderer } = require('electron');
const { controllsElem, tabsElem, webViewsElem } = require("./elems.js");
const { renderTabs } = require('./render-tabs.js');
const getCurrentTabIndex = require('./get-current-tab-index.js');

ipcRenderer.on('KeyDown::Control+Tab', (event, message) => {
    controllsElem.classList.toggle("focused");
    renderTabs();

    const currentWebviewIndex = getCurrentTabIndex()

    const tabElem = tabsElem.children[currentWebviewIndex]
    tabElem.scrollIntoView({ behavior: "smooth", block: "center" })

    if (!controllsElem.classList.contains("focused"))
        webViewsElem.children[currentWebviewIndex].focus()
    else
        tabElem.focus();
});

ipcRenderer.on('KeyDown::Control+T', (event, message) => {
    addNewTab();
});

ipcRenderer.on('KeyDown::Control+W', (event, message) => {
    removeTab(getCurrentTabIndex());
});

ipcRenderer.on('KeyDown::Control+Left', (event, message) => {
    if (controllsElem.classList.contains("focused")) return

    webViewsElem.children?.[data.currentTabIndex - 1]?.scrollIntoView?.({ behavior: "smooth", block: "center" });
});


ipcRenderer.on('KeyDown::Control+Right', (event, message) => {
    if (controllsElem.classList.contains("focused")) return

    webViewsElem.children?.[data.currentTabIndex + 1]?.scrollIntoView?.({ behavior: "smooth", block: "center" });
});

// Keydown event listener for tab switching
window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;
        e.preventDefault();

        const currentTabIndex = data.currentTabIndex;
        let index = currentTabIndex + (e.key === "ArrowLeft" ? -1 : 1);

        if (index === -1) {
            index = tabsElem.children.length - 1;
        } else if (index === tabsElem.children.length) {
            index = 0;
        }

        const tabElem = tabsElem.children[index];

        if (!tabElem) tabElem = tabsElem.children[0]

        for (const tab of tabsElem.children) {
            tab.classList.remove("focused");
        }

        tabElem.classList.add("focused");
        tabElem.focus();
        tabElem.scrollIntoView({ behavior: "smooth", block: "center" });
        data.currentTabIndex = index;
    }
});