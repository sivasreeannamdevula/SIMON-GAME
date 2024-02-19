var started=false;
var level=0;
var buttonColours=["blue","green","red","yellow"];
var gamePattern=[];
var userClickedPattern=[];
$(document).keypress(function() {
    if(started==false){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=false;
    }
});
function nextSequence(){
    userClickedPattern=[];
    ++level;
    $("#level-title").text("Level "+ level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playMusic(randomChosenColour);

}


$(".btn").click(function(e){
    var userChosenColour= this.id;
    userClickedPattern.push(userChosenColour);
    playMusic(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{

        playMusic("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
      }, 100);
        startOver();


    }
}
function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
      }, 100);
}

function playMusic(color){
    var music=new Audio("sounds/"+color+".mp3");
    music.play();
}
function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
}