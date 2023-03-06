var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(".btn").click(handler);
function handler()
{
   var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);
   animatePress(userChosenColour);
   playSound(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
}


function nextSequence()
{
   userClickedPattern=[];
   var randomNumber=Math.random();
   randomNumber=Math.floor(randomNumber *4);
   var randomChosenColour=buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   level++;
   $("h1").text("Level "+level);
}

function playSound(name)
{
   var audio=new Audio("sounds/"+name+".mp3");
   audio.play();  
}

function animatePress(currentColour)
{
   $("#"+currentColour).addClass("pressed");
   setTimeout(function ()
   {
      $("#"+currentColour).removeClass("pressed");
   },100);
}

$(document).keydown(function (){
  if(!started)
  {
   nextSequence();
   $("h1").text("Level "+level);
   started=true;
  }
});

function checkAnswer(currentLevel)
{
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
   {
   
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
   }
   else
   {  
      var  n="wrong";
      playSound(n);
      $("body").addClass("game-over");
      setTimeout(function ()
      {
         $("body").removeClass("game-over");
      },200);
      $("h1").text("game-over,press any key to continue");
      console.log("wrong");
      startOver();
   }
}

function startOver()
{
   gamePattern=[];
   started=false;
   level=0;
}