const lettersPattern = /^[a-zA-Z]{1}$/;
let currentGuessCount = 1;
let currentGuess = document.querySelector(`#guess${currentGuessCount}`);

// detect keypress (letter, backspace, other)
document.addEventListener('keydown', (event) => {
    const keypress = event.key;
    const isLetter = lettersPattern.test(keypress);
    const isBackspace = keypress === "Backspace";

    // console.log('key', event.key);
    // console.log('isLetter', isLetter);
    // console.log('isBackspace', isBackspace);

    if (isLetter) {
        updateLetters(keypress);
    }
});

function updateLetters(letter) {
    // let currentLetters = currentGuess.dataset.letters;
    // currentLetters += letter;
    currentGuess.dataset.letters += letter;
}