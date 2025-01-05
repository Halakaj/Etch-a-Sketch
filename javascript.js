const container = document.querySelector(".container");

for (let i = 0; i < 256; i++){
    const child = document.createElement("div");
    child.classList.add("child");
    container.appendChild(child);
}