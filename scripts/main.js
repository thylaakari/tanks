const app = document.getElementById('app')
const player = document.getElementById('player')
const btnstart = document.getElementById('btnstart')
btnstart.onclick = () => {
  const enemiescount = +document.getElementById('enemiescount').value
  for (let i = 1; i < enemiescount + 1; i++) {
    const enemy = document.createElement('div')
    enemy.classList.add('enemy')
    enemy.style.left = Math.floor(Math.random() * 450) + 'px'
    enemy.style.top = Math.floor(Math.random() * 450) + 'px'
    enemy.style.background = `url(./sprites/enemy${i}.jpg) center center no-repeat`
    enemy.style.backgroundSize = 'cover'
    app.appendChild(enemy)
  }
}

document.body.addEventListener('keydown', handleKeydown)

function handleKeydown(event) {
  const actions = {
    ArrowUp: goUp,
    ArrowDown: goDown,
    ArrowLeft: goLeft,
    ArrowRight: goRight,
    Space: shoot,
  }

  if (actions.hasOwnProperty(event.code)) {
    actions[event.code]()
  }
}

function goUp() {
  rotate(0)
  let topPosition = removePx(getComputedStyle(player).top)
  if (topPosition > 0) {
    topPosition = move(topPosition, false)
    player.style.top = topPosition + 'px'
  }
}
function goDown() {
  rotate(180)
  let topPosition = removePx(getComputedStyle(player).top)
  if (topPosition < 450) {
    topPosition = move(topPosition)
    player.style.top = topPosition + 'px'
  }
}
function goLeft() {
  rotate(-90)
  let leftPosition = removePx(getComputedStyle(player).left)
  if (leftPosition > 0) {
    leftPosition = move(leftPosition, false)
    player.style.left = leftPosition + 'px'
  }
}
function goRight() {
  rotate(90)
  let leftPosition = removePx(getComputedStyle(player).left)
  if (leftPosition < 450) {
    leftPosition = move(leftPosition)
    player.style.left = leftPosition + 'px'
  }
}
function shoot() {
  const bullet = document.createElement('div')
  bullet.classList.add('bullet')
  const playerTop = removePx(getComputedStyle(player).top)
  const playerLeft = removePx(getComputedStyle(player).left)
  const bulletOffset = 22
  const playerSize = 44

  switch (side()) {
    case 'up':
      bullet.style.top = playerTop + 'px'
      bullet.style.left = playerLeft + bulletOffset + 'px'
      break
    case 'right':
      bullet.style.top = playerTop + bulletOffset + 'px'
      bullet.style.left = playerLeft + playerSize + 'px'
      break
    case 'down':
      bullet.style.top = playerTop + playerSize + 'px'
      bullet.style.left = playerLeft + bulletOffset + 'px'
      break
    case 'left':
      bullet.style.top = playerTop + bulletOffset + 'px'
      bullet.style.left = playerLeft + 'px'
      break
    default:
      bullet.style.top = '-10px'
      break
  }
  app.appendChild(bullet)
  switch (side()) {
    case 'up':
      bullet.style.top = '0px'
      bullet.style.transition = 'all .3s ease-in-out'
      break
    case 'right':
      bullet.style.left = '500px'
      bullet.style.transition = 'all .3s ease-in-out'
      break
    case 'down':
      bullet.style.top = '500px'
      bullet.style.transition = 'all .3s ease-in-out'
      break
    case 'left':
      bullet.style.left = '0px'
      bullet.style.transition = 'all .3s ease-in-out'
      break
    default:
      break
  }
  setTimeout(() => {
    app.removeChild(bullet)
  }, 2000)
}

function removePx(value) {
  return Number(value.slice(0, -2))
}

function rotate(deg) {
  player.style.transform = `rotate(${deg}deg)`
}

function move(position, increase = true) {
  const step = 10
  return increase ? position + step : position - step
}

function side() {
  const playerTransform = getComputedStyle(player).transform
  switch (playerTransform) {
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
