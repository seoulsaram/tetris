import { BLOCKS, ShapeType } from './blocks.js';

const movingItem: { type: ShapeType; direction: number; top: number; left: number } = {
  type: 'tree',
  direction: 3,
  top: 0,
  left: 0,
};

const KEYS = {
  LEFT: 'ArrowLeft',
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  ENTER: 'Enter',
  SPACE: 'Space',
} as const;

const playground = document.querySelector('.playground > ul') as HTMLDivElement;
const gameText = document.querySelector('.game-text') as HTMLDivElement;
const scoreDisplay = document.querySelector('.score') as HTMLSpanElement;
const levelDisplay = document.querySelector('.level') as HTMLSpanElement;
const restartButton = document.querySelector('.restart') as HTMLDivElement;

export class Tetris {
  private GAME_ROWS = 20;
  private GAME_COLS = 10;
  private score = 0;
  private level = 1;
  private maxLevel = 15;
  private duration = 1500;
  private minDuration = 100;
  private downInterval: number = 1;
  private tempMovingItem: typeof movingItem = { ...movingItem };

  constructor() {
    restartButton.addEventListener('click', () => {
      playground.innerHTML = '';
      this.hideGameoverText();
      this.init();
    });

    document.addEventListener('keydown', ({ code }) => {
      switch (code) {
        case KEYS.LEFT:
          this.moveBlock('left', -1);
          break;
        case KEYS.RIGHT:
          this.moveBlock('left', 1);
          break;
        case KEYS.UP:
          this.changeDirection();
          break;
        case KEYS.DOWN:
          this.moveBlock('top', 1);
          break;
        case KEYS.SPACE:
          this.dropBlock();
          break;
        default:
          return;
      }
    });
  }

  init() {
    for (let i = 0; i < this.GAME_ROWS; i++) {
      this.prependNewLine();
    }
    this.generateNewBlock();
  }

  prependNewLine() {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    for (let j = 0; j < this.GAME_COLS; j++) {
      const matrix = document.createElement('li');
      ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
  }

  renderBlocks(moveType = '') {
    const { type, direction, top, left } = this.tempMovingItem;
    this.deleteBlocksFromPrevPosition(type);
    BLOCKS[type][direction].some((block) => {
      const x = block[0] + left;
      const y = block[1] + top;
      const target = playground.childNodes[y] ? (playground.childNodes[y].childNodes[0].childNodes[x] as HTMLElement) : null;
      const isAvailable = this.checkEmpty(target);

      if (isAvailable) {
        target!.classList.add(type, 'moving');
      } else {
        this.tempMovingItem = { ...movingItem };
        //재귀함수 호출 시 콜스택 맥시멈,exceed 에러가 발생할 수 있음
        //이벤트 루프 안에 넣지 않고, 테스크 큐에 넣어놨다가 이벤트루프 모두 실행 후 실행될 수 있도록 함
        if (moveType === 'retry') {
          return;
          clearInterval(this.downInterval);
          this.showGameoverText();
        }
        setTimeout(() => {
          this.renderBlocks('retry');
          if (moveType === 'top') {
            this.seizeBlock();
          }
        }, 0);
        return true;
      }
    });
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
  }

  deleteBlocksFromPrevPosition(type: string) {
    const movingBlocks = document.querySelectorAll('.moving');
    movingBlocks.forEach((moving) => {
      moving.classList.remove(type, 'moving');
    });
  }

  seizeBlock() {
    const movingBlocks = document.querySelectorAll('.moving');
    movingBlocks.forEach((moving) => {
      moving.classList.remove('moving');
      moving.classList.add('seized');
    });
    this.checkMatch();
  }

  generateNewBlock() {
    clearInterval(this.downInterval);
    this.downInterval = setInterval(() => {
      this.moveBlock('top', 1);
    }, this.duration);
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    movingItem.type = blockArray[randomIndex][0] as ShapeType;
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    this.tempMovingItem = { ...movingItem };
    this.renderBlocks();
  }

  checkMatch() {
    const childNodes = playground.childNodes;
    childNodes.forEach((child: any) => {
      let matched = true;
      child.children[0].childNodes.forEach((li: any) => {
        if (!li.classList.contains('seized')) {
          matched = false;
        }
      });
      if (matched) {
        child.remove();
        console.log('prependNewLine');
        this.prependNewLine();
        this.score++;
        this.upgradeSpeed();
        this.upgradeLevel();
        scoreDisplay.innerText = this.score.toString();
        levelDisplay.innerText = this.level.toString();
      }
    });
    this.generateNewBlock();
  }

  upgradeSpeed() {
    this.duration <= this.minDuration ? (this.duration = this.minDuration) : (this.duration -= 100);
    console.log(this.duration);
    clearInterval(this.downInterval);
  }

  upgradeLevel() {
    const calcLevel = this.maxLevel - this.duration / 100;
    this.level++; // = this.duration > this.minDuration ? calcLevel === 0 ? 1 : this.maxLevel;
  }

  checkEmpty(target: any) {
    if (!target || target.classList.contains('seized')) return false;
    else return true;
  }
  moveBlock(moveType: 'top' | 'left', amount: number) {
    this.tempMovingItem[moveType] += amount;
    this.renderBlocks(moveType);
  }
  changeDirection() {
    const direction = this.tempMovingItem.direction;
    direction === 3 ? (this.tempMovingItem.direction = 0) : (this.tempMovingItem.direction += 1);
    this.renderBlocks();
  }
  dropBlock() {
    clearInterval(this.downInterval);
    this.downInterval = setInterval(() => {
      this.moveBlock('top', 1);
    }, 10);
  }

  showGameoverText() {
    gameText.style.display = 'flex';
  }

  hideGameoverText() {
    gameText.style.display = 'none';
  }
}
