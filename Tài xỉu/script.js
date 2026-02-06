const diceEls = [
  document.getElementById("dice1"),
  document.getElementById("dice2"),
  document.getElementById("dice3")
];
const diceGroup = document.getElementById("diceGroup");
const resultText = document.getElementById("resultText");
const btnTai = document.getElementById("btnTai");
const btnXiu = document.getElementById("btnXiu");
let isRolling = false;
function randomDice() {
  return Math.floor(Math.random() * 6) + 1;
}
function startRoll() {
  if (isRolling) return;
  isRolling = true;
  btnTai.disabled = true;
  btnXiu.disabled = true;
  resultText.textContent = "ĐANG LẮC...";
  diceGroup.classList.add("rolling");
  const fakeRoll = setInterval(() => {
    diceEls.forEach(dice => {
      const temp = randomDice();
      dice.src = `img/dice${temp}.png`;
    });
  }, 100);
  setTimeout(() => {
    clearInterval(fakeRoll);
    finishRoll();
  }, 2000);
}
function finishRoll() {
  diceGroup.classList.remove("rolling");
  let total = 0;
  let results = [];
  diceEls.forEach(dice => {
    const value = randomDice();
    results.push(value);
    total += value;
    dice.src = `img/dice${value}.png`;
  });
  const isTai = total >= 11;
    playWinSound();
  resultText.innerHTML = `
    <span style="color:${isTai ? 'red' : 'lime'}">
      ${isTai ? "TÀI" : "XỈU"} • ${total}
    </span>
  `;
  btnTai.disabled = false;
  btnXiu.disabled = false;
  isRolling = false;
}
btnTai.addEventListener("click", startRoll);
btnXiu.addEventListener("click", startRoll);
const bgMusic = document.getElementById("bgMusic");
const soundToggle = document.getElementById("soundToggle");
const winSound = document.getElementById("winSound");
let soundOn = false;
document.body.addEventListener("click", () => {
  if (!soundOn) {
    bgMusic.volume = 0.4;
    bgMusic.play();
    soundOn = true;
    soundToggle.textContent = "🔊";
  }
}, { once: true });
soundToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  if (bgMusic.paused) {
    bgMusic.play();
    soundToggle.textContent = "🔊";
  } else {
    bgMusic.pause();
    soundToggle.textContent = "🔇";
  }
});
function playWinSound() {
  if (!soundOn) return;
  bgMusic.pause();
  winSound.currentTime = 0;
  winSound.volume = 1;
  winSound.play();
  winSound.onended = () => {
    bgMusic.play();
  };
}