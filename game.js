var level = 0;
var gameSequence = [];
var userClicked = [];
var score = 0;

var player_name = prompt("Enter your name");

$(document).keypress(function(){
    $("body").removeClass("wrong");
    if(level==0){
        start(++level);
    }
});

var music = ["music/green.mp3","music/blue.mp3","music/yellow.mp3","music/red.mp3"];

$(".btn").click(function(){
    var userclick = $(this).attr("id");
    userClicked.push(userclick);
    check(userclick);
})

function soundAndAnimationClick(i){
    $("."+i).click(()=>new Audio(music[i]).play());
    $("."+i).click(()=>$("."+i).fadeOut(100).fadeIn(100));
}

function soundAndAnimation(i){
    $("."+i).fadeOut(500).fadeIn(500);
    new Audio(music[i]).play();
}

for(var i=0;i<music.length;i++){
    soundAndAnimationClick(i);
}

function start(level){    
    $("h1").text("Level "+ level);
    gameON(level);
}

function gameON(level){
    for(var i=0;i<level;i++){
        var val = Math.floor(Math.random()*4)
        gameSequence.push(val);
    }
    blinkPattern(gameSequence)
}

// blink pattern:
function blinkPattern(pattern){
    console.log(pattern);
    for(var i=0;i<pattern.length;i++){
        setTimeout(soundAndAnimation, i*1000, pattern[i]);
    }
}

var temp = 0;
function check(clicks){
    if(gameSequence[temp]==clicks){
        ++temp;
        if(gameSequence.length==userClicked.length){
            gameSequence = [];
            userClicked = [];
            temp=0;
            score+=1;
            setTimeout(start, 800, ++level);
        }
    }
    else
        gameOver();
}

function gameOver(){
    gameSequence=[];
    userClicked=[];
    new Audio("music/wrong.mp3").play();
    $("body").addClass("wrong");
    $("h1").html("Game Over! Press any key to start.<br><br>"+ player_name +" Score:"+score);
    level=0;
    score=0;
    temp=0;
}