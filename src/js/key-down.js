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

window.addEventListener("keydown", e => {
    if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
        if (document.activeElement.tagName == "INPUT") return
        if (document.activeElement.tagName == "TEXTAREA") return
        e.preventDefault()

        const currentTabIndex = data.currentTabIndex
        var index = currentTabIndex + (e.key == "ArrowLeft" ? -1 : 1)

        if (index == -1) {
            index = tabsElem.children.length - 1
        } else if (index == tabsElem.children.length) {
            index = 0
        }

        const tabElem = tabsElem.children[index]

        for (const tab of tabsElem.children) {
            tab.classList.remove("focused")
        }

        tabElem.classList.add("focused")
        tabElem.focus()

        tabElem.scrollIntoView({ behavior: "smooth", block: "center" })
        data.currentTabIndex = index
    }
})