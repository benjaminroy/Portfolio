$('#btn').click(function(){
  eraseResults();
  $.getJSON("https://en.wikipedia.org/w/api.php?  action=query&format=json&list=search&srsearch=" + $('#searchText').val() +  "&callback=?",
   function (result) {
     for(var i = 0; i < 10; i++){
       var title = result.query.search[i].title;
       var snippet = result.query.search[i].snippet;
       createContainer(title, addEllipsis(snippet), i);
     }
   });
});

function createContainer(title, snippet, i){
  if(title === undefined || snippet === undefined){
    return;
  }

  var newContainer = document.createElement('div');
  newContainer.className = "container";
  newContainer.setAttribute("id", "block" + i);
  document.getElementById("results").appendChild(newContainer);
  
  $("#block" + i).click(function(){ 
    var win = window.open('https://en.wikipedia.org/wiki/' + replaceWhiteSpaces(title));
    if(win) win.focus();
  });
    
  var newLink = document.createElement('h2');
  newLink.innerHTML = title;
  newContainer.appendChild(newLink);
  
  var newParagraph = document.createElement('p');
  newParagraph.innerHTML += snippet;
  newContainer.appendChild(newParagraph); 
}

function eraseResults(){
  $("p").remove();
  $("h2").remove();
  $(".container").remove();
}

function replaceWhiteSpaces(input){
  input = input.replace(" ", "_");
  return input;
}

function addEllipsis(snippet){
  if(snippet.slice(-1) != '.')
    snippet = snippet.concat("...");
  return snippet;
}

$(".eraseButton").click(function(){
  eraseResults();
  $("#searchText").val('');
});