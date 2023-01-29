const lettersPattern = /^[a-zA-Z]{1}$/;

// detect keypress (letter, backspace, other)
document.addEventListener('keydown', (event) => {
    const isLetter = lettersPattern.test(event.key);
    const isBackspace = event.key === "Backspace";

    // console.log(event.key);
    // console.log('isLetter', isLetter);
    // console.log('isBackspace', isBackspace);
});