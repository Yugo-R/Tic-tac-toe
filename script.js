const startGame = document.querySelector('[data-startGame]');
const display = document.querySelector('.gridContent');
const modalWin = document.querySelector('.playerWin');
const playAgain = document.getElementById('tryAgain');
const overlay = document.querySelector('.overlay');

let stateGame = (function(){
    const playerOne = document.querySelector('#playerOne');
    const playerTwo = document.querySelector('#playerTwo');

    let boardGame = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]

    let counter = 0;

    let sign = '';

    let nextTurn = () =>{
        if(sign == ''){
            sign = 'O';
            playerTwo.style.backgroundColor = '#dba879';
            playerOne.style.backgroundColor = '';
            return sign
            
        }
        else{
            if(sign == 'O'){
                sign = 'X';
                playerOne.style.backgroundColor = '#dba879';
                playerTwo.style.backgroundColor = '';
                return sign
            }
            else{
                sign = 'O'
                playerTwo.style.backgroundColor = '#dba879';
                playerOne.style.backgroundColor = '';
                return sign;
            }
        }
    }

    let checkWinner = (ele) =>{
        //Insert new value to the 2d array
        let pos = ele.split(',').map(x => parseInt(x));
        sign == 'O'? boardGame[pos[0]][pos[1]] = 1 : boardGame[pos[0]][pos[1]] = -1;
        counter += 1;
        //Check horizontal line
        let hor = boardGame[pos[0]].reduce((accumulator,currentValue) =>{
            return accumulator + currentValue;
        });
        if(hor == 3 || hor == -3){
            return hor
        };
        //Check vertical line
        let vert = 0;
        for(let i=0; i < boardGame.length; i++){
            vert += boardGame[i][pos[1]];
            if(vert == 3 || vert == -3){
                return vert;
            }
        }
        let diagOne = boardGame[0][0] + boardGame[1][1] + boardGame[2][2];
        let diagTwo = boardGame[2][0] + boardGame[1][1] + boardGame[0][2];

        //Check diagonal line
        if(diagOne == 3 || diagOne == -3){
            return diagOne;
        }
        if(diagTwo == 3 || diagTwo == -3){
            return diagTwo;
        }

        //Check draw
        if(counter == 9){
            return counter;
        } 

        return;
    }

    let resetBoard = ()=>{
        boardGame = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]

        counter = 0;

        sign = '';

        playerOne.style.backgroundColor = '#dba879';
        playerTwo.style.backgroundColor = '';
    }

    return {nextTurn, checkWinner, resetBoard};
    
})();

startGame.addEventListener('click', (e) =>{
    //Move title to the top
    let header = document.querySelector(e.target.dataset.startgame);
    header.style.top = '5%';
    header.style.left = 0;
    header.style.transform = "translate(0%,0%)";
    header.style.marginTop = '10px';
    e.target.style.display = 'none';

    //When animation of title end show display
    header.addEventListener('transitionend', ()=>{
        let playerDisplay = document.getElementsByClassName('playerDisplay')[0];
        playerDisplay.style.opacity = '1';
        gameStart();
        stateGame.resetBoard();
    });
});

display.addEventListener('transitionend',()=>{
    display.addEventListener('click', (e)=>{
        if(e.target.className == 'grid active'){
            if(!e.target.innerText){
                e.target.innerText = stateGame.nextTurn();
                let result = stateGame.checkWinner(e.target.dataset.pos);
                if(result == 3 || result == -3 || result == 9){
                    playerWinner(result);
                };
                
            }
            else{
                return;
            }
        }
    })
});

playAgain.addEventListener('click', ()=>{
    modalWin.classList.remove('active');
    overlay.classList.remove('active');
    stateGame.resetBoard();
    let grid = [...document.getElementsByClassName('grid')];
    grid.forEach(ele =>{
        ele.innerText = "";
    });
});

function gameStart(){
    let gridContent = [...document.getElementsByClassName('gridContent')];
    let grid = [...document.getElementsByClassName('grid')];
    gridContent[0].classList.add('active');
    grid.forEach(ele =>{
        ele.classList.add('active');
    });
}

function playerWinner(player){
    modalWin.classList.add('active');
    overlay.classList.add('active');
    if(player == 3){
        document.getElementById('winMessage').innerText = 'Player 1 won !';
    }
    else if(player == -3){
        document.getElementById('winMessage').innerText = 'Player 2 won !';
    }
    else{
        document.getElementById('winMessage').innerText = "It's a draw !";
    }
}