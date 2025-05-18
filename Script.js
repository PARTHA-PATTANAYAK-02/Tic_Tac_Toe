let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector(".refresh"); //
let nextRound = document.querySelector(".btn2"); //
let quite = document.querySelector(".btn1"); //
let turn = document.querySelector(".turn");
let show_winner = document.querySelector(".blank");
let win_msg = document.querySelector(".winner");
let pl1 = document.querySelector(".Player1 p");
let pl2 = document.querySelector(".Player2 p");
let dr = document.querySelector(".Draw .ds");
let player1 = document.querySelector(".Player1");
let player2 = document.querySelector(".Player2");
let player_draw = document.querySelector(".Draw");
let turnO = true;
let count = 0;
let playerX_Score = 0;
let playerO_score = 0;
let draw = 0;
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
const resetGame = () => {
  turnO = true;
  count = 0;
  playerO_score = 0;
  playerX_Score = 0;
  draw = 0;
  pl1.innerText = playerX_Score;
  pl2.innerText = playerO_score;
  dr.innerText = draw;
  enable_btn_after_win_if_want();
};
const nextRoundGame = () => {
  turnO = true;
  count = 0;
  enable_btn_after_win_if_want();
  show_winner.classList.add("hide");
  document.querySelector(".You-win").innerText = "You Win 🎉";
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = '<i class="fa-solid fa-o i2"></i>';
      turnO = false;
      turn.innerHTML = '<i class="fa-solid fa-x i1"></i><p>Turn</p>';
    } else {
      box.innerHTML = '<i class="fa-solid fa-x i1"></i>';
      turnO = true;
      turn.innerHTML = '<i class="fa-solid fa-o i2"></i><p>Turn</p>';
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      draw++;
      dr.innerText = draw;
      gameDraw();
    }
  });
});
const disable_btn_after_win = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enable_btn_after_win_if_want = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};
const showWinner = (winner) => {
  win_msg.innerHTML = `${winner}<p>TAKES THE ROUND</p>`;
  show_winner.classList.remove("hide");
  disable_btn_after_win();
};
const gameDraw = () => {
  win_msg.innerHTML = "<p>Game was Draw</p>";
  show_winner.classList.remove("hide");
  document.querySelector(".You-win").innerText = "😏😏";
  player_draw.classList.add("Gray");
  player1.classList.remove("green", "red");
  player2.classList.remove("green", "red");
  player1.querySelector("i").style.color = "#00ffb3";
  player2.querySelector("i").style.color = "#DFFF00";
  player1.style.color = "white";
  player2.style.color = "white";
  disable_btn_after_win();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerHTML;
    let pos2 = boxes[pattern[1]].innerHTML;
    let pos3 = boxes[pattern[2]].innerHTML;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        if (pos1 === `<i class="fa-solid fa-x i1"></i>`) {
          playerX_Score++;
          pl1.innerText = playerX_Score;
          player1.classList.add("green");
          player1.classList.remove("red");
          player1.querySelector("i").style.color = "black";
          player1.style.color = "black";
          player2.classList.remove("green");
          player2.classList.add("red");
          player_draw.classList.remove("Gray");
        } else if (pos1 === `<i class="fa-solid fa-o i2"></i>`) {
          playerO_score++;
          pl2.innerText = playerO_score;
          player2.classList.add("green");
          player2.classList.remove("red");
          player2.querySelector("i").style.color = "black";
          player2.style.color = "black";
          player1.classList.remove("green");
          player1.classList.add("red");
          player_draw.classList.remove("Gray");
        } else {
        }
        return true;
      }
    }
  }
  return false;
};

reset_btn.addEventListener("click", () => {
  resetGame();
  player1.classList.remove("green", "red");
  player2.classList.remove("green", "red");
  player_draw.classList.remove("Gray");
  player1.querySelector("i").style.color = "#00ffb3";
  player2.querySelector("i").style.color = "#DFFF00";
  player1.style.color = "white";
  player2.style.color = "white";
  turn.innerHTML = `<i class="fa-solid fa-o i2"></i><p>Turn</p>`;
});
nextRound.addEventListener("click", () => {
  nextRoundGame();
  turn.innerHTML = `<i class="fa-solid fa-o i2"></i><p>Turn</p>`;
});
quite.addEventListener("click", () => {
  // window.close();
  resetGame();
  show_winner.classList.add("hide");
  turn.innerHTML = `<i class="fa-solid fa-o i2"></i><p>Turn</p>`;
  player1.classList.remove("green", "red");
  player2.classList.remove("green", "red");
  player_draw.classList.remove("Gray");
  player1.querySelector("i").style.color = "#00ffb3";
  player2.querySelector("i").style.color = "#DFFF00";
  player1.style.color = "white";
  player2.style.color = "white";
});
