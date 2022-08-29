"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const resetGame = document.querySelector(".btn--new");

// const player1 = document.querySelector(".player--0");
// console.log(player1.contains("player--active"));

let scores, currentScore, activePlayer, playing;

//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");//we dont know which player is the winner so removing from both will remove from any one of them
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");//player 0 needs to be active in the beginning
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};


// Rolling Dice functionality
rollDice.addEventListener("click", function () {
  if (playing) {
    const dice = Math.floor(Math.random() * 6 + 1);
    // console.log(random);

    //2. display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    //3. check if rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // document.querySelector("#current--0").textContent = score; //add dice val to curr score
    } else {
      //switch player
      switchPlayer();
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    // document.querySelector(".player--1").classList.add(".player--active");
    else {
      //switch to next player
      switchPlayer();
      // document.querySelector(".player--0").classList.add(".player--active");
    }
  }
});

resetGame.addEventListener("click", init);