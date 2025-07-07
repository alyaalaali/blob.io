document.querySelector(".sillyGuy").addEventListener("click", () => {
  sessionStorage.setItem("selectedCharacter", "guyGifs")
})

document.querySelector(".shark").addEventListener("click", () => {
  sessionStorage.setItem("selectedCharacter", "sharkGifs")
})
// event listeners that keeps track of the character selected by the user and stores its value in session storage to be transferred to the next page
