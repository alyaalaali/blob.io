const grid = document.querySelector(".grid")
let circle = document.createElement("div")
let userSquare = document.createElement("div")
//
position = { x: 0, y: 0 }
squarePosition = { x: 12, y: 6 }
ballPosition = { x: 0, y: 0 }
let gridWidth = 13
let gridHeight = 13
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
  const squares = document.querySelectorAll(".square")
  squares.forEach((square) => {
    square.innerHTML = ""
  })
  // placeBall()
  placeSquare()
}

const keys = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
}

const keyPress = (e) => {
  switch (e.key) {
    case keys.up:
      if (squarePosition.x < 0) {
        squarePosition.x = 12
      }
      squarePosition.x--
      break
    case keys.down:
      if (squarePosition.x > 12) {
        squarePosition.x = 0
      }
      squarePosition.x++
      break
    case keys.left:
      if (squarePosition.y < 0) {
        squarePosition.y = 12
      }
      squarePosition.y--
      break
    case keys.right:
      if (squarePosition.y > 12) {
        squarePosition.y = 0
      }
      squarePosition.y++
      break
  }
  updateSquare()
} // took a very small code snippet from https://stackoverflow.com/questions/58162481/move-element-in-a-grid-layout-with-arrow-keys

window.addEventListener("keydown", keyPress)

makeGrid()
placeBall()
const teleportBall = setInterval(placeBall, 2000)
//https://www.w3schools.com/jsref/met_win_setinterval.asp used setinterval from this site
placeSquare()
