$(document).ready(function() {

  var bulbasaurSound = new Audio('media/bulbasaur.wav');
  var charmanderSound = new Audio('media/charmander.wav');
  var squirtleSound = new Audio('media/squirtle.wav');
  var pikachuSound = new Audio('media/pikachu.wav');

  $("#sevenSegDisplay").sevenSeg({ digits: 2, value: '--' });

  $("#greenButton").click(function() {
    console.log("Green button pressed.");
    bulbasaurSound.play();
  });
  $("#redButton").click(function() {
    console.log("Red button pressed.");
    charmanderSound.play();
  });
  $("#blueButton").click(function() {
    console.log("Blue button pressed.");
    squirtleSound.play();
  });
  $("#yellowButton").click(function() {
    console.log("Yellow button pressed.");
    pikachuSound.play();
  });
  $("#strictButton").click(function() {
    console.log("Strict button pressed.");
  });
  $("#startButton").click(function() {
    console.log("Start button pressed.");
  });
});
