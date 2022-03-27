const gameText = document.querySelector('.game-text') as HTMLDivElement;

export function showGameoverText() {
  gameText.style.display = 'flex';
}

export function hideGameoverText() {
  gameText.style.display = 'none';
}
