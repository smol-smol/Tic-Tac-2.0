const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const message = document.querySelector("#message");

// Initialize confetti
const confettiSettings = {
  target: "my-canvas",
  width: window.innerWidth,
  height: window.innerHeight,
};
const confetti = new ConfettiGenerator(confettiSettings);

let turn0 = true; // true for 'O', false for 'X'
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const highlightWinner = (pattern) => {
  pattern.forEach((index) => {
    boxes[index].style.backgroundColor = "#FFEBB7";
    boxes[index].style.boxShadow = "0 0 10px 5px #FFD700";
  });
};

const disableBoard = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const triggerConfetti = () => {
  confetti.render(); // Start rendering confetti

  // Increase confetti intensity and duration
  for (let i = 0; i < 3; i++) {
    setTimeout(() => confetti.render(), i * 1000);
  }
  setTimeout(() => confetti.clear(), 5000); // Stop after 5 seconds
};

const resetBoard = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "#F9DEC9";
    box.style.boxShadow = "0 0 1rem rgba(0,0,0,0.51)";
  });
  message.innerText = "Winner: ";
  turn0 = true;
  gameOver = false;
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const pos1 = boxes[a].innerText;
    const pos2 = boxes[b].innerText;
    const pos3 = boxes[c].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      message.innerText = `Winner: ${pos1}`;
      highlightWinner(pattern);
      triggerConfetti(); // Trigger confetti on win
      disableBoard();
      gameOver = true;
      return;
    }
  }

  const isDraw = [...boxes].every((box) => box.innerText !== "");
  if (isDraw && !gameOver) {
    message.innerText = "It's a Draw!";
    gameOver = true;
  }
};

// Add event listeners to boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver || box.innerText !== "") return;

    box.innerText = turn0 ? "O" : "X";
    turn0 = !turn0;
    checkWinner();
  });
});

// Reset button functionality
resetBtn.addEventListener("click", resetBoard);
