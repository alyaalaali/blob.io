let finalScoreDisp = document.getElementById("finalScore")
let highScoreDisp = document.querySelector(".highScore")

const checkScore = () => {
  let finalScore = localStorage.getItem("finalScore")
  let highScore = localStorage.getItem("highScore")

  if (finalScore) {
    finalScoreDisp.innerHTML = `score: ${finalScore}`
  }
  if (highScore) {
    highScoreDisp.innerHTML = `High Score: ${highScore}`
  }
}

checkScore()
