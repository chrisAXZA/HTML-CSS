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
];
const num = chooseRandomWord(wordList);
const word = wordList[num];
console.log(word);

// detect keypress (letter, backspace, other)
document.addEventListener('keydown', (event) => {
    const keypress = event.key;
    const isLetter = lettersPattern.test(keypress);
    const isBackspace = keypress === "Backspace";

    if (isLetter) {
        updateLetters(keypress);
    } else if (isBackspace) {
        eraseLetter();
    }
});

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

        currentGuess.dataset.letters = currentGuess.dataset.letters.slice(0, -1);
        // let word = currentGuess.dataset.letters.split('');
        // word.pop();
        // currentGuess.dataset.letters = word.join('');

        updateTiles(currentTileNumber, '');
    }
}

function updateTiles(tileNumber, letter) {
    let tile = document.querySelector(`#guessTile${tileNumber}`);
    // tile.textContent = letter;
    tile.innerText = letter;
}