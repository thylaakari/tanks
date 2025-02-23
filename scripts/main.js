const appElement = document.getElementById('app')
const playerElement = document.getElementById('player')
const startButton = document.getElementById('btnstart')

for (let i = 1; i < 5; i++) {
  const enemyElement = document.createElement('div')
  enemyElement.classList.add('enemy')
  enemyElement.style.top = `${Math.floor(Math.random() * 450)}px`
  enemyElement.style.left = `${Math.floor(Math.random() * 450)}px`
  enemyElement.style.background = `url(./sprites/enemy${i}.jpg) center center no-repeat`
  enemyElement.style.backgroundSize = 'cover'
  appElement.appendChild(enemyElement)
}

document.body.addEventListener('keydown', handleKeydown)

function handleKeydown(event) {
  const actions = {
    ArrowUp: moveUp,
    ArrowDown: moveDown,
    ArrowLeft: moveLeft,
    ArrowRight: moveRight,
    Space: shootBullet,
  }

  if (actions.hasOwnProperty(event.code)) {
    actions[event.code]()
  }
}

function checkCollision(element1, element2) {
  const element1Rect = element1.getBoundingClientRect()
  const element2Rect = element2.getBoundingClientRect()

  return !(
    element1Rect.right < element2Rect.left ||
    element1Rect.left > element2Rect.right ||
    element1Rect.bottom < element2Rect.top ||
    element1Rect.top > element2Rect.bottom
  )
}

function checkPlayerCollision(newTop, newLeft) {
  const playerSize = 44
  const playerRect = {
    top: newTop,
    left: newLeft,
    right: newLeft + playerSize,
    bottom: newTop + playerSize,
  }

  let collision = false
  appElement.querySelectorAll('.wall').forEach((wall) => {
    const wallRect = wall.getBoundingClientRect()

    if (
      playerRect.right > wallRect.left &&
      playerRect.left < wallRect.right &&
      playerRect.bottom > wallRect.top &&
      playerRect.top < wallRect.bottom
    ) {
      collision = true
    }
  })

  return collision
}

function moveUp() {
  rotate(0)
  let topPosition = getComputedStyle(playerElement).top
  const newTop = parseInt(topPosition, 10) - 10
  if (
    newTop >= 0 &&
    !checkPlayerCollision(newTop, getComputedStyle(playerElement).left)
  ) {
    playerElement.style.top = `${newTop}px`
  }
}

function moveDown() {
  rotate(180)
  let topPosition = getComputedStyle(playerElement).top
  const newTop = parseInt(topPosition, 10) + 10
  if (
    newTop <= 450 &&
    !checkPlayerCollision(newTop, getComputedStyle(playerElement).left)
  ) {
    playerElement.style.top = `${newTop}px`
  }
}

function moveLeft() {
  rotate(-90)
  let leftPosition = getComputedStyle(playerElement).left
  const newLeft = parseInt(leftPosition, 10) - 10
  if (
    newLeft >= 0 &&
    !checkPlayerCollision(getComputedStyle(playerElement).top, newLeft)
  ) {
    playerElement.style.left = `${newLeft}px`
  }
}

function moveRight() {
  rotate(90)
  let leftPosition = getComputedStyle(playerElement).left
  const newLeft = parseInt(leftPosition, 10) + 10
  if (
    newLeft <= 450 &&
    !checkPlayerCollision(getComputedStyle(playerElement).top, newLeft)
  ) {
    playerElement.style.left = `${newLeft}px`
  }
}

function rotate(deg) {
  playerElement.style.transform = `rotate(${deg}deg)`
}

function move(position, increase = true) {
  const step = 10
  return increase ? position + step : position - step
}

function shootBullet() {
  const bulletElement = document.createElement('div')
  bulletElement.classList.add('bullet')
  const playerTop = getComputedStyle(playerElement).top
  const playerLeft = getComputedStyle(playerElement).left
  const bulletOffset = 22
  const playerSize = 44

  const direction = getDirection()
  let startTop, startLeft, velocityX, velocityY

  switch (direction) {
    case 'up':
      startTop = parseInt(playerTop, 10)
      startLeft = parseInt(playerLeft, 10) + bulletOffset
      velocityX = 0
      velocityY = -5
      break
    case 'right':
      startTop = parseInt(playerTop, 10) + bulletOffset
      startLeft = parseInt(playerLeft, 10) + playerSize
      velocityX = 5
      velocityY = 0
      break
    case 'down':
      startTop = parseInt(playerTop, 10) + playerSize
      startLeft = parseInt(playerLeft, 10) + bulletOffset
      velocityX = 0
      velocityY = 5
      break
    case 'left':
      startTop = parseInt(playerTop, 10) + bulletOffset
      startLeft = parseInt(playerLeft, 10)
      velocityX = -5
      velocityY = 0
      break
  }

  bulletElement.style.top = `${startTop}px`
  bulletElement.style.left = `${startLeft}px`
  appElement.appendChild(bulletElement)

  function moveBullet() {
    if (!bulletElement.parentElement) {
      return
    }

    let currentTop = parseInt(bulletElement.style.top, 10)
    let currentLeft = parseInt(bulletElement.style.left, 10)
    bulletElement.style.top = `${currentTop + velocityY}px`
    bulletElement.style.left = `${currentLeft + velocityX}px`

    appElement.querySelectorAll('.enemy').forEach((enemy) => {
      if (checkCollision(bulletElement, enemy)) {
        if (enemy.parentElement) {
          appElement.removeChild(enemy)
        }
        if (bulletElement.parentElement) {
          appElement.removeChild(bulletElement)
        }
        return
      }
    })

    appElement.querySelectorAll('.wall').forEach((wall) => {
      if (checkCollision(bulletElement, wall)) {
        if (bulletElement.parentElement) {
          appElement.removeChild(bulletElement)
        }
        return
      }
    })

    if (
      currentTop < 0 ||
      currentTop > 500 ||
      currentLeft < 0 ||
      currentLeft > 500
    ) {
      if (bulletElement.parentElement) {
        appElement.removeChild(bulletElement)
      }
      return
    }

    requestAnimationFrame(moveBullet)
  }

  moveBullet()
}

function getDirection() {
  const playerTransform = getComputedStyle(playerElement).transform
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
