const fs = require("fs");
const path = require("path");

module.exports = function loadExtensions() {
    const extensionsDir = path.join(__dirname, "ElectronBrowserExtensions");

    try {
        // Ensure the extensions directory exists
        if (!fs.existsSync(extensionsDir)) {
            fs.mkdirSync(extensionsDir);
            fs.writeFileSync(
                path.join(extensionsDir, "How_To_Add_Extension.txt"),
                `
                1. Create a folder in this directory.
                2. Create a manifest.json file in the new folder.
                3. Learn more at: https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/
                4. Have fun!
                `
            );
        }

        // Read the extensions directory
        const extensions = fs.readdirSync(extensionsDir);

        // Iterate over each extension folder
        extensions.forEach(async (extFolder) => {
            const extensionPath = path.join(extensionsDir, extFolder);

            try {
                if (fs.lstatSync(extensionPath).isDirectory()) {
                    await session.defaultSession.loadExtension(extensionPath);

                    // Remove error log if the extension loaded successfully
                    const errorLogPath = path.join(extensionsDir, `.Error_${extFolder}.log.txt`);
                    if (fs.existsSync(errorLogPath)) {
                        fs.unlinkSync(errorLogPath);
                    }
                }
            } catch (error) {
                // Write an error log if loading the extension fails
                const errorLogPath = path.join(extensionsDir, `.Error_${extFolder}.log.txt`);
                fs.writeFileSync(errorLogPath, error.stack);
            }
        });
    } catch (error) {
        console.error("Failed to load extensions:", error);
    }
};
