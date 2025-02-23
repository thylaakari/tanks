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
  const bullet = document.createElement('div')
  bullet.classList.add('bullet')
  switch (side()) {
    case 'up':
      bullet.style.top = removePx(getComputedStyle(player).top) + 'px'
      bullet.style.left = removePx(getComputedStyle(player).left) + 22 + 'px'
      break
    case 'right':
      bullet.style.top = removePx(getComputedStyle(player).top) + 22 + 'px'
      bullet.style.left = removePx(getComputedStyle(player).left) + 44 + 'px'
      break
    case 'down':
      bullet.style.top = removePx(getComputedStyle(player).top) + 44 + 'px'
      bullet.style.left = removePx(getComputedStyle(player).left) + 22 + 'px'
      break
    case 'left':
      bullet.style.top = removePx(getComputedStyle(player).top) + 22 + 'px'
      bullet.style.left = removePx(getComputedStyle(player).left) + 'px'
      break
    default:
      bullet.style.top = `-10px`
      break
  }
  app.appendChild(bullet)
  switch (side()) {
    case 'up':
      bullet.style.top = '0px'
      bullet.style.transition = 'all 2s ease-in-out'
      break
    case 'right':
      bullet.style.left = '450px'
      bullet.style.transition = 'all 2s ease-in-out'
      break
    case 'down':
      bullet.style.top = '450px'
      bullet.style.transition = 'all 2s ease-in-out'
      break
    case 'left':
      bullet.style.left = '0px'
      bullet.style.transition = 'all 2s ease-in-out'
      break
    default:
      break
  }
  setTimeout(() => {
    app.removeChild(bullet)
  }, 2000)
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

function side() {
  switch (getComputedStyle(player).transform) {
    case 'matrix(1, 0, 0, 1, 0, 0)':
      return 'up'
    case 'matrix(0, 1, -1, 0, 0, 0)':
      return 'right'
    case 'matrix(-1, 0, 0, -1, 0, 0)':
      return 'down'
    case 'matrix(0, -1, 1, 0, 0, 0)':
      return 'left'
    default:
      return 'up'
  }
}
