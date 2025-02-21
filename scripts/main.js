const app = document.getElementById('app')
const player = document.getElementById('player')

document.body.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowUp':
      goUp()
      break
    case 'ArrowDown':
      goDown()
      break
    case 'ArrowLeft':
      goLeft()
      break
    case 'ArrowRight':
      goRight()
      break
    case 'Space':
      shoot()
      break
  }
})

function goUp() {
  rotate(0)
  let n = removePx(getComputedStyle(player).top)
  n -= 10
  player.style.top = n + 'px'
}
function goDown() {
  rotate(180)
  let n = removePx(getComputedStyle(player).top)
  n += 10
  player.style.top = n + 'px'
}
function goLeft() {
  rotate(-90)
  let n = removePx(getComputedStyle(player).left)
  n -= 10
  player.style.left = n + 'px'
}
function goRight() {
  rotate(90)
  let n = removePx(getComputedStyle(player).left)
  n += 10
  player.style.left = n + 'px'
}
function shoot() {
  console.log('shoot')
}

function removePx(n) {
  return +n.slice(0, -2)
}

function rotate(deg) {
  player.style.transform = `rotate(${deg}deg)`
}
