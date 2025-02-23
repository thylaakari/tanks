const app = document.getElementById('app')
const player = document.getElementById('player')
const btnstart = document.getElementById('btnstart')
for (let i = 1; i < 5; i++) {
  const enemy = document.createElement('div')
  enemy.classList.add('enemy')
  enemy.style.left = Math.floor(Math.random() * 450) + 'px'
  enemy.style.top = Math.floor(Math.random() * 450) + 'px'
  enemy.style.background = `url(./sprites/enemy${i}.jpg) center center no-repeat`
  enemy.style.backgroundSize = 'cover'
  app.appendChild(enemy)
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
// function shoot() {
//   const bullet = document.createElement('div')
//   bullet.classList.add('bullet')
//   const playerTop = removePx(getComputedStyle(player).top)
//   const playerLeft = removePx(getComputedStyle(player).left)
//   const bulletOffset = 22
//   const playerSize = 44

//   switch (side()) {
//     case 'up':
//       bullet.style.top = playerTop + 'px'
//       bullet.style.left = playerLeft + bulletOffset + 'px'
//       break
//     case 'right':
//       bullet.style.top = playerTop + bulletOffset + 'px'
//       bullet.style.left = playerLeft + playerSize + 'px'
//       break
//     case 'down':
//       bullet.style.top = playerTop + playerSize + 'px'
//       bullet.style.left = playerLeft + bulletOffset + 'px'
//       break
//     case 'left':
//       bullet.style.top = playerTop + bulletOffset + 'px'
//       bullet.style.left = playerLeft + 'px'
//       break
//     default:
//       bullet.style.top = '-10px'
//       break
//   }
//   app.appendChild(bullet)
//   switch (side()) {
//     case 'up':
//       bullet.style.top = '0px'
//       bullet.style.transition = 'all .3s ease-in-out'
//       break
//     case 'right':
//       bullet.style.left = '500px'
//       bullet.style.transition = 'all .3s ease-in-out'
//       break
//     case 'down':
//       bullet.style.top = '500px'
//       bullet.style.transition = 'all .3s ease-in-out'
//       break
//     case 'left':
//       bullet.style.left = '0px'
//       bullet.style.transition = 'all .3s ease-in-out'
//       break
//     default:
//       break
//   }
//   setTimeout(() => {
//     app.removeChild(bullet)
//   }, 2000)
// }

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

function checkCollision(bullet, enemy) {
  const bulletRect = bullet.getBoundingClientRect()
  const enemyRect = enemy.getBoundingClientRect()

  return !(
    bulletRect.right < enemyRect.left ||
    bulletRect.left > enemyRect.right ||
    bulletRect.bottom < enemyRect.top ||
    bulletRect.top > enemyRect.bottom
  )
}

function shoot() {
  const bullet = document.createElement('div')
  bullet.classList.add('bullet')
  const playerTop = removePx(getComputedStyle(player).top)
  const playerLeft = removePx(getComputedStyle(player).left)
  const bulletOffset = 22
  const playerSize = 44

  // Определяем направление и начальную позицию
  const direction = side()
  let startTop, startLeft, velocityX, velocityY

  switch (direction) {
    case 'up':
      startTop = playerTop
      startLeft = playerLeft + bulletOffset
      velocityX = 0
      velocityY = -5 // Движение вверх
      break
    case 'right':
      startTop = playerTop + bulletOffset
      startLeft = playerLeft + playerSize
      velocityX = 5 // Движение вправо
      velocityY = 0
      break
    case 'down':
      startTop = playerTop + playerSize
      startLeft = playerLeft + bulletOffset
      velocityX = 0
      velocityY = 5 // Движение вниз
      break
    case 'left':
      startTop = playerTop + bulletOffset
      startLeft = playerLeft
      velocityX = -5 // Движение влево
      velocityY = 0
      break
  }

  bullet.style.top = startTop + 'px'
  bullet.style.left = startLeft + 'px'
  app.appendChild(bullet)

  // Функция для движения пули
  function moveBullet() {
    // Проверяем, существует ли пуля в DOM
    if (!bullet.parentElement) {
      return // Если пуля уже удалена, прекращаем выполнение
    }

    // Обновляем позицию пули
    let currentTop = removePx(bullet.style.top)
    let currentLeft = removePx(bullet.style.left)
    bullet.style.top = currentTop + velocityY + 'px'
    bullet.style.left = currentLeft + velocityX + 'px'

    // Проверяем столкновения с врагами
    document.querySelectorAll('.enemy').forEach((enemy) => {
      if (checkCollision(bullet, enemy)) {
        // Удаляем врага, если он существует в DOM
        if (enemy.parentElement) {
          app.removeChild(enemy)
        }
        // Удаляем пулю, если она существует в DOM
        if (bullet.parentElement) {
          app.removeChild(bullet)
        }
        return // Прекращаем движение пули
      }
    })

    // Удаляем пулю, если она вышла за границы игрового поля
    if (
      currentTop < 0 ||
      currentTop > 500 ||
      currentLeft < 0 ||
      currentLeft > 500
    ) {
      if (bullet.parentElement) {
        app.removeChild(bullet)
      }
      return // Прекращаем движение пули
    }

    // Продолжаем движение, если пуля еще в пределах поля
    requestAnimationFrame(moveBullet)
  }

  // Запускаем движение пули
  moveBullet()
}
