let boxes = document.querySelectorAll(".box");
let gameInfo = document.querySelector(".game-info");
let newGameBtn = document.querySelector(".btn");

let currrentPlayer;
let gameGrid;

const winPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initGame();
function initGame(){
    console.log(boxes);
    currrentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // Render Things on the user interface
    newGameBtn.classList.remove("active");
    boxes.forEach((box,index)=>{
        box.style.pointerEvents = "all";
        box.innerText = "";
        box.classList = `box box${index+1}`;
    });

    gameInfo.innerText =  `Current Player - ${currrentPlayer}`;
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText = currrentPlayer;
        gameGrid[index] = currrentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver(index);
    }
}

function swapTurn(){
    if(currrentPlayer==="X"){
        currrentPlayer = "0";
    }
    else
    {
        currrentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currrentPlayer}`;
}

function checkGameOver(index){
    let ans = "";
    winPositions.forEach((position)=>{
        if((gameGrid[position[0]]=="0" && gameGrid[position[1]]=="0" && gameGrid[position[2]]=="0") ||
        (gameGrid[position[0]]=="X" && gameGrid[position[1]]=="X" && gameGrid[position[2]]=="X")){
            if(gameGrid[position[0]]=="X"){
                ans = "X";
            }
            else
            {
                ans = "0";
            }
            //when we got our winner disable all pointer
            // events on each cell in tic tac toe
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            });
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
        
    });

    // We got the winner in our game
    if(ans!=""){
        newGameBtn.classList.add("active");
        gameInfo.innerText = `Winner - ${ans}`;
        return;
    }

    // Check if the game is tied 
    let cellsFilledCount = 0;
    gameGrid.forEach((box)=>{
        if(box!="")
            cellsFilledCount++;
    });
    if(cellsFilledCount==9){
        gameInfo.innerText = `Game Tied!!`;
        newGameBtn.classList.add("active");
        return
    }
};

newGameBtn.addEventListener("click",initGame);
