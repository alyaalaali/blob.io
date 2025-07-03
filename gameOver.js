let finalScoreDisp = document.getElementById("finalScore")
const checkScore = () => {
  let finalScore = localStorage.getItem("finalScore")
  if (finalScore) {
    finalScoreDisp.innerHTML = `score: ${finalScore}`
  }
}

window.addEventListener("onload", checkScore)
