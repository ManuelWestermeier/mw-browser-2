const defaultData = {
    tabs: [
        ["https://manuelwestermeier.github.io/fsRch/", null],
        ["https://www.youtube.com/", null],
        ["https://manuelwestermeier.github.io/memory_game", null]
    ],
    searchEngine: "https://manuelwestermeier.github.io/fsRch/",
    currentTabIndex: 0,
    shortCuts: {
        y: "https://www.youtube.com/",
        g: "https://www.google.com/",
        f: "https://www.facebook.com/",
        i: "https://www.instagram.com/",
        t: "https://twitter.com/",
        r: "https://www.reddit.com/",
        a: "https://www.amazon.com/",
        w: "https://en.wikipedia.org/",
        n: "https://www.netflix.com/",
        l: "https://www.linkedin.com/",
        p: "https://www.pinterest.com/",
        m: "https://www.microsoft.com/",
        d: "https://www.dropbox.com/",
        e: "https://www.ebay.com/",
        h: "https://www.hulu.com/",
        s: "https://www.spotify.com/",
        o: "https://www.office.com/",
        z: "https://zoom.us/",
        q: "https://www.quora.com/",
        u: "https://www.uber.com/",
        v: "https://vimeo.com/",
        b: "https://www.bing.com/",
        c: "https://www.craigslist.org/",
        k: "https://www.kickstarter.com/",
        x: "https://www.xbox.com/",
        j: "https://www.jetbrains.com/",
        mt: "https://www.medium.com/"
    }
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