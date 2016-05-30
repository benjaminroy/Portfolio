// Variables
var tile = [];
var isStrictActivated = false;
var buttonsSequence = [];
var audioGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audioRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audioBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audioYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

$( document ).ready(function() {
    $(".strictBtnStatus").hide();
    $(".victory").css("visibility", "hidden");;
    $('#toggle').bootstrapToggle('off')
});

$('.green').click(function(){
  greenAnimated();
  buttonsSequence.push(parseInt(this.id));
  checkSequence();
});
$('.red').click(function(){
  redAnimated();
  buttonsSequence.push(parseInt(this.id));
  checkSequence();
});
$('.blue').click(function(){
  blueAnimated();
  buttonsSequence.push(parseInt(this.id));
  checkSequence();
});
$('.yellow').click(function(){
  yellowAnimated();
  buttonsSequence.push(parseInt(this.id));
  checkSequence();
});
$(".startBtn").click(function(){
  startGame();
});

function greenAnimated(){
  var $this = $(".green");
  audioGreen.play();
  $($this).css("background-color","#66FF66");
  
  window.setTimeout(function() {
    $this.css("background-color","green");
  }, 700);
}
function redAnimated(){
    var $this = $(".red");
    audioRed.play();
    $($this).css("background-color","#FF6666");

    window.setTimeout(function() {
        $this.css("background-color","red");
    }, 700);  
}
function yellowAnimated(){
  var $this = $(".yellow");
  audioYellow.play();
  $($this).css("background-color","#FFFF66")
  
  window.setTimeout(function() {
    $this.css("background-color","yellow");
  }, 700);
}
function blueAnimated(){
  var $this = $(".blue");
  audioBlue.play();
  $($this).css("background-color","#66B2FF");
  
  window.setTimeout(function() {
    $this.css("background-color","blue");
  }, 700);
}

function startGame(){
  $(".victory").css("visibility", "hidden");
  $(".score").text("--");
  $(".score").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

  window.setTimeout(function() {
    tile = [];
    buttonsSequence = [];
    $(".score").text("00");
    addMoveToSequence();  
  }, 1000);
}

function addMoveToSequence(){
  buttonsSequence = [];
  var randomTile = Math.floor((Math.random() * 4) + 1);
  tile.push(randomTile);
  animate(tile);
}

function animate(sequence) {
 var i = 0;
 disableButton(true);
 var interval = setInterval(function() {
   if($("#toggle").prop('checked') == false){
    clearInterval(interval);
    return;
   }
   if(sequence[i] == 1) 
     greenAnimated();
   else if(sequence[i] == 2) 
     redAnimated();
   else if(sequence[i] == 3) 
     yellowAnimated();
   else 
     blueAnimated();
   i++;
   if (i >= sequence.length) {
     clearInterval(interval);
     disableButton(false);
   }
 }, 1000);
}

function checkSequence(){
  if(buttonsSequence[buttonsSequence.length - 1] !== tile[buttonsSequence.length - 1]){
    $(".score").text("!!");
    $(".score").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

    if(!isStrictActivated){
      buttonsSequence = [];
      animate(tile);
      return;
    }
    else{
      startGame();
      return;
    }
    
  }
  
  if(buttonsSequence.length === 20){
    $(".victory").css("visibility", "visible");
    $(".victory").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
  }
  
  else if(buttonsSequence.length === tile.length){
    var score = buttonsSequence.length;
    if(buttonsSequence.length < 10)
      score = "0" + buttonsSequence.length;
    $(".score").text(score);
    addMoveToSequence();
  }
}

function disableButton(isDisabled){
  if($("#toggle").prop('checked') == false)
    isDisabled = true;
  $('.blue').prop('disabled', isDisabled);
  $('.yellow').prop('disabled', isDisabled);
  $('.red').prop('disabled', isDisabled);
  $('.green').prop('disabled', isDisabled);
}

$('.checkbox').click(function(){
  if($("#toggle").prop('checked'))
    toggleOff();
  else
    toggleOn();  
});
function toggleOn(){
  disableButton(false);
  $(".score").text("--");
  $(".startBtn").prop('disabled', false);
  $(".strictBtn").prop('disabled', false);
}
function toggleOff(){
  disableButton(true);
  $(".strictBtnStatus").hide(); // À mettre ds une fonction
  isStrictActivated = false; //
  $(".score").text("");
  $(".startBtn").prop('disabled', true);
  $(".strictBtn").prop('disabled', true);
}

$('.strictBtn').click(function(){
  if(isStrictActivated){
    $(".strictBtnStatus").hide();
    isStrictActivated = false;
  }
  else{
    $(".strictBtnStatus").show();
    isStrictActivated = true;
  }
});