// Image Parts 
let gallowBase = document.querySelector(".gallow-base")
let column = document.querySelector(".column")
let gallowHead = document.querySelector(".gallow-head")
let rope = document.querySelector(".rope")
let manHead = document.querySelector(".man-head")
let trunk = document.querySelector(".man-trunk")
let hands = document.querySelector(".hands")
let legs = document.querySelector(".legs")

let imageParts = [gallowBase,column,gallowHead,rope,manHead,trunk,hands,legs]
// Image Parts 


// replay Button
let repBtn = document.createElement("i")
repBtn.className = "fa-duotone fa-rotate-right"
document.body.appendChild(repBtn)

repBtn.addEventListener("click", function() {
    window.location.reload()
})
// replay Button


// Keybord
let keyboard = document.querySelector(".keyboard")
let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

// Create Keyboard
for (let i = 0; i < alphabet.length; i++) {
    let keyboardBtn = document.createElement("button")
    keyboardBtn.classList.add(`${alphabet[i]}`)
    keyboard.appendChild(keyboardBtn)
    keyboardBtn.innerHTML = alphabet[i].toUpperCase()
}

// Word Setting
let allWords = [
    ["javascript","css","html","python","php"],
    ["messi","ronaldo","romero","mohamed salah"],
    ["wael gassar","tamer hosny","amr diab","mohamed saeed","tamer ashour"],
]

// Create Random Category Index
let randomCategory = Math.floor(Math.random() * allWords.length)

// Create Random Word From Randon Category
let randomWord = Math.floor(Math.random() * allWords[randomCategory].length)

// Create The Random Word
let wordToGuess = allWords[randomCategory][randomWord]
let wordToGuessNoSpaces = wordToGuess.replace(/\s/g ,"")
console.log(wordToGuess)


// Hint Generate
let hint = document.querySelector(".hint")
if (randomCategory <= allWords.length) {
    if (randomCategory === 0) {
        hint.innerHTML = "Programming"
    }

    if (randomCategory === 1) {
        hint.innerHTML = "Football Player"
    }

    if (randomCategory === 2) {
        hint.innerHTML = "Egyption Singer"
    }
}
// Hint Generate


// Generate Inputs 
let inputs = document.querySelector(".inputs")
for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess[i] !== " ") {
        // Create Input Field And Set Data Letter
        let input = document.createElement("input")
        inputs.appendChild(input)
        input.setAttribute("data-letter", wordToGuess[i])
    }
    
    if (wordToGuess[i] === " ") {
        // Create Space Between Words
        let spanSpace = document.createElement("span")
        spanSpace.innerHTML = "Space"
        inputs.appendChild(spanSpace)
    }
}

let allInputs = document.querySelectorAll("input")
let keyboardBox = document.querySelector(".keyboard")




let numberOfTries = 0
let currentImagePart = 0
let nexInput = 0
let gameSuccess = 0


// buttons on Click
keyboardBox.addEventListener("click", function() {
    let currentButton = Array.from(keyboardBox.children)[Array.from(keyboardBox.children).indexOf(event.target)]
    if(currentButton.className === wordToGuessNoSpaces[numberOfTries]) {
        allInputs[numberOfTries].value = wordToGuessNoSpaces[numberOfTries].toUpperCase()
        numberOfTries += 1
        nexInput += 1
        gameSuccess += 1
    } else {
        
        // If You Answerd Wrong letter and it's not included in the word
        if (wordToGuess.search(currentButton.className) === -1) {
            currentButton.style.opacity = "0.8"
            currentButton.style.pointerEvents = "none"
        }

        // If You Answerd Wrong letter But it's included in the word
        if (currentImagePart < 7) {
            imageParts[currentImagePart].style.display = "block"
            currentImagePart += 1
            
        } else {
            // If You Answerd All Wrong
            numberOfTries += 1
            if (currentImagePart === 7) {

                // Lose Msg
                imageParts[currentImagePart].style.display = "block"
                let loseMsg = document.createElement("div")
                loseMsg.className = "lose-msg"
                loseMsg.innerHTML = `You Faild, The Word Is: ${wordToGuess.toUpperCase()}`
                document.body.appendChild(loseMsg)
                
                // Replay Button
                let playAgainButton = document.createElement("button")
                playAgainButton.className = "rep-btn"
                loseMsg.appendChild(playAgainButton)
                playAgainButton.innerHTML = "Try Again !"
                playAgainButton.addEventListener("click" ,function() {
                    window.location.reload()
                })

                // Disable Keyboard
                keyboardBox.style.pointerEvents = "none"
            }
        }
    }

    // When You Answer Right
    if (gameSuccess === wordToGuessNoSpaces.length) {
        // Win Msg
        let wonMsg = document.createElement("div")
        wonMsg.className = "win-msg"
        wonMsg.innerHTML = `Congratulations, You Won After ${numberOfTries + currentImagePart} Tries`
        document.body.appendChild(wonMsg)

        // Replay Button
        let playAgainButton = document.createElement("button")
        playAgainButton.className = "rep-btn"
        wonMsg.appendChild(playAgainButton)
        playAgainButton.innerHTML = "Play Again !"
        playAgainButton.addEventListener("click" ,function() {
            window.location.reload()
        })

        // Disable Keyboard
        keyboardBox.style.pointerEvents = "none"
    }
})



// Mood Change
let moodBtn = document.querySelector(".mood-btn")
let content = document.body
let getMood = localStorage.getItem("mood")


moodBtn.addEventListener("click", () => {
    moodBtn.classList.toggle("active")
    content.classList.toggle("dark")
    if (moodBtn.classList.contains("active")) {
        moodBtn.classList.replace("fa-sun-bright", "fa-moon-stars")
        localStorage.setItem("mood","dark")
    } else {
        moodBtn.classList.replace("fa-moon-stars" ,"fa-sun-bright")
        localStorage.setItem("mood","light")
    }
})

if (getMood === "dark" || moodBtn.classList.contains("fa-moon-stars")) {
    content.classList.add("dark")
    moodBtn.classList.replace("fa-sun-bright", "fa-moon-stars")
}

// Mood Change
