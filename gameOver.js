let finalScoreDisp = document.querySelector("#finalScore")
let highScoreDisp = document.querySelector(".highScore")
let gameOverDisp = document.querySelector(".gameOverMsg")

const checkScore = () => {
  let finalScore = localStorage.getItem("finalScore")
  let highScore = localStorage.getItem("highScore")
  const wonGame = sessionStorage.getItem("wonGame")

  if (finalScore) {
    finalScoreDisp.innerHTML = `score: ${finalScore}`
  }
  if (highScore) {
    highScoreDisp.innerHTML = `HighScore: ${highScore}`
  }
  if (wonGame) {
    gameOverDisp.innerHTML = `You won!!`
  }
}

checkScore()
