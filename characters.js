document.querySelector(".sillyGuy").addEventListener("click", () => {
  localStorage.setItem("selectedCharacter", "guyGifs")
})

document.querySelector(".shark").addEventListener("click", () => {
  localStorage.setItem("selectedCharacter", "sharkGifs")
})
