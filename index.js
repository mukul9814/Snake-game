// game constants & variables
let inputDir = { x: 0, y: 0 };
const eatingsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('movesound.mp3');
const musicsound = new Audio('gamemusic.mp3');
let speed = 10;
let lastPaintTime = 0;
let Score = 0;
let snakeArr = [
    { x: 11, y: 14 }
]
snakefood = { x: 6, y: 7 };

//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    musicsound.play();
}

function whenCollide(snarr) {
    //crash with your self
    for (let index = 1; index < snakeArr.length; index++) {
        if (snarr[index].x === snarr[0].x && snarr[index].y === snarr[0].y) {
            return true;
        }
    }

    if (snarr[0].x >= 18 || snarr[0].x <= 0 || snarr[0].y >= 18 || snarr[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // update snake array
    if (whenCollide(snakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert(`Opp's Game Over. press Ok to restart`);
        snakeArr = [{ x: 11, y: 14 }];
        Score = 0;

    }
    // increment the score and regenrating food
    if (snakeArr[0].y === snakefood.y && snakeArr[0].x === snakefood.x) {
        eatingsound.play();
        Score += 1;
        if (Score > HighScorel) {
            HighScorel = Score;
            localStorage.setItem('HighScore', JSON.stringify(HighScorel));
            highscoremitter.innerHTML = 'HighScore:' + HighScorel;
        }
        scoremitter.innerHTML = 'score:' + Score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 17;
        snakefood = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snakebody');
        }

        board.appendChild(snakeElement);
    });

    //display food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = snakefood.y;
    foodElement.style.gridColumnStart = snakefood.x;
    foodElement.classList.add('snakefood')
    board.appendChild(foodElement);
}

















//main logic
let HighScore = localStorage.getItem('HighScore');
if (HighScore === null) {
    HighScorel = 0;
    localStorage.setItem('HighScore', JSON.stringify(HighScorel))
}
else {
    HighScorel = JSON.parse(HighScore);
    highscoremitter.innerHTML = 'HighScore:' + HighScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    // start game
    movesound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp')
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log('ArrowDown')
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft')
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight')
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});