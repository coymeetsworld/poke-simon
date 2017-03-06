$(document).ready(function() {
  
  const BLUE_BUTTON_ID = "#blue-btn";
  const GREEN_BUTTON_ID = "#green-btn";
  const RED_BUTTON_ID = "#red-btn";
  const YELLOW_BUTTON_ID = "#yellow-btn";
  const SEVEN_SEG_DISPLAY_ID = "#seven-seg-display";
  const START_BUTTON_ID = "#start-btn";
  const STRICT_BUTTON_ID = "#strict-btn";
  const RESET_BUTTON_ID = "#reset-btn";
  const MOVES_TO_WIN_GAME = 20;
  
  $('.pokemon-img').on('dragstart', event => event.preventDefault());
  $('.pokemon-img').on('highlight', event => event.preventDefault());

  /* Setup */
  let bulbasaurSound = new Audio('media/sounds/bulbasaur.wav');
  bulbasaurSound.volume = 0.1;
  let charmanderSound = new Audio('media/sounds/charmander.wav');
  charmanderSound.volume = 0.1;
  let squirtleSound = new Audio('media/sounds/squirtle.wav');
  squirtleSound.volume = 0.1;
  let pikachuSound = new Audio('media/sounds/pikachu.wav');
  pikachuSound.volume = 0.1;
  let psyduckSound = new Audio('media/sounds/psyduck.mp3');
  psyduckSound.volume = 0.1;
  let victorySound = new Audio('media/sounds/victory.mp3');
  victorySound.volume = 0.05;

  const GREEN_BUTTON_PRESSED_BG = 'linear-gradient(135deg, green 20%, lime )';
  const GREEN_BUTTON_BG = 'green';
  const RED_BUTTON_PRESSED_BG = 'linear-gradient(225deg, darkred 20%, red 45%, pink)';
  const RED_BUTTON_BG = 'darkred';
  const YELLOW_BUTTON_PRESSED_BG = 'linear-gradient(45deg, goldenrod 5%, yellow 45%, white)';
  const YELLOW_BUTTON_BG = 'goldenrod';
  const BLUE_BUTTON_PRESSED_BG = 'linear-gradient(315deg, blue 20%, skyblue)';
  const BLUE_BUTTON_BG = 'darkblue';

  const GREEN_BUTTON = {sound: bulbasaurSound, buttonID: GREEN_BUTTON_ID, buttonBG: GREEN_BUTTON_BG, buttonPressBG: GREEN_BUTTON_PRESSED_BG};
  const RED_BUTTON = {sound: charmanderSound, buttonID: RED_BUTTON_ID, buttonBG: RED_BUTTON_BG, buttonPressBG: RED_BUTTON_PRESSED_BG};
  const YELLOW_BUTTON = {sound: pikachuSound, buttonID: YELLOW_BUTTON_ID, buttonBG: YELLOW_BUTTON_BG, buttonPressBG: YELLOW_BUTTON_PRESSED_BG};
  const BLUE_BUTTON = {sound: squirtleSound, buttonID: BLUE_BUTTON_ID, buttonBG: BLUE_BUTTON_BG, buttonPressBG: BLUE_BUTTON_PRESSED_BG};

  $(SEVEN_SEG_DISPLAY_ID).sevenSeg({ digits: 2, value: '' });


  function disableButtons() {
    $(GREEN_BUTTON_ID).css('pointer-events', 'none');
    $(RED_BUTTON_ID).css('pointer-events', 'none');
    $(YELLOW_BUTTON_ID).css('pointer-events', 'none');
    $(BLUE_BUTTON_ID).css('pointer-events', 'none');
  }

  function enableButtons() {
    $(GREEN_BUTTON_ID).css('pointer-events', 'auto');
    $(RED_BUTTON_ID).css('pointer-events', 'auto');
    $(YELLOW_BUTTON_ID).css('pointer-events', 'auto');
    $(BLUE_BUTTON_ID).css('pointer-events', 'auto');
  }

  $(GREEN_BUTTON_ID).click(() => {
    chooseMove(GREEN_BUTTON);
  });
  $(RED_BUTTON_ID).click(() => {
    chooseMove(RED_BUTTON);
  });
  $(BLUE_BUTTON_ID).click(() => {
    chooseMove(BLUE_BUTTON);
  });
  $(YELLOW_BUTTON_ID).click(() => {
    chooseMove(YELLOW_BUTTON);
  });
  disableButtons();

  let gameOn = false;
  $(START_BUTTON_ID).click(() => {
    startGame();
  });

  let strictMode = false;
  $(STRICT_BUTTON_ID).click(() => {
    toggleStrictOption();
  });

  $(RESET_BUTTON_ID).click(() => {
    resetGame();
  });

  let buttonPattern;
  function generateButtonPattern() {
    buttonPattern = []; /* Resets pattern in event game is reset or started over.*/

    for (let i = 0; i < MOVES_TO_WIN_GAME; i++) {
      switch (Math.floor(Math.random() * 4 + 1)) {
        case 1:
          buttonPattern.push(GREEN_BUTTON);
          break;
        case 2:
          buttonPattern.push(RED_BUTTON);
          break;
        case 3:
          buttonPattern.push(YELLOW_BUTTON);
          break;
        case 4:
          buttonPattern.push(BLUE_BUTTON);
          break;
      }
    }
  }


  function victory() {
    victorySound.play();
    disableButtons();
    gameOn = false;

    setTimeout(() => {
      $(START_BUTTON_ID).css('pointer-events', 'none');
      $('#victory-section .poke-text').text("It's super effective!");
      $(GREEN_BUTTON_ID).css('background', greenButton.buttonPressBG);
      $(RED_BUTTON_ID).css('background', redButton.buttonPressBG);
      $(YELLOW_BUTTON_ID).css('background', yellowButton.buttonPressBG);
      $(BLUE_BUTTON_ID).css('background', blueButton.buttonPressBG);
      $(SEVEN_SEG_DISPLAY_ID).sevenSeg({ digits: 2, value: '88' });
    }, 1000);

    setTimeout(() => {
      $(START_BUTTON_ID).css('pointer-events', 'auto');
      $('#victory-section .poke-text').text("");
      $(GREEN_BUTTON_ID).css('background', greenButton.buttonBG);
      $(RED_BUTTON_ID).css('background', redButton.buttonBG);
      $(YELLOW_BUTTON_ID).css('background', yellowButton.buttonBG);
      $(BLUE_BUTTON_ID).css('background', blueButton.buttonBG);
      showStartButtonOff();
      $(SEVEN_SEG_DISPLAY_ID).sevenSeg({ digits: 2, value: '--' });
    }, 24000);
  }


  /* Function when user presses a button. */
  let timeOut;
  function chooseMove(buttonObj) {

    if (timeOut) {
      setTimeout(() => {
        $(buttonObj.buttonID).css('background', buttonObj.buttonBG);
      }, 100);
    }
    $(buttonObj.buttonID).css('background', buttonObj.buttonPressBG);
    timeOut = setTimeout(() => {
        $(buttonObj.buttonID).css('background', buttonObj.buttonBG);
        timeOut = null;
    }, 750);

    if (buttonObj != buttonPattern[currentMove]) {
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
      buttonObj.sound.pause(); // in case sound is playing when button is clicked again.
      buttonObj.sound.currentTime = 0;
      buttonObj.sound.play();
      currentMove++;
      if (currentMove === currentCount) {
        if (currentMove === MOVES_TO_WIN_GAME) {
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
  let myInterval;
  function showMove() {
    let movesShown = 0;

    function timer() {
      if (movesShown === currentCount) {
        clearInterval(myInterval);
        enableButtons();
        return;
      }
      $(buttonPattern[movesShown].buttonID).css('background', buttonPattern[movesShown].buttonPressBG);
      setTimeout(() => {
        $(buttonPattern[movesShown-1].buttonID).css('background', buttonPattern[movesShown-1].buttonBG);
      }, 500);
      buttonPattern[movesShown].sound.play();
      movesShown++;
    }
    myInterval = setInterval(timer, 1500);
  }


  let currentMove; /* Move player is currently on. */
  let currentCount; /* Number of moves player has to make. */
  function showCurrentPattern() {
    disableButtons();
    let showVal;
    if (currentCount < 10) {
      showVal = '0' + currentCount.toString();
    } else {
      showVal = currentCount.toString();
    }
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

  $('#my-about').click(() => {
    $('#my-modal').css('display', 'block');
  });

  $('.close').click(() => {
    $('#my-modal').css('display', 'none');
  });

  // When the user clicks anywhere outside of the modal, close it
  $(window).click((event) => {
    if ($(event.target).is('#my-modal') && !$(event.target).is('#my-about')) {
      $('#my-modal').css('display', 'none');
    }
  });

  /** End Modal **/

});
