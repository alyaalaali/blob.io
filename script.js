// query selections

const grid = document.querySelector(".grid")
let circle = document.createElement("img")
let userSquare = document.createElement("img")
let scoreDisplay = document.querySelector(".score")
let timerDisplay = document.querySelector(".timer")
let highScoreDisp = document.querySelector(".highScore")
let gameOverMsg = document.querySelector(".gameOverMsg")

// Local/session Storage

let highScore = localStorage.getItem("highScore")
let selectedCharacter = sessionStorage.getItem("selectedCharacter")

//Variables/Object initialization

let gridWidth = 9
let gridHeight = 9
let score = 0
let gameOn = false
let timer = 30
let countTimer
let teleportBall = null
let hiScore = parseInt(highScore)
let won = false

position = { x: 0, y: 0 }
squarePosition = { x: 8, y: 4 }
ballPosition = { x: 0, y: 0 }

const characterGifs = {
  guyGifs: {
    right: "../characters/LeftGuy.gif",
    left: "../characters/RightGuy.gif",
    front: "../characters/FrontGuy.gif",
    back: "../characters/BackGuy.gif",
  },
  sharkGifs: {
    right: "../characters/LeftShark.gif",
    left: "../characters/RightShark.gif",
    front: "../characters/FrontShark.gif",
    back: "../characters/BackShark.gif",
  },
}

const keys = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  space: " ",
}

const seashells = {
  blue: "../Images/blueseashell.png",
  regular: "../Images/seashell.png",
}

// Functions

const makeGrid = () => {
  for (let x = 0; x < gridHeight; x++) {
    for (let y = 0; y < gridWidth; y++) {
      let square = document.createElement("div")
      square.className = "square"
      grid.appendChild(square)
    }
  }
} // creates the grid by looping through x amount of width and height to create the squares

const placeBall = () => {
  if (!gameOn) {
    return
  }
  const currentBall = document.querySelector(".ball")
  if (currentBall) {
    currentBall.remove()
  } // this function places the "seashell" on the grid,first, it checks if there is an existing seashell on the grid first, then it removes it. Matj,random was used to generate random coordinates and uses an index number to determine which square to assign the seashell. function stops placing balls and exists if the game is not on

  ballPosition.x = Math.floor(Math.random() * gridHeight)
  ballPosition.y = Math.floor(Math.random() * gridWidth)
  let squares = document.querySelectorAll(".square")
  const index = ballPosition.x * gridWidth + ballPosition.y
  if (index >= 0 && index < squares.length) {
    circle.classList.add("ball")

    let num = Math.floor(Math.random() * 100) + 1
    if (num === 25 || num === 3) {
      circle.src = seashells.blue
    } else {
      circle.src = seashells.regular
    }
    squares[index].appendChild(circle)
  }
} //also made this function randomly generate a number between 1 and  100 and if 3 or 25 shows up (fav numbers), a rare seashell will be placed, otherwise, a regular one is placed.

const stopBall = () => {
  clearInterval(teleportBall)
} // clears the interval that teleports the seashell

const placeSquare = () => {
  const currentSquare = document.querySelector(".userSquare")
  if (currentSquare) {
    currentSquare.remove()
  }

  position.x = squarePosition.x
  position.y = squarePosition.y
  let squares = document.querySelectorAll(".square")
  const index = position.x * gridWidth + position.y
  if (index >= 0 && index < squares.length) {
    userSquare.classList.add("userSquare")
    squares[index].appendChild(userSquare)
  }
} // this is used to place the character on the grid, function operates similar to placeBall(),  and removes any existing character before placing a new one (in this case before it moves to the next square)

const updateSquare = () => {
  placeSquare()
  checkOverlap()
} // this function updates the character movement by calling placeSquare() to remove the existing character and place it in the new coordinates and calls checkOverlap() to check if it caught any seashells

const keyPress = (e) => {
  if (!gameOn) {
    return
  }

  const character = document.querySelector(".userSquare")
  const gifs = characterGifs[selectedCharacter]

  switch (e.key) {
    case keys.up:
      if (squarePosition.x > 0) {
        squarePosition.x--
      }
      character.src = gifs.back

      break
    case keys.down:
      if (squarePosition.x < 8) {
        squarePosition.x++
      }
      character.src = gifs.front
      break
    case keys.left:
      if (squarePosition.y > 0) {
        squarePosition.y--
      }
      character.src = gifs.left
      break
    case keys.right:
      if (squarePosition.y < 8) {
        squarePosition.y++
      }
      character.src = gifs.right
      break
  }
  updateSquare()
} // function that handles keyboard input, particularly arrows, it updates the characters x or y coordinates, also used this function to change the characters image to reflect its movement, and it calls updateSquare() to update the display

const checkOverlap = () => {
  if (
    squarePosition.x === ballPosition.x &&
    squarePosition.y === ballPosition.y
  ) {
    let seashellImg = document.querySelector(".ball")
    if (seashellImg.src.includes("blueseashell.png")) {
      score++
      won = true
      endGame()
      return
    }
    score++
    printScore()
    placeBall()
  }
} // this function checks if the character's position overlaps with the seashell position and increases its score, if the caught seashell is blue, it ends the game , otherwise it just keeps incrementing, updating the score and teleporting the seashell

const printScore = () => {
  scoreDisplay.innerHTML = `Score: ${score}`
}

const startTimer = () => {
  timerDisplay.innerHTML = `${timer}`

  countTimer = setInterval(() => {
    if (timer > 0) {
      timer--
    }
    timerDisplay.innerHTML = `${timer}`

    if (timer <= 0) {
      clearInterval(countTimer)
      endGame()
    }
  }, 1000)
} // starts a timer that decrements down the value from 30 each second

const initiateGame = () => {
  startTimer()
  gameOn = true
  placeBall()
  teleportBall = setInterval(placeBall, 1500)
} // this function initiates the game by starting the timer, and teleports the seashell

const endGame = () => {
  stopBall()
  clearInterval(countTimer)
  gameOn = false
  window.removeEventListener("keydown", keyPress)
  checkHighScore()
  sessionStorage.setItem("finalScore", score)
  localStorage.setItem("highScore", hiScore)
  sessionStorage.setItem("wonGame", won)

  window.location.href = "./gameOver.html"
  checkScore()
  won = false
} // stops the game and stores the game values in local/session storage to be transferred to the gameover page

const checkHighScore = () => {
  if (score > hiScore) {
    hiScore = score
    printHighScore()
    sessionStorage.setItem("highScore", hiScore)
  }
} // checks if the current score is higher than the highscore and updates its value in the session storage
// highscore shows as NaN all of a sudden, it worked at first, i didnt make any changes to the code, but it works fine if u open it in microsoft edge

const printHighScore = () => {
  highScoreDisp.innerHTML = `High Score: ${hiScore}`
} // prints the highscore on the page

document.addEventListener("keydown", (e) => {
  if (keys.space === " " && !gameOn) {
    initiateGame()
  }
}) // adds an event listener to the keys to initiate the game if its not on

const createBoard = () => {
  makeGrid()
  placeSquare()
  printHighScore()
  userSquare.src = characterGifs[selectedCharacter].right
} // this function sets the game structure as soon as the page loads

createBoard()
window.addEventListener("keydown", keyPress)

//sites used
//intervals:
//https://www.w3schools.com/jsref/met_win_setinterval.asp
//key movements:
//https://stackoverflow.com/questions/58162481/move-element-in-a-grid-layout-with-arrow-keys
