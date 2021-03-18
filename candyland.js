const boardLength = 20;
let currPlayer = 1;
let board = new Map();

function createHtmlBoard(){
    let boardInDom = document.querySelector('#board');
    let boardTable = document.createElement('table');
    boardInDom.append(boardTable);
    let spaceId = 0;
    for(let row = 0; row < 5; row++){
        currRow = document.createElement('tr');
        for(let column = 0; column < 4; column++){
            let currSpace = document.createElement('td');
            currSpace.classList.add('space');
            if(row%2 === 1){
                currSpace.setAttribute('id', `space_${spaceId + (3 - (2*column))}`)
            }
            else{
                currSpace.setAttribute('id', `space_${spaceId}`)
            }
            spaceId++
            currRow.append(currSpace);
        }
        boardTable.append(currRow);
    }
}

function addDirectionClass(spaces, direction){
    for(space of spaces){
        space.classList.add(`${direction}`);
    }
}

function addDirections(){
    let rights = [document.querySelector('#space_1'), document.querySelector('#space_8'), document.querySelector('#space_16')];
    let downs = [document.querySelector('#space_3'), document.querySelector('#space_7'), document.querySelector('#space_11'), document.querySelector('#space_15')]
    let lefts = [document.querySelector('#space_4'), document.querySelector('#space_12')];
    
    addDirectionClass(rights, 'right');
    addDirectionClass(downs, 'down');
    addDirectionClass(lefts, 'left');
}

function setPlayerCount(){
    return document.querySelector('#player-count').value;
}

function createPieces(){
    let playerCount = setPlayerCount();
    for(let player = 1; player <= playerCount; player++){
        playerPiece = document.createElement('div');
        playerPiece.classList.add('piece');
        playerPiece.setAttribute('id', `p${player}`);
        document.querySelector('#space_0').append(playerPiece);
        board.set(player, 0);
    }
}

function roll(){
    return Math.ceil(Math.random()*6);
}

function updateCurrPlayerDom(){
    let playerRecord = document.querySelector('#current-player')
    playerRecord.innerText = currPlayer;
}

function movePieceHtml(){
    let currPiece = document.querySelector(`#p${currPlayer}`);
    let formerSpace = currPiece.parentElement;
    let newSpace = document.querySelector(`#space_${board.get(currPlayer)}`);
    formerSpace.removeChild(currPiece);
    newSpace.append(currPiece);
}

function movePiece(){
    let spacesMoved = roll();
    let rollResults = document.createElement('p');
    let rollHistory = document.querySelector('#roll-history');
    rollResults.innerText = `Player ${currPlayer} rolled a ${spacesMoved}.`
    rollHistory.append(rollResults);
    board.set(currPlayer, board.get(currPlayer) + spacesMoved);
    movePieceHtml();
    if(currPlayer === 1){
        currPlayer = 2;
    }
    else if(currPlayer === 2 && board.get(3) !== undefined){
        currPlayer = 3;
    }
    else if(currPlayer === 3 && board.get(4) !== undefined){
        currPlayer = 4;
    }
    else{
        currPlayer = 1;
    }
    updateCurrPlayerDom();
}

createHtmlBoard();
addDirections();
document.querySelector('#start-game').addEventListener('click', function(e){
    e.preventDefault();
    createPieces();
    updateCurrPlayerDom();
})

document.querySelector('#roll').addEventListener('click', function(e){
    e.preventDefault();
    movePiece();
})