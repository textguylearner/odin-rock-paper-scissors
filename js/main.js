const choices = document.querySelector(".choices-container").children;

const fireButton = choices[0];
const waterButton = choices[1];
const leafButton = choices[2];
const confirmButton = document.querySelector(".confirm-btn");
const emptyButton = document.querySelector(".empty-btn");

const yourHPElement = document.querySelector(".your-hp");
const opponentHPElement = document.querySelector(".opponent-hp");

const descriptionElement = document.querySelector(".description-p");

let selected;
let canReveal = false;
let isRevealed = false;
let isStarted = false;

let yourHp = 3;
let opponentHp = 3;

function getComputerChoice() {
    //generate a random number from 0 to 2
    const randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber);
    //store all possible choices string to an choicesArray array
    const choicesArray = ["Fire", "Water", "Leaf"];
    console.log(choicesArray[randomNumber]);
    //return a random choices from choicesArray array
    return choicesArray[randomNumber];
}

function getPlayerChoice() {
    if(selected === fireButton) return "Fire";
    if(selected === waterButton) return "Water";
    if(selected === leafButton) return "Leaf";
}

function choiceToButton(choice) {
    if(choice == "Fire") return fireButton;
    if(choice == "Water") return waterButton;
    if(choice == "Leaf") return leafButton;
}

function playRound(playerSelection, computerSelection) {
    //return draw game if both select the same selection
    if(playerSelection.toLowerCase() === computerSelection.toLowerCase()) return "Draw!";

    //check all the losing condition for the player and store it into playerIsLose variable
    const playerIsLose = (playerSelection.toLowerCase() === "fire" && computerSelection.toLowerCase() === "water" ||
        playerSelection.toLowerCase() === "water" && computerSelection.toLowerCase() === "leaf" ||
        playerSelection.toLowerCase() === "leaf" && computerSelection.toLowerCase() === "fire");

    //return win or lose
    return playerIsLose ? `You lose! ${computerSelection} beats ${playerSelection}` : `You win! ${playerSelection} beats ${computerSelection}`;
}

function isWon(result) {
    const resultBreakdown = result.split(' ')[1];
    return resultBreakdown === "win!";
}

function checkWin(result) {
    if(result === "Draw!") return;
    if(isWon(result)) opponentHp--;
    if(!isWon(result)) yourHp--;
    renderHP();

    if(opponentHp === 0)
    {
        descriptionElement.textContent = "You lose!";
        confirmButton.textContent = "Restart"; 
    }

    if(yourHp === 0)
    {
        descriptionElement.textContent = "You win!";
    }
}

Array.from(choices).forEach(btn => {
    btn.addEventListener("click",function () {
        if(!isStarted || isRevealed || canReveal) return;
        selected = btn;
        renderSelected();
    });
});

confirmButton.addEventListener("click",function () {
    if(yourHp === 0 || opponentHp === 0) {
        if(confirm("Are you sure?")) location.reload();
        return;
    }

    if(!selected && isStarted) //player haven't select anything
    {
        //tell player to choose a card
        descriptionElement.textContent = "Choose A Card!";
    }
    else
    {
        if(!isStarted)
        {
            confirmButton.textContent = "Confirm";
            isStarted = true;
            descriptionElement.textContent = "Choose A Card!";
        }
        //opponent card is revealed
        else if(isRevealed)
        {
            confirmButton.textContent = "Confirm";
            isRevealed = false;
            selected = undefined;
            descriptionElement.textContent = "-";
            emptyButton.innerHTML = "<div class='selected-card'></div>";
            renderSelected();
        }
        //opponent card is ready to reveal
        else if(canReveal)
        {
            canReveal = false;
            isRevealed = true;
            confirmButton.textContent = "Next Turn";

            const computerChoice = getComputerChoice();
            const playerChoice = getPlayerChoice();
            //reveal the opoonent card
            emptyButton.innerHTML = choiceToButton(computerChoice).innerHTML;
            //tell who deal damage
            const result = playRound(playerChoice, computerChoice);
            descriptionElement.textContent =  result;

            checkWin(result);
        }
        //player confirm the card they chose
        else
        {
            canReveal = true;
            confirmButton.textContent = "Click Me";
            descriptionElement.textContent = "Click Again to reveal opponent's card.";
            descriptionElement.style.color = "white";
        }
    }
});

function resetMatch() {
    location.reload();
}

function renderSelected() {
    if(isRevealed || canReveal) return;
    fireButton.classList.remove('selected-btn');
    waterButton.classList.remove('selected-btn');
    leafButton.classList.remove('selected-btn');
    if(selected) {
        selected.classList.add('selected-btn');
        descriptionElement.textContent = getPlayerChoice();

        if(getPlayerChoice() == "Fire") descriptionElement.style.color = "rgb(200, 100, 0)";
        if(getPlayerChoice() == "Water") descriptionElement.style.color = "rgb(0, 100, 200)";
        if(getPlayerChoice() == "Leaf") descriptionElement.style.color = "rgb(0, 200, 100)";
    }
}

function renderHP() {
    yourHPElement.textContent = "Your HP:" + yourHp;
    opponentHPElement.textContent = "Opponent HP:" + opponentHp;
    console.log(yourHp);

    if(yourHp === 2) yourHPElement.style.color = 'yellow';
    if(yourHp === 1) yourHPElement.style.color = 'red';
    if(yourHp === 0) yourHPElement.style.color = 'grey';

    if(opponentHp === 2) opponentHPElement.style.color = 'yellow';
    if(opponentHp === 1) opponentHPElement.style.color = 'red';
    if(opponentHp === 0) opponentHPElement.style.color = 'grey';
}