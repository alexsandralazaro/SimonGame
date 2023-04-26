// This array keeps the sequence of colors choosen by the game
var gamePattern = [];

// This array keeps the sequence of colors choosen by the player
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

// 1. The player presses any key to start the game
$(document).keypress(function(){
    if (!gameStarted){  
        nextSequence();   
        gameStarted = true;     
    }    
 });

// 2. A random button is selected (animated)
function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    playSound(randomChosenColour);
    animatePress(randomChosenColour);    
}

// 3. The player clicks a button 
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);   

    checkAnswer(userClickedPattern.length - 1);
;    
});

// 4. Check if player answers are right or wrong
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);

            userClickedPattern = [];
        }
    }
    
    else {
        var WrongAudio = new Audio("sounds/wrong.mp3");    
        WrongAudio.play();
        
        $("body").addClass("game-over");        

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");        
        
        startOver();
    }
 }

 // It Starts the game over 
 function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
 }

 // Play sound when a button is pressed or clicked
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");    
    audio.play();
}

// Animate the button when it is pressed or clicked
function animatePress(currentColour) {

    var activeButton = $("."+currentColour);
    activeButton.addClass("pressed");   

     setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);
}