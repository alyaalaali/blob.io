# Blob.io

# Date: 7/7/25

### By Alya Ahmed Alaali

---

[Linkedin](http://linkedin.com) |
[Github](http://Github.com)

### _Description_

#### Blob is a silly game where you roam around a tropical island, and collect seashells before the clock hits zero.

### _Victory_

#### Winning requires finding the rare blue seashell, it has only a 2% chance of appearing on the board. Good luck!

#### You can play the game on:

---

### _Technologies Used_

- **Languages:** HTML, CSS, JavaScript
- **Graphics:** Aseprite (for visuals and animation)

---

### _WireFrames_

![Image](./Images/Wireframes.png)

---

### _Favorite Function_

My favorite function is the `keyPress` function, which handles character movement. The simple implementation and the resulting silly character movements were very satisfying to create.

```js
const keyPress = (e) => {
  switch (e.key) {
    case keys.up:
      if (squarePosition.x > 0) {
        squarePosition.x--
      }
      character.src = gifs.back

      break
    case keys.down:
      if (squarePosition.x < 8) {
        squarePosition.x++
      }
      character.src = gifs.front
      break
    case keys.left:
      if (squarePosition.y > 0) {
        squarePosition.y--
      }
      character.src = gifs.left
      break
    case keys.right:
      if (squarePosition.y < 8) {
        squarePosition.y++
      }
      character.src = gifs.right
      break
  }
  updateSquare()
}
```

### _Unsolved Issues_

- **High Score Display:** The high score displays as NaN in Google Chrome.

### _Future Improvements_

- Adding sound effects and background music.
- adding different levels or game modes.
