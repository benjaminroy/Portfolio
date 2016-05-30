var sessionTime = 25;
var breakTime = 5;
var isStarted = false;
var isInSession = true;

var clock = $('.clock').FlipClock(1500,{
    autoStart: false,
    countdown: true,
    clockFace: 'DailyCounter',
    callbacks: {
      interval: function () {
        var time = clock.getTime().time;
        if (time == 0 && isInSession) {
          clock.setTime(breakTime * 60);
          clock.start;
          isInSession = false;
          $('.status').text('In Break!!');
        }
        else if(time == 0 && !isInSession){
          clock.setTime(sessionTime * 60);
          clock.start;
          isInSession = true; 
          $('.status').text('In Session');
        }
      }
    }
});

//Session Length Buttons
$("#plusSessionLength").click(function(){
  sessionTime = sessionTime + 1;
  $("#sessionLength").text(sessionTime);
  
  if(isInSession){
    clock.setTime(sessionTime * 60);
    clock.stop();
  }
});

$("#minusSessionLength").click(function(){
  if (sessionTime == 1)
    return;
  
  sessionTime = sessionTime - 1;
  $("#sessionLength").text(sessionTime);
  
  if(isInSession){
    clock.setTime(sessionTime * 60);
    clock.stop();
  }
});

//Break Length Buttons
$("#plusBreakLength").click(function(){  
  breakTime = breakTime + 1;
  $("#breakLength").text(breakTime);
  
  if(!isInSession){
    clock.setTime(breakTime * 60);
    clock.stop();
  }
});

$("#minusBreakLength").click(function(){
  if (breakTime == 1)
    return;
  
  breakTime = breakTime - 1;
  $("#breakLength").text(breakTime);
  
  if(!isInSession){
    clock.setTime(breakTime * 60);
    clock.stop();
  }
});

$(".startBtn").click(function(){  
  if (!isStarted){
    isStarted = true;
    clock.start();
  }
  else{
    isStarted = false;
    clock.stop();
  }
});

$(".resetBtn").click(function(){
  clock.stop();
  isStarted = false;
  if(isInSession)
    clock.setTime(sessionTime * 60);
  else
    clock.setTime(breakTime * 60);   
});