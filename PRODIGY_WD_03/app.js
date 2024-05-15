// Selecting all elements with the class "box"
let boxes = document.querySelectorAll(".box");

// Selecting reset and new game buttons, as well as message container and message elements
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// All selection completed

// Variable to keep track of the current player's turn (true for playerO, false for playerX)
let turnO = true;

// Variable to track the number of moves made, used to determine a draw
let count = 0;

// Array of winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game to its initial state
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Adding click event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Checking whose turn it is and marking the box accordingly
    if (turnO) {
      // Player O's turn
      let O = "O";
      box.classList.add('color');  
      box.innerText = O;
      
      turnO = false;

    } else {
      // Player X's turn
      box.innerText = "X";
      box.classList.remove('color');  
      turnO = true;
    }

    // Disabling the clicked box to prevent further moves
    box.disabled = true;

    // Incrementing the move count
    count++;

    // Checking for a winner or a draw after each move
    let isWinner = checkWinner();

    // If all moves are made and there is no winner, declare a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to display a message in case of a draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to disable all boxes 
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes 
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function to display the winner and disable further moves
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to check for a winner based on the winning patterns
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // If all positions in a winning pattern have the same value, declare the winner
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

// Adding click event listeners to the new game and reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
