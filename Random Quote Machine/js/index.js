var count = 0;

var wordArray = ["Imagination is more important than knowledge. For knowledge is limited to all we now know and understand, while imagination embraces the entire world, and all there ever will be to know and understand.", 
                 
                 "Try not to become a man of success, but rather try to become a man of value.", 

                 "I, at any rate, am convinced that He (God) does not throw dice.", 
                 
                 "The important thing is not to stop questioning; curiosity has its own reason for existing.", 
                 
                 "Science without religion is lame, religion without science is blind.", 
                 
                 "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
                
                "Life is like riding a bicycle. To keep your balance, you must keep moving.",
                
                "Anyone who has never made a mistake has never tried anything new.",
                 
                 "If you can't explain it to a six year old, you don't understand it yourself.",
                 
                 "When you are courting a nice girl an hour seems like a seconde. When you site on a red-hot cinder a second seems like an hour. That's relativity.",
                 
                 "I have no special talents. I am only passionately curious.",
                 
                 "Education is what remains after one has forgotten what one has learned in school.",
                 
                 "Any fool can know. The point is to understand.",
                 
                "I know not with what weapons World War III will be fought, but World War IV will be fought with sticks and stone.",
                 
                 "You never fail until you stop trying.",
                 
                 "Everything must be made as simple as possible. But no simpler.",
                 
                 "What is right is not always popular and what is popular is not always right.",
                 
                 "In the middle of difficulty lies opportunity.",
                 
                 "If the facts don't fit the theory, change the facts.",
                 
                 "We all know that light travels faster than sound. That's why certain people appear bright until you hear them speak.",
                 
                 "Genius is 1% talent and 99% percent hard work...",
                 
                 "Once we accept our limits, we go beyond them.",
                 
                "If you want to live a happy life, tie it to a goal, not to people or things.",
                 
                "Do not worry about yout difficulties in Mathematics. I can assure you mine are still greater.",
                 
                 "You cannot simultaneously prevent and prepare for war.",
                 
                 "When the solution is simple, God is answering.",
                 
                "I speak to everyone in the same way, whether he is the garbage man or the president of the university."]; // Source: https://www.goodreads.com/author/quotes/9810.Albert_Einstein?page=4

function randomQuote(){
   count = Math.floor((Math.random() * wordArray.length));
   return wordArray[count];
}

// Check if the quote is more than 150 caracters long:
function maxLength(tweetText){
  
  var urlLength = 25;
  
  if(tweetText.length > (140 - urlLength)){
    var temp = "[...]";
    tweetText = tweetText.slice(0, 135 - urlLength);
    tweetText = tweetText.concat(temp);
  }
  return tweetText;
}


$(document).ready(function(){
  $("p").text("");
  $("p").append("<i class='fa fa-quote-left'></i>&nbsp;&nbsp;&nbsp;");
  $("p").append(randomQuote());
  $("p").append("&nbsp;&nbsp;&nbsp;<i class='fa fa-quote-right'></i>");
  
  $('.random').click(function(){
    $("p").text("");
    $("p").append("<i class='fa fa-quote-left'></i>&nbsp;&nbsp;&nbsp;");
    $("p").append(randomQuote());
    $("p").append("&nbsp;&nbsp;&nbsp;<i class='fa fa-quote-right'></i>");
  });
});

// ** TWITTER BUTTON **
$(document).ready(function(){
  $('.popup').click(function(event) {
    var text = "\"" + wordArray[count] + "\"";
    var tweetQuote = maxLength(text);
    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = 'http://twitter.com/share/?text=' + tweetQuote,
        opts   = 'status=1' +
                ',width='  + width  +
                ',height=' + height +
                ',top='    + top    +
                ',left='   + left;
  
    window.open(url, 'twitter', opts);
    return false;
  });
});