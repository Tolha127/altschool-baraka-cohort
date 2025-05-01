const getUserChoice = userInput => {
  userInput = userInput.toLowerCase();
  if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
    return userInput;
  } else if (userInput === 'bomb'){
    return 'bomb';
  } else {
    console.log('Error: Invalid input. Please choose rock, paper, or scissors.');
    return null;
  }
};

const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  if (randomNumber === 0) {
    return 'rock';
  } else if (randomNumber === 1) {
    return 'paper';
  } else {
    return 'scissors';
  }
};

const determineNewWinner = (userChoice, computerChoice) => {
  if (userChoice === 'bomb'){
    return 'You win with the bomb!';
  }
  if (userChoice === computerChoice) {
    return 'It is a tie!';
  }
  if (userChoice === 'rock') {
    if (computerChoice === 'scissors') {
      return 'You win!';
    } else {
      return 'Computer wins!';
    }
  }
  if (userChoice === 'scissors') {
    if (computerChoice === 'rock') {
      return 'Computer wins!';
    } else {
      return 'You win!';
    }
  }
  if (userChoice === 'paper') {
    if (computerChoice === 'scissors') {
      return 'Computer wins!';
    } else {
      return 'You win!';
    }
  }
};

// Initialize game variables
let wins = 0;
let ties = 0;
let losses = 0;

// Function to update the game stats display
const updateStats = () => {
  document.getElementById('wins').textContent = wins;
  document.getElementById('ties').textContent = ties;
  document.getElementById('losses').textContent = losses;
};

// Function to handle game play
const playGame = (userChoiceInput) => {
  const userChoice = getUserChoice(userChoiceInput);
  if (!userChoice) return;
  
  const computerChoice = getComputerChoice();
  
  document.getElementById('user-choice').textContent = userChoice.toUpperCase();
  document.getElementById('computer-choice').textContent = computerChoice.toUpperCase();
  
  const result = determineNewWinner(userChoice, computerChoice);
  document.getElementById('result').textContent = result;
  
  // Update stats and result display
  if (result.includes('You win')) {
    wins++;
    document.getElementById('result').className = 'result-display win-result';
  } else if (result.includes('tie')) {
    ties++;
    document.getElementById('result').className = 'result-display tie-result';
  } else {
    losses++;
    document.getElementById('result').className = 'result-display lose-result';
  }
  
  updateStats();
  return result;
};

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const choiceButtons = document.querySelectorAll('.choice-btn');
  
  choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const userChoice = button.dataset.choice;
      playGame(userChoice);
      
      // Add animation effect
      button.classList.add('scale-110');
      setTimeout(() => {
        button.classList.remove('scale-110');
      }, 200);
    });
  });
  
  // Initialize stats display
  updateStats();
});