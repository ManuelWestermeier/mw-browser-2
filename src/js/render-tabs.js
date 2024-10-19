const { tabsElem, webViewsElem, controllsElem } = require("./elems.js")
const data = require("./data.js")
const getCurrentTabIndex = require("./get-current-tab-index.js")
const toUrl = require("./to-url.js")

function openTab(index) {
    const tabElem = tabsElem.children[index]

    if (!tabElem) return

    controllsElem.classList.remove("focused");
    webViewsElem.children?.[index]?.
        scrollIntoView?.({ behavior: "smooth", block: "center" })

    for (const tab of tabsElem.children) {
        tab.classList.remove("focused")
    }

    tabElem.classList.add("focused")
    tabElem.scrollIntoView({ behavior: "smooth", block: "center" })
    data.currentTabIndex = index
}

function removeTab(index) {
    if (data.currentTabIndex == index && data.currentTabIndex >= 1) data.currentTabIndex--
    data.tabs.splice(index, 1);
    checkZeroTabs();
    webViewsElem.removeChild(webViewsElem.childNodes[index]);
    renderTabs();
}

function createTabElem([url = data.searchEngine, metaData = null], index) {
    const webview = webViewsElem.children[index]
    const tabElem = document.createElement("div")
    tabElem.setAttribute("tabindex", "0");
    tabElem.classList.add("tab")

    if (getCurrentTabIndex() == index) {
        tabElem.classList.add("focused")
        tabElem.focus()
        tabElem.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    tabElem.innerHTML = `
    <span></span>
    <input type="url" playeholder="url..."></input>
    <button title="close [x]">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </button>
    <div class="controll">
        <button title="back [b]">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </button>
        <button title="reload [r]">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>
        </button>
        <button title="forward [f]">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
        </button>
    </div>`

    const [tabTextElem, urlInputElem, tabCloseButton, controlls] = tabElem.children

    tabTextElem.innerText = webViewsElem.childNodes[index].getTitle()

    urlInputElem.value = webViewsElem.childNodes[index].getURL()
    urlInputElem.onblur = () => {
        if (urlInputElem.value != webViewsElem.childNodes[index].getURL()) {
            webViewsElem.childNodes[index].loadURL(
                toUrl(urlInputElem.value)
            )
            console.log(
                toUrl(urlInputElem.value)
            );

            openTab(index)
        }
    }
    urlInputElem.onkeydown = e => {
        if (e.key == "Enter") {
            e.preventDefault()
            urlInputElem.onblur()
        }
    }

    tabTextElem.onclick = () => {
        openTab(index)
    }

    tabElem.onkeydown = ({ key }) => {
        if (key == "ArrowUp") {
            tabElem.focus()
        }

        if (tabElem != document.activeElement) return
        //open close
        if (key == "Enter" || key == "y")
            openTab(index)
        else if (key == "x")
            removeTab(index)

        //history
        else if (key == "r") {
            openTab(index)
            webview.reload()
        }
        else if (key == "f") {
            openTab(index)
            webview.goForward()
        } else if (key == "b") {
            openTab(index)
            webview.goBack()
        }

        else if (key == "ArrowDown") {
            urlInputElem.focus()
        }
    }

    tabCloseButton.onclick = () => {
        removeTab(index)
    }

    const [backWardsButton, reloadButton, forwardsButton] = controlls.children

    backWardsButton.onclick = () => webview.back()
    reloadButton.onclick = () => webview.reload()
    forwardsButton.onclick = () => webview.forward()

    return tabElem
}

function renderTabs() {
    tabsElem.innerHTML = ""

    for (let index = 0; index < data.tabs.length; index++) {
        const tabElem = createTabElem(data.tabs[index], index)
        tabsElem.append(tabElem)
    }
}

module.exports = { renderTabs }