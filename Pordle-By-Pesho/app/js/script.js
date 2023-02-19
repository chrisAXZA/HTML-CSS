const lettersPattern = /^[a-zA-Z]{1}$/;
let currentGuessCount = 1;
let currentGuess = document.querySelector(`#guess${currentGuessCount}`);
const wordList = [
    'BAKER',
    'PIZZA',
    'PESHO',
    'APPLE',
    'BREAD',
    'SMASH',
    'MONEY',
    'DOUGH',
    'HOUSE',
];
const num = chooseRandomWord(wordList);
const word = wordList[num];
let guessCount = 1;
console.log(word);

const submitGuessButton = document.querySelector('#submitBtn');
submitGuessButton.addEventListener('click', () => {
    const allLetters = currentGuess.dataset.letters.length === 5;

    if (allLetters) {
        for (let i = 0; i < 5; i++) {
            // setInterval(() => {
            //     revealTile(i + 1, checkLetter(i));
            // }, i * 200);
            revealTile(i + 1, checkLetter(i));
        }
    }
});

// Detect keypress (letter, backspace, other)
document.addEventListener('keydown', (event) => {
    const keypress = event.key;
    const isLetter = lettersPattern.test(keypress);
    const isBackspace = keypress === "Backspace";
    const isEnter = keypress === "Enter";
    const allLetters = currentGuess.dataset.letters.length === 5;

    if (isLetter) {
        updateLetters(keypress);
    } else if (isBackspace) {
        eraseLetter();
    }

    // else if (isEnter && allLetters) {
    //     // const result = submitGuess();
    //     // console.log(result);
    //     for (let i = 0; i < 5; i++) {
    //         // console.log(checkLetter(i));
    //         revealTile(i + 1, checkLetter(i));
    //     }
    // }
});

function revealTile(tileNumber, tileStatus) {
    // const currentTile = document.querySelector(`#guessTile${tileNumber}`);

    // if (tileStatus === 'correct') {
    //     // currentTile.classList += ' correct';
    //     currentTile.classList.add('correct');
    // } else if (tileStatus === 'included') {
    //     // currentTile.classList += ' included';
    //     currentTile.classList.add('included');
    // } else if (tileStatus === 'notIncluded') {
    //     // currentTile.classList += ' notIncluded';
    //     currentTile.classList.add('notIncluded');
    // } else if (tileStatus === 'backspace') {
    //     currentTile.classList = 'guess__tile';
    // }

    // currentTile.classList.add(tileStatus);

    // flipTile(tileNumber, tileStatus);
    flipTile2(tileNumber, tileStatus);
}

function chooseRandomWord(wordList) {
    const min = Math.ceil(1);
    const max = Math.floor(wordList.length);
    // min and max inclusive
    return Math.floor(Math.random() * (max - min) + min);
}

function updateLetters(letter) {
    // let currentLetters = currentGuess.dataset.letters;
    // currentLetters += letter;
    if (currentGuess.dataset.letters.length < 5) {
        currentGuess.dataset.letters += letter;
        let currentTileNumber = currentGuess.dataset.letters.length;

        updateTiles(currentTileNumber, letter);
    }
}

function eraseLetter() {
    if (currentGuess.dataset.letters.length > 0) {
        let currentTileNumber = currentGuess.dataset.letters.length;
        revealTile(currentTileNumber, 'backspace');

        currentGuess.dataset.letters = currentGuess.dataset.letters.slice(0, -1);
        // let word = currentGuess.dataset.letters.split('');
        // word.pop();
        // currentGuess.dataset.letters = word.join('');

        updateTiles(currentTileNumber, '');
    }
}

function checkLetter(position) {
    let guessedLetter = currentGuess.dataset.letters.charAt(position).toUpperCase();
    let solutionLetter = word.charAt(position);

    if (guessedLetter === solutionLetter) {
        return 'correct';
    } else if (checkLetterInlcuded(guessedLetter)) {
        return 'included';
    } else {
        return 'notIncluded';
    }
}

function checkLetterInlcuded(letter) {
    return word.includes(letter);
}

function submitGuess() {
    const guess = currentGuess.dataset.letters;
    const guessResult = [];

    for (let i = 0; i < guess.length; i++) {
        const guessLetter = guess[i].toUpperCase();
        let notIncluded = true;
        const samePosition = guessLetter === word[i];

        for (let j = 0; j < word.length; j++) {
            const wordLetter = word[j];
            const sameLetter = guessLetter === wordLetter;

            if (samePosition) {
                guessResult.push({ 'value': 'correct', 'letter': guessLetter, 'position': i + 1 });
                // guessResult.push({ [i + 1]: 'correct', 'letter': wordLetter });
                notIncluded = false;
                break;
            } else if (sameLetter) {
                // const letterChecked = guessResult.includes(({ v, l, p }) => p === j + 1);

                // if (letterChecked) {
                //     guessResult.push({ 'value': 'notIncluded', 'letter': guessLetter, 'position': i + 1 });
                // }

                guessResult.push({ 'value': 'included', 'letter': guessLetter, 'position': i + 1 });
                notIncluded = false;
                break;
            }
        }

        if (notIncluded) {
            guessResult.push({ 'value': 'notIncluded', 'letter': guessLetter, 'position': i + 1 });
        }
    }

    return guessResult;
}

function updateTiles(tileNumber, letter) {
    let tile = document.querySelector(`#guess${guessCount}Tile${tileNumber}`);
    // tile.textContent = letter;
    tile.innerText = letter;
    console.log(letter);

    // console.log(tile.classList.length);

    // if (tile.classList.contains('has-letter')) {
    if (letter === '') {
        tile.classList.remove('has-letter');
    } else {
        tile.classList.add('has-letter');
    }
}

function flipTile2(tileNumber, tileState) {
    let tile = document.querySelector(`#guess${guessCount}Tile${tileNumber}`);

    console.log(tileState);

    if (tileState === 'backspace') {
        tile.classList = 'guess__tile';
    } else {
        tile.classList.add('flip-in');
        tile.classList.add(tileState);
        tile.classList.remove('flip-in');
        tile.classList.add('flip-out');
    }
}

function flipTile(tileNumber, tileState) {
    let tile = document.querySelector(`#guess${guessCount}Tile${tileNumber}`);
    tile.classList = 'guess__tile';
    tile.classList.add('flip-in');

    setTimeout(() => {
        if (tileState === 'backspace') {
            tile.classList = 'guess__tile';
        } else {
            tile.classList.add(tileState);
        }
    });

    setTimeout(() => {
        tile.classList.remove('flip-in');
        tile.classList.add('flip-out');
    }, 100);
}