
const board = document.getElementById('board');
let turnCount = 0
let gameUnlocked = true

let boardState = [
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
        'a': 0,
        'b': 1,
        'c': 2
    }

    const letter = coordinate[0]
    const num = coordinate[1]

    return [3 - Number(num), letterValues[letter]] // 0-indexing

}

function getEndGame() {
    const flatGame = [...boardState[0], ...boardState[1], ...boardState[2]]

    let winner;
    let win;
    (turnCount - 1) % 2 == 0 ? winner = 'X' : winner = 'O'; // turnCount++ is called before we evaluate this condition

    // first check if any rows have a victory
    for (let row = 0; row < 3; row++) {

        // fancy line that makes sure it is not three empties compared to each other & also 
        win = ((boardState[row][0] === boardState[row][1]) && (boardState[row][1] === boardState[row][2])) && (boardState[row][0] !== '')

        // check which side won
        if (win) {
            return winner;
        }

    }

    // then check if any cols have a victory
    for (let col = 0; col < 3; col++) {
        win = ((boardState[0][col] === boardState[1][col]) && (boardState[1][col] === boardState[2][col])) && (boardState[0][col] !== '')


        if (win) {
            return winner;
        }
    }
    // manually check for diagonals (seems easiest)


    // if top-left matches middle-middle matches bottom-right OR the other diagonal AND they're not empty spaces, return the current winner.
    win = ((boardState[0][0] === boardState[1][1]) && (boardState[1][1] === boardState[2][2]) ||
        (boardState[2][0] === boardState[1][1]) && (boardState[1][1] === boardState[0][2]))
        && boardState[1][1] !== ''

    if (win) {
        return winner;
    }

    if (!flatGame.includes('')) {
        return 'C'; // for cat's game
    }

}

function drawShape(box) {

    // check if the box already has a chape in it. if not, draw the correct shape. if it does, do nothing

    // I could use the boardState to check if that box has already been clicked, but this felt more intuitive and I don't see a reason necessarily to do it any differently
    const boxClasses = Array.from(box.classList)
    const id = box.id

    const x = document.createElement('p');
    x.className = 'checkmark'
    x.textContent = 'X'

    const o = document.createElement('p');
    o.className = 'checkmark'
    o.textContent = 'O'

    if (!boxClasses.includes('checked')) {

        const fullIndex = coordinateToIndex(id)
        const letterIndex = fullIndex[0]
        const numIndex = fullIndex[1]

        if (turnCount % 2 === 0) {
            // draw an x
            box.classList.add('x-ed')
            boardState[letterIndex][numIndex] = 'x'
            box.appendChild(x);
        }

        else {
            // draw an o
            box.classList.add('o-ed')
            boardState[letterIndex][numIndex] = 'o';
            box.appendChild(o);
        }

        box.classList.add('checked')



    } // else do nothing

}

const clearBox = (box) => {
    boxClasses = Array.from(box.classList)
        if (boxClasses.includes('box')) { // sometimes less desirable things appear, making sure it IS a box

            box.classList.remove('checked')
            box.classList.remove('x-ed')
            box.classList.remove('o-ed')

            const checkmarks = box.getElementsByClassName('checkmark')

            for (const check of checkmarks) {
                box.removeChild(check)
            }
        }
}

function resetBoard() {

    turnCount = 0
    gameUnlocked = true

    boardState = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    const titleBox = document.getElementById('head-box')
    clearBox(titleBox)

    const x = document.createElement('p');
    x.className = 'checkmark'
    x.textContent = 'X'

    titleBox.appendChild(x)
    titleBox.classList.add('x-ed')
    titleBox.classList.add('checked')
    

    for (const box of board.children) {
        clearBox(box)
    }
}


function addClickListeners() {

    // Yes, this is redundant, but best with the way the code is currently written
    const x = document.createElement('p');
    x.className = 'checkmark'
    x.textContent = 'X'

    const o = document.createElement('p');
    o.className = 'checkmark'
    o.textContent = 'O'

    const titleBox = document.getElementById('head-box')
    titleBox.appendChild(x)
    titleBox.classList.add('x-ed')
    titleBox.classList.add('checked')


    for (const box of board.children) {

        box.addEventListener('click', () => {

            if (Array.from(box.classList).includes('checked')) {
                return;
            }

            if (gameUnlocked) {

               
                drawShape(box)
                turnCount++;


                let winner = getEndGame()

                if (winner === 'X') {
                    // do something more advanced than this
                    alert('x wins!')
                    gameUnlocked = false
                } else if (winner === 'O') {
                    alert('o wins!')
                    gameUnlocked = false
                } else if (winner === 'C') {
                    alert('tie!')
                    gameUnlocked = false
                } else {
                    clearBox(titleBox)

                    if (turnCount % 2 === 0) {
                        // draw an x
                        titleBox.classList.add('x-ed')
                        titleBox.appendChild(x);
                    }

                    else {
                        // draw an o
                        titleBox.classList.add('o-ed')
                        titleBox.appendChild(o);
                    }
                }
            }
        });
    }

    const resetButton = document.getElementById('reset')
    resetButton.addEventListener('click', () => {
        resetBoard()
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === ' ' || e.code === 'Space') {
            resetBoard()
        }
    })
}

addClickListeners()
