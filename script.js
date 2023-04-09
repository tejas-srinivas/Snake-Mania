const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
let cordX , cordY;
let snakeX =10, snakeY=5;
let velocityX = 0,velocityY=0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score=0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    // passing random values from 0 - 30 as food position
    cordX = Math.floor(Math.random()*30) + 1;
    cordY = Math.floor(Math.random()*30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!! Press OK to restart");
    location.reload();
}

const changeDirection = (e) => {
    // changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY !=1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    } else if(e.key === "ArrowLeft" && velocityX !=1){
        velocityX = -1;
        velocityY = 0;
    }
}

const initGame = () => {
    if(gameOver){
        return handleGameOver();
    }
    let htmlMarkup = `<div class="food" style="grid-area: ${cordY} / ${cordX}"></div>`;
    
    if(snakeX == cordX && snakeY == cordY){
        changeFoodPosition();
        snakeBody.push([cordX,cordY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score",highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    //Increasing the body of the snake after its eats food...
    for(let i= snakeBody.length - 1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY];
    //updating snake's head position...
    snakeX += velocityX;
    snakeY += velocityY;

    //check if snake's head touched the wall...
    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30){
        gameOver = true;
    }

    for(let i=0;i<snakeBody.length;i++){
        //Adding div part for each part of the snake's body...
        htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        //Checking if snake head hit its own body, if so then restart the game...
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame,125);

document.addEventListener("keydown",changeDirection);