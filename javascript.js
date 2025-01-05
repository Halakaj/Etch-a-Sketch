let clear = document.querySelector("#resetButton");
let blackButton = document.querySelector("#blackButton");
let randomButton = document.querySelector("#colorfulButton");
let container = document.querySelector(".container");
let exchange = document.querySelector("#exchangeButton");

let currentMode = 'black'; // Default mode is black

clear.addEventListener('click', () => { 
    resetSize(); // Reset grid size on button click
})

blackButton.addEventListener('click', () => {
    currentMode = 'black'; // Set mode to black on hover
})

randomButton.addEventListener('click', () => {
    currentMode = 'random'; // Set mode to random color on hover
})

function resetSize(){
    let number = prompt("What size would you like the grid to be? (1-100)");
    container.style.gridTemplateRows = `repeat(${number}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
    createGrid(number); 
}
        
function createGrid(size){
    container.innerHTML = ""; // Clear existing grid squares
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size * size; i++) {
        
        let square = document.createElement("div");
        square.style.backgroundColor = "white";
        container.appendChild(square);

        square.addEventListener('mouseover', e => {
            if (currentMode === 'black') {
                square.style.backgroundColor = "black"; // Set square color to black
            } else if (currentMode === 'random') {
                square.style.backgroundColor = getRandomColor(); // Set square color to random
            }
        });
    }
}

// Helper function to generate a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

exchange.addEventListener("click", () => {
    document.querySelectorAll(".container div").forEach(square => {
        square.style.backgroundColor = "white"; // Set each square's background to white
    });
});

// Initial grid setup
createGrid(16);
