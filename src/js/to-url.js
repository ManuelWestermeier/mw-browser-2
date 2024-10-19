const data = require("./data")

function tryUrl(url) {
    try {
        //if the url is a valid url
        new URL(url)
        return true
    } catch (error) {
        return false
    }
}

module.exports = function toUrl(input) {
    if (tryUrl(input)) return input
    if (tryUrl(data.shortCuts[input])) return data.shortCuts[input]

    if (tryUrl(`https://${input}`) && input.includes(".") && !input.split(".")[0].includes(" ")) return `https://${input}`

    const searchUrl = new URL(data.searchEngine || "https://www.google.com/search")

    searchUrl.searchParams.set("q", input)

    return searchUrl.toString()
}