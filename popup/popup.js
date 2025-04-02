document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("url");
    const takeurl = document.getElementById("takeCurrent");
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the input values
        const url = document.getElementById("url").value;
        const name = document.getElementById("name").value;
        const password = document.getElementById("pass").value;
        const description = document.getElementById("desc").value;
        fetch("http://127.0.0.1:5000/savePass",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({"name":name, "password":password, "url":url, "desc":description})
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            window.close();
        })
        .catch(error => console.error("Error:", error));
        // Log the values to the console
        console.log("URL:", url);
        console.log("Name:", name);
        console.log("Password:", password);
        console.log("Description:", description);
        form.reset();

        // You can also perform other actions like saving to storage or sending data
    });
    takeurl.addEventListener("click", async () => {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs.length > 0) {
            urlInput.value = tabs[0].url;
        } else {
            console.error("No active tab found.");
        }
    });
});
document.getElementById("takeCurrent").addEventListener("click",(event)=>{
    event.preventDefault();
})
