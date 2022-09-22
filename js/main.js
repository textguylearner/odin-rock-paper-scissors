
function getComputerChoice() {
    //generate a random number from 0 to 2
    const randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber);
    //store all possible choices string to an choicesArray array
    const choicesArray = ["Rock", "Paper", "Scissors"];
    console.log(choicesArray[randomNumber]);
    //return a random choices from choicesArray array
    return choicesArray[randomNumber];
}

function playRound(playerSelection, computerSelection) {

    //return draw game if both select the same selection
    if(playerSelection.toLowerCase() === computerSelection.toLowerCase()) return "Draw Game!";

    //check all the losing condition for the player and store it into playerIsLose variable
    const playerIsLose = (playerSelection.toLowerCase() === "rock" && computerSelection.toLowerCase() === "paper" ||
        playerSelection.toLowerCase() === "paper" && computerSelection.toLowerCase() === "scissors" ||
        playerSelection.toLowerCase() === "scissors" && computerSelection.toLowerCase() === "rock");

    //return win or lose
    return playerIsLose ? `You lose! ${computerSelection} beats ${playerSelection}` : `You win! ${playerSelection} beats ${computerSelection}`;

}

function isWon(result) {
    const resultBreakdown = result.split(' ')[1];
    return resultBreakdown === "win!";
}

function game() {
    let playerWin = 0;
    let computerWin = 0;

    while(true) {
        do { 
            playerChoice = prompt("choose rock, paper or scissors");
        } 
        while (
            playerChoice.toLowerCase() !== "rock" &&
            playerChoice.toLowerCase() !== "paper"&&
            playerChoice.toLowerCase() !== "scissors")
        
        const computerChoice = getComputerChoice();
        console.log("Computer chose " + computerChoice);
        const result = playRound(playerChoice, computerChoice);

        if(isWon(result)) {
            playerWin++;
        }
        else
        {
            computerWin++;
        }

        if(playerWin === 3)
        {
            alert(`You win! ${playerWin}:${computerWin}`);
            const again = confirm("Play again?\nEither OK or Cancel.");
            if(again) game();
            return;
        }

        if(computerWin === 3)
        {
            alert(`You lose! ${playerWin}:${computerWin}`);
            const again = confirm("Play again?\nEither OK or Cancel.");
            if(again) game();
            return;
        }
    }
}