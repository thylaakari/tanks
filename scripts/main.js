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
  let n = removePx(getComputedStyle(player).top)
  n -= 10
  player.style.top = n + 'px'
}
function goDown() {
  let n = removePx(getComputedStyle(player).top)
  n += 10
  player.style.top = n + 'px'
}
function goLeft() {
  let n = removePx(getComputedStyle(player).left)
  n -= 10
  player.style.left = n + 'px'
}
function goRight() {
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
