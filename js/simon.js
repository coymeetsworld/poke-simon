$(document).ready(function() {
  
  const BLUE_BUTTON_ID = "#blue-btn";
  const GREEN_BUTTON_ID = "#green-btn";
  const RED_BUTTON_ID = "#red-btn";
  const YELLOW_BUTTON_ID = "#yellow-btn";
  const SEVEN_SEG_DISPLAY_ID = "#seven-seg-display";
  const START_BUTTON_ID = "#start-btn";
  const STRICT_BUTTON_ID = "#strict-btn";
  const RESET_BUTTON_ID = "#reset-btn";
  
  $('.pokemon-img').on('dragstart', function(event) { event.preventDefault(); });
  $('.pokemon-img').on('highlight', function(event) { event.preventDefault(); });

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

  var greenButton = {sound: bulbasaurSound, buttonID: GREEN_BUTTON_ID, buttonBG: greenButtonBg, buttonPressBG: greenButtonPressBg};
  var redButton = {sound: charmanderSound, buttonID: RED_BUTTON_ID, buttonBG: redButtonBg, buttonPressBG: redButtonPressBg};
  var yellowButton = {sound: pikachuSound, buttonID: YELLOW_BUTTON_ID, buttonBG: yellowButtonBg, buttonPressBG: yellowButtonPressBg};
  var blueButton = {sound: squirtleSound, buttonID: BLUE_BUTTON_ID, buttonBG: blueButtonBg, buttonPressBG: blueButtonPressBg};

  $(SEVEN_SEG_DISPLAY_ID).sevenSeg({ digits: 2, value: '' });


  function disableButtons() {
    console.log("Buttons are disabled");
    $(GREEN_BUTTON_ID).css('pointer-events', 'none');
    $(RED_BUTTON_ID).css('pointer-events', 'none');
    $(YELLOW_BUTTON_ID).css('pointer-events', 'none');
    $(BLUE_BUTTON_ID).css('pointer-events', 'none');
  }

  function enableButtons() {
    console.log("Buttons are enabled");
    $(GREEN_BUTTON_ID).css('pointer-events', 'auto');
    $(RED_BUTTON_ID).css('pointer-events', 'auto');
    $(YELLOW_BUTTON_ID).css('pointer-events', 'auto');
    $(BLUE_BUTTON_ID).css('pointer-events', 'auto');
  }

  $(GREEN_BUTTON_ID).click(function() {
    console.log("Green button pressed.");
    chooseMove(greenButton);
  });
  $(RED_BUTTON_ID).click(function() {
    console.log("Red button pressed.");
    chooseMove(redButton);
  });
  $(BLUE_BUTTON_ID).click(function() {
    console.log("Blue button pressed.");
    chooseMove(blueButton);
  });
  $(YELLOW_BUTTON_ID).click(function() {
    console.log("Yellow button pressed.");
    chooseMove(yellowButton);
  });
  disableButtons();

  var gameOn = false;
  $(START_BUTTON_ID).click(function() {
    console.log("Start button pressed.");
    startGame();
  });

  var strictMode = false;
  $(STRICT_BUTTON_ID).click(function() {
    console.log("Strict button pressed.");
    toggleStrictOption();
  });

  $(RESET_BUTTON_ID).click(function() {
    console.log("Reset button pressed.");
    resetGame();
  });

  /* End Setup */


  var buttonPattern;
  function generateButtonPattern() {
    buttonPattern = []; /* Resets pattern in event game is reset or started over.*/

    buttonPattern.push(greenButton);
    buttonPattern.push(blueButton);
    buttonPattern.push(redButton);
    buttonPattern.push(yellowButton);
    /* Commented out for testing 
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
    */
  }


  function victory() {
    victorySound.play();
    disableButtons();
    gameOn = false;

    setTimeout(function(){
      $(START_BUTTON_ID).css('pointer-events', 'none');
      $('#victory-section .pokeText').text("It's super effective!");
      $(GREEN_BUTTON_ID).css('background', greenButton.buttonPressBG);
      $(RED_BUTTON_ID).css('background', redButton.buttonPressBG);
      $(YELLOW_BUTTON_ID).css('background', yellowButton.buttonPressBG);
      $(BLUE_BUTTON_ID).css('background', blueButton.buttonPressBG);
      $(SEVEN_SEG_DISPLAY_ID).sevenSeg({ digits: 2, value: '88' });
    }, 1000);

    setTimeout(function(){
      $(START_BUTTON_ID).css('pointer-events', 'auto');
      $('#victory-section .pokeText').text("");
      $(GREEN_BUTTON_ID).css('background', greenButton.buttonBG);
      $(RED_BUTTON_ID).css('background', redButton.buttonBG);
      $(YELLOW_BUTTON_ID).css('background', yellowButton.buttonBG);
      $(BLUE_BUTTON_ID).css('background', blueButton.buttonBG);
      showStartButtonOff();
      $(SEVEN_SEG_DISPLAY_ID).sevenSeg({ digits: 2, value: '--' });
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
      $(SEVEN_SEG_DISPLAY_ID).sevenSeg({ digits: 2, value: '--' });
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
    $(SEVEN_SEG_DISPLAY_ID).sevenSeg({ digits: 2, value: showVal });
    showMove();
  }


  function showStartButtonOn() {
    $(START_BUTTON_ID).css('background', 'radial-gradient(at 50%, pink 5%, red)');
    $(START_BUTTON_ID).css('border', '2px solid black');
    $(START_BUTTON_ID).css('left', '1px');
  }


  function showStartButtonOff() {
    $(START_BUTTON_ID).css('background', 'darkred');
    $(START_BUTTON_ID).css('border', '3px solid black');
    $(START_BUTTON_ID).css('left', '0px');
  }


  function startGame() {
    if (gameOn) {
      disableButtons();
      showStartButtonOff();
      clearInterval(myInterval);
      $(SEVEN_SEG_DISPLAY_ID).sevenSeg({ value: '' });
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
      $(STRICT_BUTTON_ID).css('background', 'gold');
      $(STRICT_BUTTON_ID).css('border', '3px solid black');
      $(STRICT_BUTTON_ID).css('left', '0px');
    } else {
      strictMode = true;
      $(STRICT_BUTTON_ID).css('background', 'radial-gradient(at 50%, yellow 5%, gold)');
      $(STRICT_BUTTON_ID).css('border', '2px solid black');
      $(STRICT_BUTTON_ID).css('left', '1px');
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

  /** Modal **/

  $('#my-about').click(function() {
    $('#my-modal').css('display', 'block');
  });

  $('.close').click(function() {
    $('#my-modal').css('display', 'none');
  });

  // When the user clicks anywhere outside of the modal, close it
  $(window).click(function(event) {
    if ($(event.target).is('#my-modal') && !$(event.target).is('#my-about')) {
      $('#my-modal').css('display', 'none');
    }
  });

  /** End Modal **/

});
