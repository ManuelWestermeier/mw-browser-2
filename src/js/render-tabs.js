const { tabsElem, webViewsElem, controllsElem } = require("./elems.js")
const data = require("./data.js")
const getCurrentTabIndex = require("./get-current-tab-index.js")

function createTabElem([url = data.searchEngine, metaData = null], index) {
    const tabElem = document.createElement("div")
    tabElem.classList.add("tab")

    if (getCurrentTabIndex() == index) {
        tabElem.classList.add("focused")
        tabElem.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    tabElem.innerHTML = `<span></span> <button>close</button>`

    const [tabTextElem, tabCloseButton] = tabElem.children

    tabTextElem.innerText = url
    tabTextElem.onclick = () => {
        controllsElem.classList.remove("focused");
        webViewsElem.children?.[index]?.
            scrollIntoView?.({ behavior: "smooth", block: "center" })

        for (const tab of tabElem.parentElement.children) {
            tab.classList.remove("focused")
        }

        tabElem.classList.add("focused")
        tabElem.scrollIntoView({ behavior: "smooth", block: "center" })
        data.currentTabIndex = index
    }

    tabCloseButton.onclick = () => {
        alert("close")
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

module.exports = { renderTabs }