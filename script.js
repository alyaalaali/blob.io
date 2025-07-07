const grid = document.querySelector(".grid")
let circle = document.createElement("img")
let userSquare = document.createElement("img")
let scoreDisplay = document.querySelector(".score")
let timerDisplay = document.querySelector(".timer")
let highScoreDisp = document.querySelector(".highScore")
let gameOverMsg = document.querySelector(".gameOverMsg")
//
let highScore = localStorage.getItem("highScore")
let selectedCharacter = localStorage.getItem("selectedCharacter")
//
position = { x: 0, y: 0 }
squarePosition = { x: 8, y: 4 }
ballPosition = { x: 0, y: 0 }
let gridWidth = 9
let gridHeight = 9
let score = 0
let gameOn = false
let timer = 8
let countTimer
let teleportBall = null
let hiScore = parseInt(highScore)
let won = false
//

const makeGrid = () => {
  for (let x = 0; x < gridHeight; x++) {
    for (let y = 0; y < gridWidth; y++) {
      let square = document.createElement("div")
      square.className = "square"
      grid.appendChild(square)
      // square.innerHTML = `${x} ${y}`
    }
  }
}

const seashells = {
  blue: "../Images/blueseashell.png",
  regular: "../Images/seashell.png",
}

const placeBall = () => {
  if (!gameOn) {
    return
  }
  const currentBall = document.querySelector(".ball")
  if (currentBall) {
    currentBall.remove()
  }

  ballPosition.x = Math.floor(Math.random() * gridHeight)
  ballPosition.y = Math.floor(Math.random() * gridWidth)
  let squares = document.querySelectorAll(".square")
  const index = ballPosition.x * gridWidth + ballPosition.y
  if (index >= 0 && index < squares.length) {
    circle.classList.add("ball")

    let num = Math.floor(Math.random() * 3) + 1
    if (num === 25 || num === 3) {
      circle.src = seashells.blue
    } else {
      circle.src = seashells.regular
    }
    squares[index].appendChild(circle)
  }
}

const stopBall = () => {
  clearInterval(teleportBall)
}

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
    // userSquare.src = characterGifs[selectedCharacter].front
    squares[index].appendChild(userSquare)
  }
}

const updateSquare = () => {
  placeSquare()
  checkOverlap()
}

const characterGifs = {
  guyGifs: {
    right: "../characters/SillyGuy/LeftGuy.gif",
    left: "../characters/SillyGuy/RightGuy.gif",
    front: "../characters/SillyGuy/FrontGuy.gif",
    back: "../characters/SillyGuy/BackGuy.gif",
  },
  sharkGifs: {
    right: "../characters/Shark/LeftShark.gif",
    left: "../characters/Shark/RightShark.gif",
    front: "../characters/Shark/FrontShark.gif",
    back: "../characters/Shark/BackShark.gif",
  },
}

const keys = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  space: " ",
}

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
}

const checkOverlap = () => {
  if (
    squarePosition.x === ballPosition.x &&
    squarePosition.y === ballPosition.y
  ) {
    let seashellImg = document.querySelector(".ball")
    if (seashellImg.src.includes("blueseashell.png")) {
      score++
      won = true
      // alert("we have a winner!")
      endGame()
      return
    }
    score++
    printScore()
    placeBall()
  }
}

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
}

const initiateGame = () => {
  startTimer()
  gameOn = true
  placeBall()
  teleportBall = setInterval(placeBall, 1500)
}

const endGame = () => {
  stopBall()
  clearInterval(countTimer)
  // alert("game Over! final score is: " + score)
  gameOn = false
  window.removeEventListener("keydown", keyPress)
  checkHighScore()
  localStorage.setItem("finalScore", score)
  localStorage.setItem("highScore", hiScore)
  sessionStorage.setItem("wonGame", won)

  window.location.href = "./gameOver.html"
  checkScore()
  won = false
}

const checkHighScore = () => {
  if (score > hiScore) {
    hiScore = score
    printHighScore()
    localStorage.setItem("highScore", hiScore)
  }
}

const printHighScore = () => {
  highScoreDisp.innerHTML = `High Score: ${hiScore}`
}

document.addEventListener("keydown", (e) => {
  if (keys.space === " " && !gameOn) {
    initiateGame()
  }
})
const createBoard = () => {
  makeGrid()
  placeSquare()
  printHighScore()
  userSquare.src = characterGifs[selectedCharacter].front
}

createBoard()
window.addEventListener("keydown", keyPress)

//sites used
//intervals:
//https://www.w3schools.com/jsref/met_win_setinterval.asp
//key movements:
//https://stackoverflow.com/questions/58162481/move-element-in-a-grid-layout-with-arrow-keys
