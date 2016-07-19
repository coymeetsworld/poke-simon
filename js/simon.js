$(document).ready(function() {

  $('.pokemonImage').on('dragstart', function(event) { event.preventDefault(); });
  $('.pokemonImage').on('highlight', function(event) { event.preventDefault(); });

  /* Setup */
  var bulbasaurSound = new Audio('media/sounds/bulbasaur.wav');
  bulbasaurSound.volume = 0.1;
  var charmanderSound = new Audio('media/sounds/charmander.wav');
  charmanderSound.volume = 0.1;
  var squirtleSound = new Audio('media/sounds/squirtle.wav');
  squirtleSound.volume = 0.1;
  var pikachuSound = new Audio('media/sounds/pikachu.wav');
  pikachuSound.volume = 0.1;
  var psyduckSound = new Audio('media/sounds/psyduck.mp3');
  psyduckSound.volume = 0.1;
  var victorySound = new Audio('media/sounds/victory.mp3');
  victorySound.volume = 0.05;

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

  $("#sevenSegDisplay").sevenSeg({ digits: 2, value: '' });


  function disableButtons() {
    console.log("Buttons are disabled");
    $("#greenButton").css('pointer-events', 'none');
    $("#redButton").css('pointer-events', 'none');
    $("#yellowButton").css('pointer-events', 'none');
    $("#blueButton").css('pointer-events', 'none');
  }

  function enableButtons() {
    console.log("Buttons are enabled");
    $("#greenButton").css('pointer-events', 'auto');
    $("#redButton").css('pointer-events', 'auto');
    $("#yellowButton").css('pointer-events', 'auto');
    $("#blueButton").css('pointer-events', 'auto');
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
  disableButtons();

  var gameOn = false;
  $("#startButton").click(function() {
    console.log("Start button pressed.");
    startGame();
  });

  var strictMode = false;
  $("#strictButton").click(function() {
    console.log("Strict button pressed.");
    toggleStrictOption();
  });

  $("#resetButton").click(function() {
    console.log("Reset button pressed.");
    resetGame();
  });

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


  function victory() {
    victorySound.play();
    disableButtons();
    gameOn = false;

    setTimeout(function(){
      $("#startButton").css('pointer-events', 'none');
      $('#victorySection .pokeText').text("It's super effective!");
      $('#greenButton').css('background', greenButton.buttonPressBG);
      $('#redButton').css('background', redButton.buttonPressBG);
      $('#yellowButton').css('background', yellowButton.buttonPressBG);
      $('#blueButton').css('background', blueButton.buttonPressBG);
      $("#sevenSegDisplay").sevenSeg({ digits: 2, value: '88' });
    }, 1000);

    setTimeout(function(){
      $("#startButton").css('pointer-events', 'auto');
      $('#victorySection .pokeText').text("");
      $('#greenButton').css('background', greenButton.buttonBG);
      $('#redButton').css('background', redButton.buttonBG);
      $('#yellowButton').css('background', yellowButton.buttonBG);
      $('#blueButton').css('background', blueButton.buttonBG);
      showStartButtonOff();
      $("#sevenSegDisplay").sevenSeg({ digits: 2, value: '--' });
    }, 24000);
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

    if (buttonObj != buttonPattern[currentMove]) {
      console.log("False!");
      disableButtons();
      //buttonObj.sound.pause(); // in case sound is playing when button is clicked again.
      //buttonObj.sound.currentTime = 0;
      $("#sevenSegDisplay").sevenSeg({ digits: 2, value: '--' });
      psyduckSound.play();
      currentMove = 0;

      if(strictMode) {
        currentCount = 1;
        generateButtonPattern(); /* Game starts over, new pattern created. */
      }
      setTimeout(showCurrentPattern, 3000);
    } else {
      console.log("Correct");
      buttonObj.sound.pause(); // in case sound is playing when button is clicked again.
      buttonObj.sound.currentTime = 0;
      buttonObj.sound.play();
      currentMove++;
      if (currentMove == currentCount) {
        if (currentMove == 20) {
          victory();
        } else {
          currentCount++;
          currentMove = 0;
          showCurrentPattern();
        }
      }
    }
  }


  /* Function when computer shows a button to press. */
  var myInterval;
  function showMove() {
    var movesShown = 0;

    function timer() {
      if (movesShown == currentCount) {
        clearInterval(myInterval);
        enableButtons();
        return;
      }
      $(buttonPattern[movesShown].buttonID).css('background', buttonPattern[movesShown].buttonPressBG);
      setTimeout(function() {
        console.log("Shutting down: " + buttonPattern[movesShown-1].buttonID);
        $(buttonPattern[movesShown-1].buttonID).css('background', buttonPattern[movesShown-1].buttonBG);
      }, 500);
      buttonPattern[movesShown].sound.play();
      movesShown++;
    }
    myInterval = setInterval(timer, 1500);
  }


  var currentMove; /* Move player is currently on. */
  var currentCount; /* Number of moves player has to make. */
  function showCurrentPattern() {
    console.log("calling showCurrentPattern");
    disableButtons();
    var showVal;
    if (currentCount < 10) {
      showVal = '0' + currentCount.toString();
    } else {
      showVal = currentCount.toString();
    }
    console.log("ShowVal: " + showVal);
    $("#sevenSegDisplay").sevenSeg({ digits: 2, value: showVal });
    showMove();
  }


  function showStartButtonOn() {
    $("#startButton").css('background', 'radial-gradient(at 50%, pink 5%, red)');
    $("#startButton").css('border', '2px solid black');
    $("#startButton").css('left', '1px');
  }


  function showStartButtonOff() {
    $("#startButton").css('background', 'darkred');
    $("#startButton").css('border', '3px solid black');
    $("#startButton").css('left', '0px');
  }


  function startGame() {
    if (gameOn) {
      disableButtons();
      showStartButtonOff();
      clearInterval(myInterval);
      $("#sevenSegDisplay").sevenSeg({ value: '' });
      gameOn = false;
    } else {
      gameOn = true;
      showStartButtonOn();
      currentMove = 0;
      currentCount = 1;
      generateButtonPattern();
      console.log(buttonPattern);
      showCurrentPattern();
    }
  }


  function toggleStrictOption() {
    if (strictMode) {
      strictMode = false;
      $("#strictButton").css('background', 'gold');
      $("#strictButton").css('border', '3px solid black');
      $("#strictButton").css('left', '0px');
    } else {
      strictMode = true;
      $("#strictButton").css('background', 'radial-gradient(at 50%, yellow 5%, gold)');
      $("#strictButton").css('border', '2px solid black');
      $("#strictButton").css('left', '1px');
    }
  }


  function resetGame() {
    if (gameOn) {
      disableButtons();
      clearInterval(myInterval);
      currentMove = 0;
      currentCount = 1;
      //do not generate Pattern here. Game should use same pattern from current game.
      showCurrentPattern();
    }
  }
});
