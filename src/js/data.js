const defaultData = {
    tabs: [
        ["https://manuelwestermeier.github.io/fsRch/", null],
        ["https://www.youtube.com/@TAGESSCHATTEN", null],
        ["https://manuelwestermeier.github.io/memory_game", null]
    ], searchEngine: "https://manuelwestermeier.github.io/fsRch/",
    currentTabIndex: 0
}

function getData() {
    const data = localStorage.getItem("browser-data")

    try {
        return data ? JSON.parse(data) : defaultData
    } catch (error) {
        console.error(error)
        return defaultData
    }
}

module.exports = getData()