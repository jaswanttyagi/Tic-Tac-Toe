const playerinfo = document.querySelector(".player-info");
// this will tell us which player chnace
const gameinfo = document.querySelector(".game");
// all boxes
const boxes = document.querySelectorAll(".box");
const newgamebtn = document.querySelector(".btn");

// note--> boxes mtlb ui pr update krne ke liye hai
// and gamegird backend me boxes logic ke liye hai
let winnerpositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


let currentplayer;
let gamegrid;

// function to initialize the game
function initGame() {
    currentplayer = "x";
    gamegrid = ["", "", "", "", "", "", "", "", ""];
    // // UI pr bhi empty krna hai
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
         // when game is initilazed from starting then remove the green color from winning position
        box.classList.remove("win");
    });

    newgamebtn.classList.remove("active");
    playerinfo.innerText = `current Player - ${currentplayer.toUpperCase()}`;

}
initGame();



function handleClick(index) {
    // we check four things in handle click 
    //1.  if box is empty then we fill the box according to the user
    // 2. chnage player turn
    // 3. check ki player jeet toh nhi gya
    if (gamegrid[index] === "") {
        boxes[index].innerText = currentplayer;
        gamegrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
       
        swapTurn();
        // check gameOver or not
        checkGameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});
// function to change the player turn
function swapTurn() {
    if (currentplayer === "x") {
        currentplayer = "o";
        playerinfo.innerText = `current Player - ${currentplayer.toUpperCase()}`;
    } else {
        currentplayer = "x";
        playerinfo.innerText = `current Player - ${currentplayer.toUpperCase()}`;
    }
}

newgamebtn.addEventListener("click", initGame);
// function to check game is over or not
function checkGameOver() {
    let answer = "";
    // newgamebtn.classList.add("active");
    winnerpositions.forEach((position) => {
        // all 3 boxes should be non empty and same in value
        if (gamegrid[position[0]] != "" && gamegrid[position[1]] != "" && gamegrid[position[2]] != "" && gamegrid[position[0]] === gamegrid[position[1]] && gamegrid[position[1]] === gamegrid[position[2]]) {

            // check if winner is x
            if (gamegrid[position[0]] === "x") {
                answer = "x";
            }
            else {
                answer = "o";
            }
            boxes.forEach((box, index) => {
                boxes[index].style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
        //  showing the new game Btn
        if (answer != "") {
            playerinfo.innerText = `winner Player - ${answer.toUpperCase()}`;
            newgamebtn.classList.add("active");
        }
    })
    // if game is draw
    let fillcount = 0;
    boxes.forEach((box, index) => {
        if (gamegrid[index] != "") {
            fillcount++;
        }
        if (fillcount === 9 && answer == "") {
            playerinfo.innerText = "Game is Draw!";
            newgamebtn.classList.add("active");
        }
    })

}