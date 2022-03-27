import { BLOCKS } from './blocks.js';
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
const gameText = document.querySelector('.game-text');
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
            const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
            const isAvailable = this.checkEmpty(target);
            if (isAvailable) {
                target.classList.add(type, 'moving');
            }
            else {
                this.tempMovingItem = Object.assign({}, movingItem);
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
    deleteBlocksFromPrevPosition(type) {
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
        movingItem.type = blockArray[randomIndex][0];
        movingItem.top = 0;
        movingItem.left = 3;
        movingItem.direction = 0;
        this.tempMovingItem = Object.assign({}, movingItem);
        this.renderBlocks();
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
    showGameoverText() {
        gameText.style.display = 'flex';
    }
    hideGameoverText() {
        gameText.style.display = 'none';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2pzL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBYSxNQUFNLGFBQWEsQ0FBQztBQUVoRCxNQUFNLFVBQVUsR0FBc0U7SUFDcEYsSUFBSSxFQUFFLE1BQU07SUFDWixTQUFTLEVBQUUsQ0FBQztJQUNaLEdBQUcsRUFBRSxDQUFDO0lBQ04sSUFBSSxFQUFFLENBQUM7Q0FDUixDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUc7SUFDWCxJQUFJLEVBQUUsV0FBVztJQUNqQixFQUFFLEVBQUUsU0FBUztJQUNiLEtBQUssRUFBRSxZQUFZO0lBQ25CLElBQUksRUFBRSxXQUFXO0lBQ2pCLEtBQUssRUFBRSxPQUFPO0lBQ2QsS0FBSyxFQUFFLE9BQU87Q0FDTixDQUFDO0FBRVgsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBbUIsQ0FBQztBQUNoRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBbUIsQ0FBQztBQUN4RSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBb0IsQ0FBQztBQUN6RSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBb0IsQ0FBQztBQUN6RSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBbUIsQ0FBQztBQUUzRSxNQUFNLE9BQU8sTUFBTTtJQVdqQjtRQVZRLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUNsQixp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