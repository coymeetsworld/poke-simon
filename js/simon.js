$(document).ready(function() {

  var bulbasaurSound = new Audio('media/bulbasaur.wav');
  var charmanderSound = new Audio('media/charmander.wav');
  var squirtleSound = new Audio('media/squirtle.wav');
  var pikachuSound = new Audio('media/pikachu.wav');

  $("#sevenSegDisplay").sevenSeg({ digits: 2, value: '--' });


  function playSound(sound) {
    sound.pause(); // in case sound is playing when button is clicked again.
    sound.currentTime = 0;
    sound.play();
  }

  $('.pokemonImage').on('dragstart', function(event) { event.preventDefault(); });
  $('.pokemonImage').on('highlight', function(event) { event.preventDefault(); });


  $("#greenButton").click(function() {
    console.log("Green button pressed.");
    playSound(bulbasaurSound);
  });
  $("#redButton").click(function() {
    console.log("Red button pressed.");
    playSound(charmanderSound);
  });
  $("#blueButton").click(function() {
    console.log("Blue button pressed.");
    playSound(squirtleSound);
  });
  $("#yellowButton").click(function() {
    console.log("Yellow button pressed.");
    playSound(pikachuSound);
  });
  $("#strictButton").click(function() {
    console.log("Strict button pressed.");
  });
  $("#startButton").click(function() {
    console.log("Start button pressed.");
  });
});
