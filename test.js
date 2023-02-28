function loadGame(){
    let wordList = [
        "banana",
        "apple",
        "berry",
        "melon",
        "carrot",
        "tomato",
        "sefactory",
      ];
      
      // chose a random word from the list using math.random
      let wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
      
      let gameState = {
          word: wordToGuess,
          remainingGuesses: 6,
          lettersGuessed: new Set(),
          displayWord: "_".repeat(wordToGuess.length),
        };
        
        // dictionary for different game states
        const messages = {
          win: "Congratulations, you guessed the word!",
          lose: "Sorry, you ran out of guesses. The word was " + gameState.word + ".",
          guessed: "You already guessed that letter. Please try again.",
          invalid: "Invalid input. Please enter a letter."
        };
        
        // images including user lives
        let hangmanImages = [
          "resources/1.png",
          "resources/2.png",
          "resources/3.png",
          "resources/4.png",
          "resources/5.png",
          "resources/6.png"
        ];
        
        // update images
        function updateHangmanImage() {
          let hangmanImageIndex = hangmanImages.length - gameState.remainingGuesses;
          let hangmanImage = document.getElementById("image");
          hangmanImage.src = hangmanImages[hangmanImageIndex];
        }
        
        //get elemetns
        let guessInput = document.getElementById("input");
        let guessButton = document.getElementById("mybutton");
        
        // add listener
        guessButton.addEventListener("click", function() {
          // Get the user's guess from the input element
          let guess = guessInput.value.trim();
        
          // Clear the input element
          guessInput.value = "";
        
          // Handle invalid input
          if (!guess || guess.length !== 1 || !guess.match(/[a-zA-Z]/)) {
            alert(messages.invalid);
            return;
          }
        
          // Handle already guessed letters
          if (gameState.lettersGuessed.has(guess.toLowerCase())) {
            alert(messages.guessed);
            return;
          }
        
          // Update the game state with the new guess
          gameState.lettersGuessed.add(guess.toLowerCase());
          let guessInWord = false;
          for (let i = 0; i < gameState.word.length; i++) {
            if (gameState.word[i].toLowerCase() === guess.toLowerCase()) {
              let displayWordArray = gameState.displayWord.split(" ");
              displayWordArray[i] = guess.toLowerCase();
              gameState.displayWord = displayWordArray.join(" ");
              guessInWord = true;
            }
          }
          if (!guessInWord) {
            gameState.remainingGuesses--;
          }
        
          // Update images
          updateHangmanImage();
          alert(gameState.displayWord);
        
          // Check if the game is over
          if (gameState.remainingGuesses === 0) {
            alert(messages.lose);
          } else if (!gameState.displayWord.includes("_")) {
            document.getElementById("word").innerHTML=messages.win;
          }
        });
}