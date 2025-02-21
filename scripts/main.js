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
  if (n > 0) {
    n = move(n, false)
    player.style.top = n + 'px'
  }
}
function goDown() {
  rotate(180)
  let n = removePx(getComputedStyle(player).top)
  if (n < 450) {
    n = move(n)
    player.style.top = n + 'px'
  }
}
function goLeft() {
  rotate(-90)
  let n = removePx(getComputedStyle(player).left)
  if (n > 0) {
    n = move(n, false)
    player.style.left = n + 'px'
  }
}
function goRight() {
  rotate(90)
  let n = removePx(getComputedStyle(player).left)
  if (n < 450) {
    n = move(n)
    player.style.left = n + 'px'
  }
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

function move(n, plus = true) {
  if (plus) {
    return (n += 10)
  }
  return (n -= 10)
}

function blockUp() {
  console.log('block up')
}
