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
  console.log('up')
}
function goDown() {
  console.log('down')
}
function goLeft() {
  console.log('left')
}
function goRight() {
  console.log('right')
}
function shoot() {
  console.log('shoot')
}
