//DOM
const playground = document.querySelector('.playground > ul');
const gameText = document.querySelector('.game-text');
const scoreDisplay = document.querySelector('.score');
const restartButton = document.querySelector('.restart');
//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;
const KEYS = {
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    ENTER: 'Enter',
    SPACE: 'Space',
};
// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
const movingItem = {
    type: 'tree',
    direction: 3,
    top: 0,
    left: 0,
};
export {};
// init();
// function init() {
//   tempMovingItem = { ...movingItem };
//   for (let i = 0; i < GAME_ROWS; i++) {
//     prependNewLine();
//   }
//   generateNewBlock();
// }
// 테트리스 블록 10 * 20 생성
// function prependNewLine() {
//   const li = document.createElement('li');
//   const ul = document.createElement('ul');
//   for (let j = 0; j < GAME_COLS; j++) {
//     const matrix = document.createElement('li');
//     ul.prepend(matrix);
//   }
//   li.prepend(ul);
//   playground.prepend(li);
// }
// function renderBlocks(moveType = '') {
//   const { type, direction, top, left } = tempMovingItem;
//   const movingBlocks = document.querySelectorAll('.moving');
//   movingBlocks.forEach((moving) => {
//     moving.classList.remove(type, 'moving');
//   });
//   BLOCKS[type][direction].some((block) => {
//     const x = block[0] + left;
//     const y = block[1] + top;
//     const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
//     const isAvailable = checkEmpty(target);
//     if (isAvailable) {
//       target.classList.add(type, 'moving');
//     } else {
//       tempMovingItem = { ...movingItem };
//       //재귀함수 호출 시 콜스택 맥시멈,exceed 에러가 발생할 수 있음
//       //이벤트 루프 안에 넣지 않고, 테스크 큐에 넣어놨다가 이벤트루프 모두 실행 후 실행될 수 있도록 함
//       if (moveType === 'retry') {
//         clearInterval(downInterval);
//         showGameoverText();
//       }
//       setTimeout(() => {
//         renderBlocks('retry');
//         if (moveType === 'top') {
//           seizeBlock();
//         }
//       }, 0);
//       return true;
//     }
//   });
//   movingItem.left = left;
//   movingItem.top = top;
//   movingItem.direction = direction;
// }
// function showGameoverText() {
//   gameText.style.display = 'flex';
// }
// function hideGameoverText() {
//   gameText.style.display = 'none';
// }
// function seizeBlock() {
//   const movingBlocks = document.querySelectorAll('.moving');
//   movingBlocks.forEach((moving) => {
//     moving.classList.remove('moving');
//     moving.classList.add('seized');
//   });
//   checkMatch();
// }
// function checkMatch() {
//   const childNodes = playground.childNodes;
//   let test;
//   childNodes.forEach((child) => {
//     let matched = true;
//     child.children[0].childNodes.forEach((li) => {
//       if (!li.classList.contains('seized')) {
//         matched = false;
//       }
//     });
//     if (matched) {
//       child.remove();
//       prependNewLine();
//       score++;
//       scoreDisplay.innerText = score;
//     }
//   });
//   generateNewBlock();
// }
// function generateNewBlock() {
//   clearInterval(downInterval);
//   downInterval = setInterval(() => {
//     moveBlock('top', 1);
//   }, duration);
//   const blockArray = Object.entries(BLOCKS);
//   const randomIndex = Math.floor(Math.random() * blockArray.length);
//   movingItem.type = blockArray[randomIndex][0];
//   movingItem.top = 0;
//   movingItem.left = 3;
//   movingItem.direction = 0;
//   tempMovingItem = { ...movingItem };
//   renderBlocks();
// }
// function checkEmpty(target) {
//   if (!target || target.classList.contains('seized')) return false;
//   else return true;
// }
// function moveBlock(moveType, amount) {
//   tempMovingItem[moveType] += amount;
//   renderBlocks(moveType);
// }
// function changeDirection() {
//   const direction = tempMovingItem.direction;
//   direction === 3 ? (tempMovingItem.direction = 0) : (tempMovingItem.direction += 1);
//   renderBlocks();
// }
// function dropBlock() {
//   clearInterval(downInterval);
//   downInterval = setInterval(() => {
//     moveBlock('top', 1);
//   }, 10);
// }
//event handling
// document.addEventListener('keydown', ({ code }) => {
//   switch (code) {
//     case KEYS.LEFT:
//       moveBlock('left', -1);
//       break;
//     case KEYS.RIGHT:
//       moveBlock('left', 1);
//       break;
//     case KEYS.UP:
//       changeDirection();
//       break;
//     case KEYS.DOWN:
//       moveBlock('top', 1);
//       break;
//     case KEYS.SPACE:
//       dropBlock();
//       break;
//     default:
//       return;
//   }
// });
// restartButton.addEventListener('click', () => {
//   playground.innerHTML = '';
//   hideGameoverText();
//   init();
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV0cmlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vanMvdGV0cmlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLEtBQUs7QUFDTCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDOUQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN0RCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFekQsU0FBUztBQUNULE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDckIsTUFBTSxJQUFJLEdBQUc7SUFDWCxJQUFJLEVBQUUsV0FBVztJQUNqQixFQUFFLEVBQUUsU0FBUztJQUNiLEtBQUssRUFBRSxZQUFZO0lBQ25CLElBQUksRUFBRSxXQUFXO0lBQ2pCLEtBQUssRUFBRSxPQUFPO0lBQ2QsS0FBSyxFQUFFLE9BQU87Q0FDZixDQUFDO0FBRUYsWUFBWTtBQUNaLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNkLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNuQixJQUFJLFlBQVksQ0FBQztBQUNqQixJQUFJLGNBQWMsQ0FBQztBQUVuQixNQUFNLFVBQVUsR0FBRztJQUNqQixJQUFJLEVBQUUsTUFBTTtJQUNaLFNBQVMsRUFBRSxDQUFDO0lBQ1osR0FBRyxFQUFFLENBQUM7SUFDTixJQUFJLEVBQUUsQ0FBQztDQUNSLENBQUM7O0FBRUYsVUFBVTtBQUVWLG9CQUFvQjtBQUNwQix3Q0FBd0M7QUFFeEMsMENBQTBDO0FBQzFDLHdCQUF3QjtBQUN4QixNQUFNO0FBQ04sd0JBQXdCO0FBQ3hCLElBQUk7QUFFSixxQkFBcUI7QUFDckIs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