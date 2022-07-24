function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const avatar = document.querySelector("#player");
const coin = document.querySelector("#coin");
const colCoins = document.querySelector("#colCoins");
const increase = 50;
let totalCoins = 0;
window.addEventListener("keyup", function (e) {
  const currTop = extractPos(avatar.style.top);
  const currLeft = extractPos(avatar.style.left);
  if (e.key === "ArrowDown" || e.key === "Down") {
    avatar.style.transform = "scale(1,1)";
    avatar.style.top = `${currTop + increase}px`;
  } else if (e.key === "ArrowUp" || e.eky === "Up") {
    avatar.style.transform = "scale(1,-1)";
    avatar.style.top = `${currTop - increase}px`;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    avatar.style.transform = "scale(-1,1)";
    avatar.style.left = `${currLeft - increase}px`;
  } else if (e.key === "ArrowRight" || e.eky === "Right") {
    avatar.style.transform = "scale(1,1)";
    avatar.style.left = `${currLeft + increase}px`;
  }

  if (isTouching(avatar, coin)) {
    totalCoins++;
    //	colCoins.innerText='';
    //	colCoins.innerText=totalCoins;
    console.log(totalCoins);
    moveCoin();
  }

  console.log(e.key);
});

const extractPos = (pos) => {
  if (!pos) return 10;
  return parseInt(pos.slice(0, -2));
};

const moveCoin = () => {
  const posTop = Math.floor(Math.random() * window.innerHeight);
  const posLeft = Math.floor(Math.random() * window.innerWidth);
  coin.style.left = `${posLeft}px`;
  coin.style.top = `${posTop}px`;
};

moveCoin();

console.log("Asad");
