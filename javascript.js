const container = document.querySelector(".container");

for (let i = 0; i < 256; i++){
    const child = document.createElement("div");
    child.classList.add("child");
    container.appendChild(child);
}
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    const children = document.querySelectorAll(".child");
    children.forEach(child => child.style.backgroundColor = "");
});
container.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("child")) {
        event.target.style.backgroundColor = "lightblue";
    }
});
