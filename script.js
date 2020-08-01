let userChoicePaper = document.getElementById("paper");
let userChoiceRock = document.getElementById("rock");
let userChoiceScissors = document.getElementById("scissors");

let popUp = document.getElementById("popUp");
let reload = document.getElementById("playagain");
let quit = document.getElementById("quit");

let scoreUser = 0;
let scoreComp = 0;

let compChoice;

let globalCounterHTML = document.getElementById("global-counter");
let globalCounter = 0;


function enablePopUp(a,b) {
    let popUpLabel = document.getElementById("popuplabel");

    if (a > b) {
        popUpLabel.innerHTML = `Looks like You've Won By ${scoreUser - scoreComp} Point(s)!!`;
    } else if (b > a) {
        popUpLabel.innerHTML = `Looks Like You've Lost By ${scoreComp - scoreUser} Point(s)!!`;
    } else {
        popUpLabel.innerHTML = `It's a Draw!`;
    }
    popUp.style.display = "block";
}

let onReload = () => location.reload();

let onQuit = () => window.close();

// let resultGiver = (a,b) => {
//     if (a > b) {
//         alert(`You've Won By ${scoreUser - scoreComp} Point(s)!!`);
//     } else if (b > a) {
//         alert(`You've Lost By ${scoreComp - scoreUser} Point(s)!!`);
//     }
//     location.reload(); <---This should be referenced if the user hits the reload button...
// }

function roundChecker() {
    if (globalCounter === 10) {
        enablePopUp(scoreUser, scoreComp);
    }
}

function refreshImages() {
    let resetUser = document.getElementById('user-image');
    let resetComputer = document.getElementById('computer-image');

    resetUser.src = `/assets/rock.png`;
    resetComputer.src = `/assets/rock.png`;
}

function changeImage(property) {
    let defaultImage = document.getElementById('user-image');
    if (defaultImage.src.match("/assets/rock.png")) {
        defaultImage.src = `/assets/${property}.png`;
    } else {
        defaultImage.src = `/assets/rock.png`;
    }

    let comDefaultImage = document.getElementById('computer-image');
    let randNumber = randNum(11);

    if (randNumber <= 3) {
        comDefaultImage.src = "/assets/rock.png";
    } else if (randNumber > 3 && randNumber <= 7) {
        comDefaultImage.src = "/assets/paper.png";
    } else {
        comDefaultImage.src = "/assets/scissors.png";
    }

    updateScore(property, comDefaultImage);

    setTimeout(() => {
        refreshImages();
    }, 1000);
}

function randNum(limit) {
    let rand = Math.random() * limit;
    return Math.floor(rand);
}

let updateGlobalCounter = () => {
    globalCounter += 1;
    globalCounterHTML.innerHTML = `Round: ${globalCounter}`;
}



function updateScore(userChoice, compChoice) {
    let userChoiceVar = userChoice;
    let winnerNotice = document.getElementById("winner-var");
    let computerCurrentChoice = compChoice;
    let comCurChToString;

    if (computerCurrentChoice.outerHTML) {
        comCurChToString = computerCurrentChoice.outerHTML;
    } else {
        comCurChToString = new XMLSerializer().serializeToString(computerCurrentChoice);
    }

    console.log(comCurChToString);

    if (userChoiceVar == "paper" && comCurChToString.includes("paper")) {
        winnerNotice.innerHTML = "It's a DRAW!";
    } else if (userChoiceVar == "rock" && comCurChToString.includes("rock")) {
        winnerNotice.innerHTML = "It's a DRAW!";
    } else if (userChoiceVar == "scissors" && comCurChToString.includes("scissors")) {
        winnerNotice.innerHTML = "It's a DRAW!";
    } else if (userChoiceVar == "scissors" && comCurChToString.includes("paper")) {
        winnerNotice.innerHTML = "You Win The Round!";
        scoreUser++;
    } else if (userChoiceVar == "scissors" && comCurChToString.includes("rock")) {
        winnerNotice.innerHTML = "Computer Wins The Round!";
        scoreComp++;
    } else if (userChoiceVar == "rock" && comCurChToString.includes("scissors")) {
        winnerNotice.innerHTML = "You Win The Round!";
        scoreUser++;
    } else if (userChoiceVar == "rock" && comCurChToString.includes("paper")) {
        winnerNotice.innerHTML = "Computer Wins The Round!";
        scoreComp++;
    } else if (userChoiceVar == "paper" && comCurChToString.includes("scissors")) {
        winnerNotice.innerHTML = "Computer Wins The Round!";
        scoreComp++;
    } else if (userChoiceVar == "paper" && comCurChToString.includes("rock")) {
        winnerNotice.innerHTML = "You Win The Round!";
        scoreUser++
    }
}

function bounceHands(param) {
    let userImg = document.getElementById("user-image");
    let compImg = document.getElementById("computer-image");
    userImg.classList.add("hand-bounce-user");
    compImg.classList.add("hand-bounce");

    setTimeout(() => {
        changeImage(param);
    }, 1250);

    setTimeout(() => {
        removeClass()
    }, 1500);
}

function removeClass() {
    let userImgR = document.getElementById("user-image");
    let compImgR = document.getElementById("computer-image");
    userImgR.classList.remove("hand-bounce-user");
    compImgR.classList.remove("hand-bounce");
}


//Test Case for String Conversion

function testCaseToString() {
    let test = document.getElementById('computer-image');
    let testToString;
    
    if (test.outerHTML) {
        testToString = test.outerHTML;
    } else {
        testToString = new XMLSerializer().serializeToString(test);
    }

    if (testToString.includes("paper")) {
        return console.log(true);
    }//Conversion from grabbed document element to string + comparison works.
}

//Event Listeners

userChoicePaper.addEventListener("click", () => {
    bounceHands("paper");
    updateGlobalCounter();
    roundChecker();
});


userChoiceRock.addEventListener("click", () => {
    bounceHands("rock");
    updateGlobalCounter();
    roundChecker();
});


userChoiceScissors.addEventListener("click", () => {
    bounceHands("scissors");
    updateGlobalCounter();
    roundChecker();
});

reload.addEventListener('click', onReload);

quit.addEventListener('click', onQuit);

//Project Objectives:

//Need to figure out how to refactor the code so we only have a single function that changes the image...DONE

//BUG: SOMETIMES THE IMAGE DOESN'T UPDATE..FIXED -->refreshImages func.

//Need to figure out a another function that "bounces" the images when any button is pressed...DONE!
//Need to develop an algorithm that makes the computer randomize its answer (Math.random probably) and shows it upon user click..DONE!
// Need to develop an algorithm that determines who is the winner..DONE!
// Need to update "___ Wins the round" ...DONE!
// Need to also tally round number....DONE!
// Need to tally the wins per person, and finally update WIN OR LOSE...DONE!

//BUG: Upon adding the bouncing hands, it broke the if/else statements--It seems like the function updateScore() is getting the computer's answer element before it is altered to it's randomized choice...
//Furthermore, I think the error above is based on using the converted-string value of what the computer randomly generates to compare to see the answers. It appears that using setTimeout() to time the bouncing motion and the resulting answer image has broke the if/else conditions.
//The JS engine is moving past the setTimeout() and quickly parsing the updateScore(), resulting in a wrong conditional result.
//^^FIXED!!!