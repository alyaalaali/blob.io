const grid = document.querySelector(".grid")
let circle = document.createElement("div")
let userSquare = document.createElement("div")
//
position = { x: 0, y: 0 }
squarePosition = { x: 12, y: 6 }
ballPosition = { x: 0, y: 0 }
//
const makeGrid = () => {
  let gridWidth = 13
  let gridHeight = 13
  for (let x = 0; x < gridHeight; x++) {
    for (let y = 0; y < gridWidth; y++) {
      let square = document.createElement("div")
      square.className = "square"
      grid.appendChild(square)
    }
  }
}

const placeBall = () => {
  position
  let firstSquare = document.querySelector(".square")
  circle.classList.add("ball")
  firstSquare.appendChild(circle)
}

const placeSquare = () => {
  position.x = squarePosition.x
  position.y = squarePosition.y

  let squares = document.querySelectorAll(".square")

  const index = position.x * 13 + position.y

  if (index >= 0 && index < squares.length) {
    userSquare.classList.add("userSquare")
    squares[index].appendChild(userSquare)
  }
}

makeGrid()
placeBall()
placeSquare()
