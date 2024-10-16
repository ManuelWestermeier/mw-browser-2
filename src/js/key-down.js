const { ipcRenderer } = require('electron');
const { controllsElem } = require("./elems.js")

ipcRenderer.on('KeyDown::Control+Tab', (event, message) => {
    controllsElem.classList.toggle("focused");
});