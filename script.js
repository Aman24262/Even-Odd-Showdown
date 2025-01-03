const submitBtn = document.querySelector("#submit");
const result = document.querySelector("#result");
const input = document.querySelector("#user-input");
const resetBtn = document.querySelector("#reset");
const bonusDisplay = document.querySelector("#bonus");
const invest = document.querySelector("#invest");
const insufficient = document.querySelector("#insufficient");
const withdraw = document.querySelector("#withdraw");
const status = document.querySelector("#status");
const userName = document.querySelector("#user-name");

let playername = getPlayerName();
userName.innerText = playername;

alert("Congratulations! You won $1000");

let bonusMoney = 1000;
bonusDisplay.innerText = `Bonus: $${bonusMoney}`;

// Function to get and validate player's name
function getPlayerName() {
    let name = "";
    while (!name.trim()) {
        name = prompt("Enter your full name (required):").trim();
        if (!name) {
            alert("Name is required to proceed!");
        }
    }
    return name;
}

// Withdraw button logic
withdraw.addEventListener("click", () => {
    if (bonusMoney < 5000) {
        alert("Minimum withdrawal amount is $5000");
        return;
    }

    let w = prompt("Enter the amount you want to withdraw:");
    let withdrawMoney = parseInt(w, 10);

    if (isNaN(withdrawMoney) || withdrawMoney <= 0 || withdrawMoney > bonusMoney) {
        status.innerText = "Please enter a valid amount.";
        return;
    }

    // Deduct bonus and confirm withdrawal
    bonusMoney -= withdrawMoney;
    bonusDisplay.innerText = `Bonus: $${bonusMoney}`;
    status.innerText = `You have successfully withdrawn $${withdrawMoney}.`;
    alert(`Withdrawal successful! You withdrew $${withdrawMoney}.`);
});

// Submit button logic
submitBtn.addEventListener("click", () => {
    const randomNum = Math.floor(Math.random() * 101);
    const userInput = parseInt(input.value, 10);
    const investMoney = parseInt(invest.value, 10);

    if (isNaN(userInput) || isNaN(investMoney) || investMoney <= 0 || investMoney > bonusMoney) {
        result.innerText = "Please enter a valid number and investment amount.";
        insufficient.innerText = "";
        return;
    }

    const isRandomNumEven = randomNum % 2 === 0;
    const inputEven = userInput % 2 === 0;

    if (isRandomNumEven === inputEven) {
        result.innerText = `You are right! The number is ${isRandomNumEven ? "Even" : "Odd"}.`;
        bonusMoney += investMoney;
        insufficient.innerText = `Congratulations 🥳! You won $${investMoney}.`;
    } else {
        result.innerText = `You are wrong. The number is ${isRandomNumEven ? "Even" : "Odd"}.`;
        bonusMoney -= investMoney;
        insufficient.innerText = `Oops 😥! You lost $${investMoney}.`;
    }

    bonusDisplay.innerText = `Bonus: $${bonusMoney}`;

    if (bonusMoney <= 0) {
        insufficient.innerText = "You are such a big NOOB 😂. You lost all your money 😥! Restart the game.";
        result.innerText = "";
        submitBtn.disabled = true;
    }
});

// Reset button logic
resetBtn.addEventListener("click", () => {
    input.value = "";
    invest.value = "";
    result.innerText = "";
    insufficient.innerText = "";
    status.innerText = "";
    bonusMoney = 1000;
    bonusDisplay.innerText = `Bonus: $${bonusMoney}`;
    submitBtn.disabled = false;

    // Ask for a new name
    playername = getPlayerName();
    userName.innerText = playername;
});
