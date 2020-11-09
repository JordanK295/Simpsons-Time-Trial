const box = document.getElementsByClassName("box")
const arrayBox = Array.from(box)
const reset = document.getElementById("reset")
const stopwatch = document.getElementById("stopwatch")
const playAgain = document.getElementById("play-again")
const numCards = 18
let numSolved = 0
let count = 0
let idChecker = 0
let seconds = 0
let stopwatchTimer

// SHUFFLE

function shuffle() {
    var ul = document.getElementById('game-board');
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
}

shuffle();

// STOPWATCH

function eachDecisecond() {
    seconds += 0.1
    stopwatch.innerHTML = seconds.toFixed(1) + " s"
}

// RESET

reset.addEventListener("click", function () {
        resetCards()
});

function resetCards() {
    $(".box").removeClass("solved").removeClass("targeted").removeClass("hidden").removeClass("disabled").removeClass("fade-out")
    $(".image-class").removeClass("solved").removeClass("targeted").addClass("hidden").addClass("not-solved").removeClass("disabled").removeClass("fade-out")
    $(".score-screen").addClass("hidden")
    $(".score-screen").removeClass("bounce-in-top")
    document.getElementById('opaque').style.display='none'
    clearInterval(stopwatchTimer)
    shuffle()
    stopwatch.innerHTML = 0 + " s"
    seconds = 0
    count = 0
    numSolved = 0
}

// PLAY AGAIN

playAgain.addEventListener("click", function () {
    resetCards()
})

// JELLY WOBBLE

function jellyWobble() {
    const ratingLetter = document.getElementById("score-rating-letter")
    if (ratingLetter.classList.contains("jelly")) {
        ratingLetter.classList.remove("jelly")
    }
    else {
        ratingLetter.classList.add("jelly")
    }
}

// SCORE RATINGS

function scoreToRanking() {
    const scoreRatingLetter = document.getElementById("score-rating-letter")
    if (seconds < 15) {
        scoreRatingLetter.innerHTML = "S+"
    }
    else if (seconds < 17.5) {
        scoreRatingLetter.innerHTML = "S"
    }
    else if (seconds < 20) {
        scoreRatingLetter.innerHTML = "S-"
    }
    else if (seconds < 23) {
        scoreRatingLetter.innerHTML = "A+"
    }
    else if (seconds < 26) {
        scoreRatingLetter.innerHTML = "A"
    }
    else if (seconds < 29) {
        scoreRatingLetter.innerHTML = "A-"
    }
    else if (seconds < 32) {
        scoreRatingLetter.innerHTML = "B+"
    }
    else if (seconds < 36) {
        scoreRatingLetter.innerHTML = "B"
    }
    else if (seconds < 40) {
        scoreRatingLetter.innerHTML = "B-"
    }
    else if (seconds < 44) {
        scoreRatingLetter.innerHTML = "C+"
    }
    else if (seconds < 50) {
        scoreRatingLetter.innerHTML = "C"
    }
    else if (seconds < 60) {
        scoreRatingLetter.innerHTML = "C-"
    }
    else if (seconds < 90) {
        scoreRatingLetter.innerHTML = "D+"
    }
    else if (seconds < 180) {
        scoreRatingLetter.innerHTML = "D"
    }
    else {
        scoreRatingLetter.innerHTML = "D-"
    }
}

// GAME LOGIC

arrayBox.forEach(eachBox => {
    eachBox.addEventListener("click", function toggleCard() {
        eachImage = eachBox.nextElementSibling
        eachImageId = parseInt(eachImage.id, 10)
        const cardSound = document.getElementById("card-sound");
        cardSound.play()
        idChecker += eachImageId
        eachImage.classList.remove("hidden")
        // Constant set for the number of solved cards. Show the card clicked each time.

        // If it's the second reveal in a row, and a matching pair. Set the pair as solved.
        if (count === 1 && idChecker === numCards + 1) {
            eachImage.classList.add("targeted")
            eachBox.classList.add("targeted")
            $(".targeted").addClass("fade-out").removeClass("targeted")
            setTimeout(function () {
                $(".fade-out").addClass("solved").removeClass("not-solved").removeClass("fade-out")
                }, 400);
            count++
            numSolved++
            idChecker = 0
        }
        // If it's the second reveal in a row, but not a matching pair. Add targets to the selection and do nothing.
        else if (count === 1) {
            eachImage.classList.add("waiting")
            eachBox.classList.add("waiting")
            $("img.fade-out").addClass("hidden").removeClass("fade-out")
            $(".targeted").addClass("waiting").removeClass("targeted")
            setTimeout(function () {
                $("img.waiting").addClass("fade-out").removeClass("waiting")
                setTimeout(function () {
                    $(".fade-out").addClass("hidden").removeClass("fade-out")
                }, 700)
                }, 500);
            count++
            idChecker = 0
        }
            // If it's the first reveal after revealing 2 cards in a row. Hide the revealed cards and de-target.
        else if (count === 2) {
            $("img.fade-out").addClass("hidden").removeClass("fade-out")
            $("img.waiting").addClass("hidden").removeClass("fade-out")
            $(".targeted").removeClass("targeted")
            eachImage.classList.add("targeted")
            eachBox.classList.add("targeted")
            count = 0
            count++
        }
            // If it's the first reveal of the game. Start the stopwatch.
        else if (count === 0) {
            $(".reset").removeClass("remove")
            eachImage.classList.add("targeted")
            eachBox.classList.add("targeted")
            count++
            stopwatchTimer = setInterval(eachDecisecond, 100);
        }
        eachImage.classList.remove("hidden")
        // Win condition. If won stop the stopwatch, show all the cards and disable any interaction.
        if (numSolved === numCards / 2) {
            const timeScore = document.getElementById("time-score")
            document.getElementById('opaque').style.display='block'
            clearInterval(stopwatchTimer)
            $(".box").removeClass("solved")
            $(".image-class").removeClass("hidden").removeClass("solved").addClass("not-solved").removeClass("fade-out")
            $(".box").addClass("disabled")
            $(".image-class").addClass("disabled")
            $(".score-screen").addClass("bounce-in-top").removeClass("hidden")
            timeScore.innerHTML = "time: " + seconds.toFixed(1) + " s"
            scoreToRanking()
            setInterval(jellyWobble, 1500);
            const closeBtn = document.getElementById("close")
            closeBtn.addEventListener("click", function () {
                $(".score-screen").addClass("hidden")
                document.getElementById('opaque').style.display='none'
            })
        }
    })
})

// Feedback button
function toggle_visibility() {
    var e = document.getElementById('feedback-main');
    if(e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}