console.log("Service Worker Running");
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed. Setting badge to OFF.");
    chrome.action.setBadgeText({ text: "OFF" });
});

chrome.action.onClicked.addListener(async (tab) => {
    console.log("Extension icon clicked!", tab);
    if (!tab.url) return; // Prevent errors on pages without URLs

    // Get the current badge state
    let prevState = await chrome.action.getBadgeText({ tabId: tab.id });

    if (!prevState || prevState === "") {
        prevState = "OFF"; // Default state if empty
    }

    // Toggle ON/OFF state
    const nextState = prevState === "ON" ? "OFF" : "ON";
    console.log(`Previous state: ${prevState}, New state: ${nextState}`);

    // Update badge text
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

    // Apply or remove CSS
    try {
        if (nextState === "ON") {
            console.log("Applying CSS...");
            await chrome.scripting.insertCSS({
                files: ["focus-mode.css"],
                target: { tabId: tab.id },
            });
        } else {
            console.log("Removing CSS...");
            await chrome.scripting.removeCSS({
                files: ["focus-mode.css"],
                target: { tabId: tab.id },
            });
        }
    } catch (error) {
        console.error("Error modifying CSS:", error);
    }
});
