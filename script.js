const grid = document.querySelector(".grid")
let circle = document.createElement("div")
let userSquare = document.createElement("div")
let scoreDisplay = document.querySelector(".score")
// let startGame = document.querySelector(".startGame")
let timerDisplay = document.querySelector(".timer")

//
position = { x: 0, y: 0 }
squarePosition = { x: 8, y: 4 }
ballPosition = { x: 0, y: 0 }
let gridWidth = 9
let gridHeight = 9
let score = 0
let gameOn = false
let timer = 10
let countTimer
let teleportBall = null
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
    squares[index].appendChild(userSquare)
  }
}

const updateSquare = () => {
  placeSquare()
  checkOverlap()
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
  switch (e.key) {
    case keys.up:
      if (squarePosition.x > 0) {
        squarePosition.x--
      }

      break
    case keys.down:
      if (squarePosition.x < 8) {
        squarePosition.x++
      }

      break
    case keys.left:
      if (squarePosition.y > 0) {
        squarePosition.y--
      }

      break
    case keys.right:
      if (squarePosition.y < 8) {
        squarePosition.y++
      }

      break
  }
  updateSquare()
}

const checkOverlap = () => {
  if (
    squarePosition.x === ballPosition.x &&
    squarePosition.y === ballPosition.y
  ) {
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
  // console.log("gameRuns!");
  // window.addEventListener("keydown", (e) => {

  startTimer()
  gameOn = true
  placeBall()
  teleportBall = setInterval(placeBall, 2500)
  // })
}

const endGame = () => {
  stopBall()
  clearInterval(countTimer)
  // alert("game Over! final score is: " + score)
  gameOn = false
  window.removeEventListener("keydown", keyPress)
  localStorage.setItem("finalScore", score)
  window.location.href = "./gameOver.html"
}

document.addEventListener("keydown", (e) => {
  if (keys.space === " " && !gameOn) {
    console.log("Space pressed")
    initiateGame()
  }
})
const createBoard = () => {
  makeGrid()
  placeSquare()
}

createBoard()
window.addEventListener("keydown", keyPress)

//sites used
//intervals:
//https://www.w3schools.com/jsref/met_win_setinterval.asp
//key movements:
//https://stackoverflow.com/questions/58162481/move-element-in-a-grid-layout-with-arrow-keys
