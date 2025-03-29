document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("url");
    const takeurl = document.getElementById("takeCurrent");

    takeurl.addEventListener("click", async () => {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs.length > 0) {
            urlInput.value = tabs[0].url;
        } else {
            console.error("No active tab found.");
        }
    });
});
