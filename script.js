const gameContainer = document.querySelector(".game-general");
const timeValue = document.getElementById("time");
const stopButton = document.getElementById("stop");
const result = document.getElementById("result");
const startButton = document.getElementById("start");
const controls = document.querySelector(".controls-container");
const moves = document.getElementById("moves-count");
let tiles;
let interval;
let activeTile = false;
let secondTile = false;

const pictures = [
  { name: "bishop", image: "./assets/bishop.jpg" },
  { name: "king", image: "./assets/king.jpg" },
  { name: "knight", image: "./assets/knight.jpg" },
  { name: "pawny", image: "./assets/pawny.jpg" },
  { name: "queen", image: "./assets/queen.jpg" },
  { name: "rook", image: "./assets/rook.jpg" },
 
];


const generateRandom = (size = 4) => {
   
    let tempList = [...pictures];
   
    let cardValues = [];
   
    size = (size * 3) / 2;
   
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempList.length);
      cardValues.push(tempList[randomIndex]);
     
      tempList.splice(randomIndex, 1);
    }
    return cardValues;
  };

let seconds = 0,
  minutes = 0;

let movesCount = 0,
  winCount = 0;

const timeGenerator = () => {
  seconds += 1;
 
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};


const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  
  cardValues.sort(() => Math.random());
  for (let i = 0; i < size * 3; i++) {
   
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">*</div>
        <div class="tile-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
 
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};
  
  gameContainer.style.gridTemplateColumns = `repeat(${4},auto)`;
  
  tiles = document.querySelectorAll(".card-container");
  tiles.forEach((card) => {
    card.addEventListener("click", () => {
     
      if (!card.classList.contains("matched")) {
       
        card.classList.add("flipped");
       
        if (!activeTile) {
         
          activeTile = card;
         
          activeTileValue = card.getAttribute("data-card-value");
        } else {
         
          movesCounter();
        
          secondTile = card;
          let secondTileValue = card.getAttribute("data-card-value");
          if (activeTileValue == secondTileValue) {
          
            activeTile.classList.add("matched");
            secondTile.classList.add("matched");
          
            activeTile = false;
          
            winCount += 1;
          
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
          
            let [tempFirst, tempSecond] = [activeTile, secondTile];
            activeTile= false;
            secondTile = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;

  controls.classList.add("finish");
  stopButton.classList.remove("finish");
  startButton.classList.add("finish");
 
  interval = setInterval(timeGenerator, 1000);
 
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom(4);
  console.log(cardValues);
  matrixGenerator(cardValues,4);
};
stopButton.addEventListener(
    "click",
    (stopGame = () => {
      controls.classList.remove("finish");
      stopButton.classList.add("finish");
      startButton.classList.remove("finish");
      clearInterval(interval);
    })
  );