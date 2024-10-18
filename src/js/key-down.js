const { ipcRenderer } = require('electron');
const { controllsElem, tabsElem } = require("./elems.js");
const { renderTabs } = require('./render-tabs.js');

ipcRenderer.on('KeyDown::Control+Tab', (event, message) => {
    controllsElem.classList.toggle("focused");
    // Check if the element is focused
    if (document.activeElement === tabsElem) {
        // If it's focused, blur it
        tabsElem.blur();
    } else {
        // If it's not focused, focus it
        tabsElem.focus();
        renderTabs();
    }
});