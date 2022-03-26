const movingItem = {
  type: 'tree',
  direction: 3,
  top: 0,
  left: 0,
};

// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const gameText = document.querySelector('.game-text');

export default class Field {
  #playground = document.querySelector('.playground > ul');
  #GAME_ROWS = 20;
  #GAME_COLS = 10;

  constructor() {
    restartButton.addEventListener('click', () => {
      playground.innerHTML = '';
      hideGameoverText();
      init();
    });
  }

  init() {
    tempMovingItem = { ...movingItem };

    for (let i = 0; i < this.#GAME_ROWS; i++) {
      this.prependNewLine();
    }
    this.generateNewBlock();
  }

  prependNewLine() {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    for (let j = 0; j < this.#GAME_COLS; j++) {
      const matrix = document.createElement('li');
      ul.prepend(matrix);
    }
    li.prepend(ul);
    this.#playground.prepend(li);
  }

  generateNewBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
      moveBlock('top', 1);
    }, duration);

    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);

    movingItem.type = blockArray[randomIndex][0];
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = { ...movingItem };
    renderBlocks();
  }

  showGameoverText() {
    gameText.style.display = 'flex';
  }

  hideGameoverText() {
    gameText.style.display = 'none';
  }
}
