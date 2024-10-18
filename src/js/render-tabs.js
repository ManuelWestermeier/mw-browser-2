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
    const tabElem = document.createElement("div")
    tabElem.setAttribute("tabindex", "0");
    tabElem.classList.add("tab")

    if (getCurrentTabIndex() == index) {
        tabElem.classList.add("focused")
        tabElem.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    tabElem.innerHTML = `<span></span> <button>close</button>`

    const [tabTextElem, tabCloseButton] = tabElem.children

    tabTextElem.innerText = url
    tabTextElem.onclick = () => {
        openTab(index)
    }

    tabElem.onkeydown = ({ key }) => {
        if (key == "Enter" || key == "y")
            openTab(index)
        else if (key == "x")
            removeTab(index)
    }

    tabCloseButton.onclick = () => {
        removeTab(index)
    }

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