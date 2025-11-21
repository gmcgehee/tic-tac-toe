
const board = document.getElementById('board');
let turnCount = 0
var boardState = [
                    ['', '', ''], // a3, b3, c3
                    ['', '', ''], // a2, b2, c2
                    ['', '', ''], // a1 b1, c1

                ]

function coordinateToIndex(coordinate) {
    /**
     * Convert a board coordinate (the id of an element) to an index
     * a3 -> [0][1]
     */

    const letterValues = {
        'a' : 0,
        'b' : 1,
        'c' : 2
    }

    const letter = coordinate[0]
    const num = coordinate[1]

    return [ 3 - Number(num), letterValues[letter]] // 0-indexing

}

function getEndGame() {
    // this is kind of a leetcode problem... "check for three consecutive adjacent horizontal, vertical, or diagonal values in a two-dimensional array."
    const flatGame = [...boardState[0], ...boardState[1], ...boardState[2]] 

    // essentially: for every index, we need to check every other 

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

        }
    }

    if (false) {

    }

    else if (!flatGame.includes('')) {
        console.log('The game is a tie')
    }

}

function drawShape(box) {

    // check if the box already has a chape in it. if not, draw the correct shape. if it does, do nothing
    
    // I could use the boardState to check if that box has already been clicked, but this felt more intuitive and I don't see a reason necessarily to do it any differently
    const boxClasses = Array.from(box.classList)
    const id = box.id
    
    if (!boxClasses.includes('checked')) {
            
        const fullIndex = coordinateToIndex(id)
        const letterIndex = fullIndex[0]
        const numIndex = fullIndex[1]

        if (turnCount % 2 == 0) {
            // draw an x
            box.classList.add('x-ed')
            boardState[letterIndex][numIndex] = 'x'
        }

        else {
            // draw an o
            box.classList.add('o-ed')
            boardState[letterIndex][numIndex] = 'o';
        }

        box.classList.add('checked')
        turnCount++;



    } // else do nothing

}

function addClickListeners() {
    for (const box of board.childNodes) {
        box.addEventListener('click', () => {
            drawShape(box)
            getEndGame()
        });
    }
}

addClickListeners()