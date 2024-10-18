const { ipcRenderer } = require('electron');
const { controllsElem, tabsElem } = require("./elems.js");
const { renderTabs } = require('./render-tabs.js');
const getCurrentTabIndex = require('./get-current-tab-index.js');

ipcRenderer.on('KeyDown::Control+Tab', (event, message) => {
    controllsElem.classList.toggle("focused");

    renderTabs();

    const tabElem = tabsElem.children[getCurrentTabIndex()]
    tabElem.scrollIntoView({ behavior: "smooth", block: "center" })
    tabElem.focus();
});