document.querySelector(".sillyGuy").addEventListener("click", () => {
  sessionStorage.setItem("selectedCharacter", "guyGifs")
})

document.querySelector(".shark").addEventListener("click", () => {
  sessionStorage.setItem("selectedCharacter", "sharkGifs")
})
