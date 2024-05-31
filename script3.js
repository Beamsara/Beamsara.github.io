let favorSix = true;
let favorOneTwo = false;

document.getElementById('roll-button').addEventListener('contextmenu', (event) => {
  event.preventDefault(); // Prevent the default context menu
  favorSix = !favorSix; // Toggle favorSix
});

document.addEventListener('mousedown', (event) => {
  if (event.button === 0) { // Left mouse button
    favorSix = false;
    favorOneTwo = false;
  } else if (event.button === 1) { // Middle mouse button
    favorOneTwo = true;
  } else if (event.button === 2 && favorSix) { // Right mouse button
    favorSix = false;
    favorOneTwo = false;
    setTimeout(() => {
      favorSix = true;
      favorOneTwo = false;
    }, 1000); // Wait for 1 second before adding 5 to the possible outcomes
  }
});

function getRandomDiceNumber() {
  if (favorSix) {
    return Math.random() < 0.9 ? 6 : 5; // Change the chance for 6 and add 5 as a possible outcome
  } else if (favorOneTwo) {
    return Math.random() < 0.9 ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 4) + 3;
  } else {
    return Math.floor(Math.random() * 6) + 1;
  }
}

const rollButton = document.getElementById('roll-button');
const diceResultElement1 = document.getElementById('dice-result1');
const diceResultElement2 = document.getElementById('dice-result2');

rollButton.addEventListener('click', () => {
  diceResultElement1.classList.add('shake');
  diceResultElement2.classList.add('shake');
  let diceInterval1, diceInterval2;
  
  diceInterval1 = setInterval(() => {
    diceResultElement1.textContent = getDiceCharacter(getRandomDiceNumber());
  }, 100);
  diceInterval2 = setInterval(() => {
    diceResultElement2.textContent = getDiceCharacter(getRandomDiceNumber());
  }, 100);

  setTimeout(() => {
    clearInterval(diceInterval1);
    clearInterval(diceInterval2);
    diceResultElement1.textContent = getDiceCharacter(getRandomDiceNumber());
    diceResultElement2.textContent = getDiceCharacter(getRandomDiceNumber());
    diceResultElement1.classList.remove('shake');
    diceResultElement2.classList.remove('shake');
  }, 1000);
});

function getDiceCharacter(num) {
  switch (num) {
    case 1: return '⚀';
    case 2: return '⚁';
    case 3: return '⚂';
    case 4: return '⚃';
    case 5: return '⚄';
    case 6: return '⚅';
    default: return '-';
  }
}
