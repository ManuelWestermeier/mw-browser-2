const { tabsElem, webViewsElem, controllsElem } = require("./elems.js")
const data = require("./data.js")
const getCurrentTabIndex = require("./get-current-tab-index.js")

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
    renderTabs();
    webViewsElem.removeChild(webViewsElem.childNodes[index]);
}

function createTabElem([url = data.searchEngine, metaData = null], index) {
    const webview = webViewsElem.children[index]
    const tabElem = document.createElement("div")
    tabElem.setAttribute("tabindex", "0");
    tabElem.classList.add("tab")

    if (getCurrentTabIndex() == index) {
        tabElem.classList.add("focused")
        tabElem.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    tabElem.innerHTML = `
    <span></span>
    <button>close</button>
    <div class="controll">
        <button title="back">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </button>
        <button title="reload">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>
        </button>
        <button title="forward">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
        </button>
    </div>`

    const [tabTextElem, tabCloseButton, controlls] = tabElem.children

    tabTextElem.innerText = url
    tabTextElem.onclick = () => {
        openTab(index)
    }

    tabElem.onkeydown = ({ key }) => {
        //open close
        if (key == "Enter" || key == "y")
            openTab(index)
        else if (key == "x")
            removeTab(index)

        //history
        else if (key == "r")
            webview.reload()
        else if (key == "f")
            webview.forward()
        else if (key == "b")
            webview.back()
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

window.addEventListener("keydown", e => {
    if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
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

module.exports = { renderTabs }