let clear = document.querySelector("#resetButton");
let blackButton = document.querySelector("#blackButton");
let randomButton = document.querySelector("#colorfulButton");
let container = document.querySelector(".container");
let exchange = document.querySelector("#exchangeButton");

let traceButton = document.createElement("button"); // Create Trace Toggle Button
traceButton.textContent = "Toggle Trace";
traceButton.id = "traceButton";
document.querySelector(".controls").appendChild(traceButton); // Add to controls

let currentMode = 'black'; // Default mode is black
let gridSize = 16; // Default grid size
let currentIndex = 0; // Start at the first square
let traceMode = false; // Trace mode starts as off

clear.addEventListener('click', () => { 
    resetSize(); // Reset grid size on button click
});

blackButton.addEventListener('click', () => {
    currentMode = 'black'; // Set mode to black on hover
});

randomButton.addEventListener('click', () => {
    currentMode = 'random'; // Set mode to random color on hover
});

exchange.addEventListener("click", () => {
    document.querySelectorAll(".container div").forEach(square => {
        square.style.backgroundColor = "white"; // Set each square's background to white
    });
});

traceButton.addEventListener("click", () => {
    traceMode = !traceMode; // Toggle trace mode
    traceButton.textContent = traceMode ? "Stop Trace" : "Start Trace";
});

function resetSize() {
    let number = prompt("What size would you like the grid to be? (1-100)");
    gridSize = parseInt(number) || 16;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    createGrid(gridSize); 
}
        
function createGrid(size) {
    container.innerHTML = ""; // Clear existing grid squares
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size * size; i++) {
        let square = document.createElement("div");
        square.style.backgroundColor = "white";
        square.dataset.index = i; // Assign a unique index to each square
        container.appendChild(square);

        square.addEventListener('mouseover', () => {
            if (currentMode === 'black') {
                square.style.backgroundColor = "black"; // Set square color to black
            } else if (currentMode === 'random') {
                square.style.backgroundColor = getRandomColor(); // Set square color to random
            }
        });
    }

    currentIndex = 0; // Reset the active square to the first one
    highlightSquare(currentIndex); // Highlight the first square
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

// Highlight the current square
function highlightSquare(index) {
    document.querySelectorAll(".container div").forEach((square, i) => {
        if (i === index) {
            square.style.boxShadow = "0 0 5px 3px red"; // Highlight active square
            if (traceMode) {
                square.style.backgroundColor = currentMode === 'black' ? "black" : getRandomColor(); // Leave trace
            }
        } else {
            square.style.boxShadow = ""; // Remove highlight from other squares
        }
    });
}

// Handle arrow key navigation
function moveHighlight(event) {
    const totalSquares = gridSize * gridSize;
    let rowSize = gridSize;

    switch (event.key) {
        case "ArrowUp":
            if (currentIndex >= rowSize) {
                currentIndex -= rowSize; // Move up
            }
            break;
        case "ArrowDown":
            if (currentIndex < totalSquares - rowSize) {
                currentIndex += rowSize; // Move down
            }
            break;
        case "ArrowLeft":
            if (currentIndex % rowSize !== 0) {
                currentIndex -= 1; // Move left
            }
            break;
        case "ArrowRight":
            if ((currentIndex + 1) % rowSize !== 0) {
                currentIndex += 1; // Move right
            }
            break;
    }

    highlightSquare(currentIndex); // Update the highlight
}

// Add event listener for arrow keys
document.addEventListener("keydown", moveHighlight);

// Initial grid setup
createGrid(gridSize);
