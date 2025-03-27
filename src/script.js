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
              result.innerHTML = `<h2 style="color: #ffffff">𝙈𝙞𝙨𝙨𝙞𝙤𝙣 𝘼𝙘𝙘𝙤𝙢𝙥𝙡𝙞𝙨𝙝𝙚𝙙 🏆🏅</h2>
            <h4 style="color: #fff">Your Moves: ${movesCount}</h4>`;
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
const backgroundMusic = document.getElementById('background-music');
const playPauseButton = document.getElementById('play-pause-music');

let isPlaying = false;

playPauseButton.addEventListener('click', () => {
  if (isPlaying) {
    backgroundMusic.pause();
    playPauseButton.textContent = 'Play Music';
  } else {
    backgroundMusic.play();
    playPauseButton.textContent = 'Pause Music';
  }
  isPlaying = !isPlaying;
});

startButton.addEventListener('click', () => {
  backgroundMusic.play();
  isPlaying = true;
  playPauseButton.textContent = 'Pause Music';
});

stopButton.addEventListener('click', () => {
  backgroundMusic.pause();
  isPlaying = false;
  playPauseButton.textContent = 'Play Music';
});



const themeToggle = document.getElementById('theme-toggle');
const sunIcon = themeToggle.querySelector('.fa-sun');
const moonIcon = themeToggle.querySelector('.fa-moon');
const body = document.body;

let isDarkMode = false;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  isDarkMode = !isDarkMode;
  updateThemeToggle();
});

function updateThemeToggle() {
  sunIcon.style.display = isDarkMode ? 'none' : 'block';
  moonIcon.style.display = isDarkMode ? 'block' : 'none';
}

// Set initial theme
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.add('dark-mode');
  isDarkMode = true;
  updateThemeToggle();
} else {
  body.classList.add('light-mode');
}

// music API
// let currentTrackIndex = 0;
//         let tracks = [];

//         async function fetchRandomMusic() {
//             const response = await fetch('YOUR_PUBLIC_API_ENDPOINT');
//             const data = await response.json();
//             tracks = data.tracks; // Adjust based on the API response structure
//             loadTrack(currentTrackIndex);
//         }

//         function loadTrack(index) {
//             const audio = document.getElementById('audio');
//             audio.src = tracks[index].preview_url; // Adjust based on the API response
//         }

//         document.getElementById('play').addEventListener('click', () => {
//             document.getElementById('audio').play();
//         });

//         document.getElementById('pause').addEventListener('click', () => {
//             document.getElementById('audio').pause();
//         });

//         document.getElementById('next').addEventListener('click', () => {
//             currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
//             loadTrack(currentTrackIndex);
//         });

//         document.getElementById('prev').addEventListener('click', () => {
//             currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
//             loadTrack(currentTrackIndex);
//         });

//         // Fetch random music on load
//         fetchRandomMusic();

async function fetchQuote() {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            document.getElementById('quote').innerText = `"${data.content}"`;
            document.getElementById('author').innerText = `— ${data.author}`;
        }

        document.getElementById('new-quote').addEventListener('click', fetchQuote);

        // Fetch the first quote on load
fetchQuote();
        


  async function drawCard() {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
            const data = await response.json();
            const card = data.cards[0];
            displayCard(card);
        }

        function displayCard(card) {
            const cardsContainer = document.getElementById('cards-container');
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.style.backgroundImage = `url(${card.image})`;
            cardDiv.innerText = `${card.value} of ${card.suit}`;
            cardsContainer.appendChild(cardDiv);
        }

document.getElementById('draw-card').addEventListener('click', drawCard);
        


async function drawCard() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    const data = await response.json();
    const card = data.cards[0];
    displayCard(card);
}

function displayCard(card) {
    const cardsContainer = document.getElementById('cards-container');
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.backgroundImage = `url(${card.image})`;
    cardDiv.innerText = `${card.value} of ${card.suit}`;
    cardsContainer.appendChild(cardDiv);
}

document.getElementById('draw-card').addEventListener('click', drawCard);



