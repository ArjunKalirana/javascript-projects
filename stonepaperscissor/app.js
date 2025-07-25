let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score")
const compScorePara = document.querySelector("#comp-score")


const getCompChoice= ()=>{
    const options = ["rock","paper","scissors"];
    return (options[Math.floor(Math.random()*3)])
}

const drawGame=()=>{
    console.log("the game a draw");
    msg.innerText= "It's a Draw😑";
    msg.style.backgroundColor= "#081b31";
}

const showWinner=(userWin , userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        console.log("you win!😍")
        msg.innerText = `You Win!😍 Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor= "green";
    }
    else{
        compScore++;
        compScorePara.innerText = compScore;
        console.log("you lose🥲")
        msg.innerText = `You Lose🥲 ${compChoice} beats your ${userChoice}`
        msg.style.backgroundColor= "red";
    }
}

const playGame = (userChoice)=>{
    console.log("user choice = ",userChoice);
    const compChoice = getCompChoice();
    console.log("Computer choice = ",compChoice);

    if(userChoice==compChoice){
        drawGame();
    }
    else{
        let userWin=true;
        if(userChoice=="rock"){
            userWin=compChoice==="paper"?false:true
        }
        else if(userChoice==="paper"){
            userWin=compChoice==="scissors"?false:true
        }
        else{
            userWin=compChoice==="rock"?false:true

        }
        showWinner(userWin,userChoice,compChoice);
    }
}

choices.forEach((choice)=>{
    console.log((choice));
    choice.addEventListener("click",()=>{
        const userChoice = choice.getAttribute("id");
        console.log("choice was clicked",userChoice);
        playGame(userChoice);
    })
})