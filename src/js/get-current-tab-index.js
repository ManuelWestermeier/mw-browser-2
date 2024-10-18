const { webViewsElem } = require("./elems")

module.exports = function getCurrentTabIndex() {
    const scrollPos = webViewsElem.scrollLeft / webViewsElem.getClientRects()[0].width
    return Math.round(scrollPos)
}