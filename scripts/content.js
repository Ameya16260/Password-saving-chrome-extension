const titles=document.getElementsByClassName("mw-page-title-main");
const text=titles[0].textContent;
const badge = document.createElement("p");
badge.textContent = text; // ✅ Fixed text assignment
    badge.style.color = "red";
    badge.style.fontSize = "60px";
    titles[0].after(badge);