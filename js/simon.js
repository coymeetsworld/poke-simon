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
  var redButtonPressBg = 'linear-gradient(225deg, red 20%, pink )';
  var redButtonBg = 'red';
  var yellowButtonPressBg = 'linear-gradient(45deg, yellow 20%, white)';
  var yellowButtonBg = 'yellow';
  var blueButtonPressBg = 'linear-gradient(315deg, blue 20%, skyblue)';
  var blueButtonBg = 'blue';

  var greenButton = {sound: bulbasaurSound, buttonID: '#greenButton', buttonBG: greenButtonBg, buttonPressBG: greenButtonPressBg};
  var redButton = {sound: charmanderSound, buttonID: '#redButton', buttonBG: redButtonBg, buttonPressBG: redButtonPressBg};
  var yellowButton = {sound: pikachuSound, buttonID: '#yellowButton', buttonBG: yellowButtonBg, buttonPressBG: yellowButtonPressBg};
  var blueButton = {sound: squirtleSound, buttonID: '#blueButton', buttonBG: blueButtonBg, buttonPressBG: blueButtonPressBg};

  var currentMove; /* Move player is currently on. */
  var currentCount; /* Number of moves player has to make. */
  $("#sevenSegDisplay").sevenSeg({ digits: 2, value: '--' });

  /* End Setup */

  var soundPattern;
  function generateSoundPattern() {
    soundPattern = []; /* Resets pattern in event game is reset or started over.*/

    for (var i = 0; i < 20; i++) {
      switch (Math.floor(Math.random() * 4 + 1)) {
        case 1:
          soundPattern.push(bulbasaurSound);
          break;
        case 2:
          soundPattern.push(charmanderSound);
          break;
        case 3:
          soundPattern.push(pikachuSound);
          break;
        case 4:
          soundPattern.push(squirtleSound);
          break;
      }
    }
  }


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


  function startGame() {
    currentMove = 1;
    currentCount = 0;
    generateSoundPattern();
    console.log(soundPattern);
    //showMove();
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
