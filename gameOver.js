let finalScoreDisp = document.querySelector("#finalScore")
let highScoreDisp = document.querySelector(".highScore")
let gameOverDisp = document.querySelector(".gameOverMsg")

const checkScore = () => {
  let finalScore = sessionStorage.getItem("finalScore")
  let highScore = localStorage.getItem("highScore")
  const wonGame = sessionStorage.getItem("wonGame")

  if (finalScore) {
    finalScoreDisp.innerHTML = `score: ${finalScore}`
  }
  if (highScore) {
    highScoreDisp.innerHTML = `HighScore: ${highScore}`
  }
  if (wonGame === "true") {
    gameOverDisp.innerHTML = `You won!!`
  } else if (wonGame === "false") {
    gameOverDisp.innerHTML = `Game Over! Well Played`
  }
}

checkScore()

// this is essentially used to transfer the score and high score from the board page to the gameover page
// as well as transfer the "won" value to determine wether the user won the game or not, couldnt use DOM directly on gameOverMsg in the script.js file for some reason? the game would just get stuck and not redirect to the next page because of it..
// also, high score displays NaN, i swear it worked at first and it suddenly stopped working, no idea why, tried parseInt, didnt work
// i opened the game in microsoft edge and it shows perfectly fine so i decided to keep it and not remove the code, as it must be a browser issue
// local/session storage was my nightmare fuel for the last couple days, it never works at first, then it works without me doing anything, then stops working again without doing anything again
