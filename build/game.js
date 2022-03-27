import { BLOCKS } from './blocks.js';
import * as screen from './screen.js';
const movingItem = {
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
};
const playground = document.querySelector('.playground > ul');
const scoreDisplay = document.querySelector('.score');
const levelDisplay = document.querySelector('.level');
const restartButton = document.querySelector('.restart');
export class Tetris {
    constructor() {
        this.GAME_ROWS = 20;
        this.GAME_COLS = 10;
        this.score = 0;
        this.level = 1;
        this.maxLevel = 15;
        this.duration = 1500;
        this.minDuration = 100;
        this.downInterval = 1;
        this.tempMovingItem = Object.assign({}, movingItem);
        this.restart();
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
    restart() {
        restartButton.addEventListener('click', () => {
            playground.innerHTML = '';
            screen.hideGameoverText();
            this.init();
        });
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
    renderBlocks(moveType = '', { type, direction, top, left } = this.tempMovingItem) {
        this.deleteBlocksFromPrevPosition(type);
        BLOCKS[type][direction].some((block) => {
            const x = block[0] + left;
            const y = block[1] + top;
            const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
            const isAvailable = this.checkEmpty(target);
            if (isAvailable) {
                target.classList.add(type, 'moving');
            }
            else {
                this.tempMovingItem = Object.assign({}, movingItem);
                if (moveType === 'retry') {
                    this.gameOver();
                }
                else {
                    setTimeout(() => {
                        this.renderBlocks('retry');
                        if (moveType === 'top') {
                            this.seizeBlock();
                        }
                    }, 0);
                }
                return true;
            }
        });
        Object.assign(movingItem, { left, top, direction });
    }
    gameOver() {
        clearInterval(this.downInterval);
        screen.showGameoverText();
    }
    deleteBlocksFromPrevPosition(type) {
        const movingBlocks = document.querySelectorAll('.moving');
        movingBlocks.forEach((moving) => moving.classList.remove(type, 'moving'));
    }
    seizeBlock() {
        const movingBlocks = document.querySelectorAll('.moving');
        movingBlocks.forEach((moving) => {
            moving.classList.remove('moving');
            moving.classList.add('seized');
        });
        this.checkMatch();
    }
    checkMatch() {
        const childNodes = playground.childNodes;
        childNodes.forEach((child) => {
            let matched = true;
            child.children[0].childNodes.forEach((li) => {
                if (!li.classList.contains('seized')) {
                    matched = false;
                }
            });
            if (matched) {
                child.remove();
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
    generateNewBlock() {
        clearInterval(this.downInterval);
        this.downInterval = setInterval(() => {
            this.moveBlock('top', 1);
        }, this.duration);
        const blockArray = Object.entries(BLOCKS);
        const randomIndex = Math.floor(Math.random() * blockArray.length);
        Object.assign(movingItem, { type: blockArray[randomIndex][0], top: 0, left: 3, direction: 0 });
        this.tempMovingItem = Object.assign({}, movingItem);
        this.renderBlocks();
    }
    upgradeSpeed() {
        this.duration <= this.minDuration ? (this.duration = this.minDuration) : (this.duration -= 100);
        clearInterval(this.downInterval);
    }
    upgradeLevel() {
        const calcLevel = this.maxLevel - this.duration / 100;
        this.level++; // = this.duration > this.minDuration ? calcLevel === 0 ? 1 : this.maxLevel;
    }
    checkEmpty(target) {
        if (!target || target.classList.contains('seized'))
            return false;
        else
            return true;
    }
    moveBlock(moveType, amount) {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2pzL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBYSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEtBQUssTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUV0QyxNQUFNLFVBQVUsR0FBc0U7SUFDcEYsSUFBSSxFQUFFLE1BQU07SUFDWixTQUFTLEVBQUUsQ0FBQztJQUNaLEdBQUcsRUFBRSxDQUFDO0lBQ04sSUFBSSxFQUFFLENBQUM7Q0FDUixDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUc7SUFDWCxJQUFJLEVBQUUsV0FBVztJQUNqQixFQUFFLEVBQUUsU0FBUztJQUNiLEtBQUssRUFBRSxZQUFZO0lBQ25CLElBQUksRUFBRSxXQUFXO0lBQ2pCLEtBQUssRUFBRSxPQUFPO0lBQ2QsS0FBSyxFQUFFLE9BQU87Q0FDTixDQUFDO0FBRVgsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBbUIsQ0FBQztBQUNoRixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBb0IsQ0FBQztBQUN6RSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBb0IsQ0FBQztBQUN6RSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBbUIsQ0FBQztBQUUzRSxNQUFNLE9BQU8sTUFBTTtJQVdqQjtRQVZRLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUNsQixpQkFBWSxHQUFXLENBQUMsQ0FBQztR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