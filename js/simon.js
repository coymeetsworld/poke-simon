$(document).ready(function() {

  $('.pokemonImage').on('dragstart', function(event) { event.preventDefault(); });
  $('.pokemonImage').on('highlight', function(event) { event.preventDefault(); });

  /* Setup */
  var bulbasaurSound = new Audio('media/bulbasaur.wav');
  var charmanderSound = new Audio('media/charmander.wav');
  var squirtleSound = new Audio('media/squirtle.wav');
  var pikachuSound = new Audio('media/pikachu.wav');
  var greenButtonPressBg = 'linear-gradient(135deg, green 20%, lime )';
  var greenButtonBg = 'green';
  var redButtonPressBg = 'linear-gradient(225deg, darkred 20%, red 45%, pink)';
  var redButtonBg = 'darkred';
  var yellowButtonPressBg = 'linear-gradient(45deg, goldenrod 5%, yellow 45%, white)';
  var yellowButtonBg = 'goldenrod';
  var blueButtonPressBg = 'linear-gradient(315deg, blue 20%, skyblue)';
  var blueButtonBg = 'darkblue';

  var greenButton = {sound: bulbasaurSound, buttonID: '#greenButton', buttonBG: greenButtonBg, buttonPressBG: greenButtonPressBg};
  var redButton = {sound: charmanderSound, buttonID: '#redButton', buttonBG: redButtonBg, buttonPressBG: redButtonPressBg};
  var yellowButton = {sound: pikachuSound, buttonID: '#yellowButton', buttonBG: yellowButtonBg, buttonPressBG: yellowButtonPressBg};
  var blueButton = {sound: squirtleSound, buttonID: '#blueButton', buttonBG: blueButtonBg, buttonPressBG: blueButtonPressBg};


  $("#sevenSegDisplay").sevenSeg({ digits: 2, value: '--' });

  /* End Setup */

  var buttonPattern;
  function generateButtonPattern() {
    buttonPattern = []; /* Resets pattern in event game is reset or started over.*/

    for (var i = 0; i < 20; i++) {
      switch (Math.floor(Math.random() * 4 + 1)) {
        case 1:
          buttonPattern.push(greenButton);
          break;
        case 2:
          buttonPattern.push(redButton);
          break;
        case 3:
          buttonPattern.push(yellowButton);
          break;
        case 4:
          buttonPattern.push(blueButton);
          break;
      }
    }
  }

  /* Function when user presses a button. */
  var timeOut;
  function chooseMove(buttonObj) {

    if (timeOut) {
      setTimeout(function() {
        $(buttonObj.buttonID).css('background', buttonObj.buttonBG);
      }, 100);
    }
    $(buttonObj.buttonID).css('background', buttonObj.buttonPressBG);
    timeOut = setTimeout(function(){
        $(buttonObj.buttonID).css('background', buttonObj.buttonBG);
        timeOut = null;
    }, 750);
    buttonObj.sound.pause(); // in case sound is playing when button is clicked again.
    buttonObj.sound.currentTime = 0;
    buttonObj.sound.play();
  }


  /* Function when computer shows a button to press. */
  function showMove(buttonObj) {
    var movesShown = 0;
    var myInterval;
    function timer() {

      if (movesShown == currentCount) {
        clearInterval(myInterval);
      }

      $(buttonPattern[movesShown].buttonID).css('background', buttonPattern[movesShown].buttonPressBG);
      setTimeout(function(){
        console.log("Shutting down: " + buttonPattern[movesShown-1].buttonID);
        $(buttonPattern[movesShown-1].buttonID).css('background', buttonPattern[movesShown-1].buttonBG);
      }, 500);

      buttonPattern[movesShown].sound.play();

      movesShown++;
    }

    myInterval = setInterval(timer, 2000);
  }



  var currentMove; /* Move player is currently on. */
  var currentCount; /* Number of moves player has to make. */
  function showCurrentPattern() {
    showMove();
  }


  function startGame() {
    currentMove = 1;
    currentCount = 3;
    generateButtonPattern();
    console.log(buttonPattern);
    showCurrentPattern();
  }


  $("#greenButton").click(function() {
    console.log("Green button pressed.");
    chooseMove(greenButton);
  });
  $("#redButton").click(function() {
    console.log("Red button pressed.");
    chooseMove(redButton);
  });
  $("#blueButton").click(function() {
    console.log("Blue button pressed.");
    chooseMove(blueButton);
  });
  $("#yellowButton").click(function() {
    console.log("Yellow button pressed.");
    chooseMove(yellowButton);
  });
  $("#strictButton").click(function() {
    console.log("Strict button pressed.");
  });
  $("#startButton").click(function() {
    console.log("Start button pressed.");
    startGame();
  });
});
