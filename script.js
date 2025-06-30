const grid = document.querySelector(".grid")
let circle = document.createElement("div")

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
  let firstSquare = document.querySelector(".square")
  firstSquare.appendChild(circle)
  circle.classList.add("character")
}

makeGrid()
placeBall()
