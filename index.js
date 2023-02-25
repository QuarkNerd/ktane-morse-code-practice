const morseCodeTranslation = {
    A: '._',
    B: '_...',
    C: '_._.',
    D: '_..',
    E: '.',
    F: '.._.',
    G: '__.',
    H: '....',
    I: '..',
    J: '.___',
    K: '_._',
    L: '._..',
    M: '__',
    N: '_.',
    O: '___',
    P: '.__.',
    Q: '__._',
    R: '._.',
    S: '...',
    T: '_',
    U: '.._',
    V: '..._',
    W: '.__',
    X: '_.._',
    Y: '_.__',
    Z: '__..'
}

let letters;
function displayRandomLetterSeries() {
    const inp = document.getElementById('letterCount').value;
    const numLetters = inp === '' ? 3 : parseInt(inp);
    letters = Array(numLetters).fill(0).map(getRandomLetter);
    displayLetterSeries();
}

function displayChosenCode() {
    letters = document.getElementById('specifcMorse').value.split(' ');
    displayLetterSeries();
}

async function displayLetterSeries() {
    document.getElementById('currentLetterSeries').style.display = 'none';
    document.getElementById('currentLetterSeries').innerHTML = letters.map(l => l.split('').join(' ')).join('  /  ');
    
    for (let i = 0; i < letters.length; i++) {
        await letterGap();
        await displayLetter(letters[i]);
    }
}

function revealLetterSeries() {
    document.getElementById('currentLetterSeries').style.display = 'block';
}

async function displayLetter(letterCode) {
    letterCode[0] == '.' ? await displayDot() : await displayDash();
    for (let i = 1; i < letterCode.length; i++) {
        await signalGap();
        letterCode[i] == '.' ? await displayDot() : await displayDash();
    }
}

async function displayDot() {
    turnOn();
    await waitInPeriods(16);
    turnOff();
}

async function displayDash() {
    turnOn();
    await waitInPeriods(49);
    turnOff();
}

function signalGap() {
    return waitInPeriods(17);
}

function letterGap() {
    return waitInPeriods(65);
}

function turnOn() {
    document.getElementById('bomb').src = './on.png';
}

function turnOff() {
    document.getElementById('bomb').src = './off.png';
}

function getRandomLetter() {
    const options = Object.values(morseCodeTranslation);
    const random = Math.floor(Math.random() * options.length);
    return options[random];
}

// 1 period = 1/60 second
function waitInPeriods(periods) {
    return wait(periods * 1000/60)
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms))
}