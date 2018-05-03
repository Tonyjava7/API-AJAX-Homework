$( document ).ready(function() {

var martialArts = ["Brazilian Jiu-Jitsu", "Tae Kwon Do", "Karate", "Hapkido", "Jiu Jitsu", "Muay Thai", "Aikido", "Wing Chun"];

//Initializing buttons and adding class, attributes, and text.
function displayGifButtons(){
    $("#gifButtons").empty(); 
    for (var i = 0; i < martialArts.length; i++){
        var gifButton = $("<button>").text(martialArts[i]).addClass("btn btn-primary, textBtn").attr("data-name", martialArts[i]);
       $("#gifButtons").append(gifButton);
    }
}

function addNewButton(){
    $("#addGif").on("click", function(){
    var textBtn = $("#ma-input").val().trim();
    if (textBtn == ""){
      return false;
    }
    martialArts.push(textBtn);
    displayGifButtons();
      return false;
    });
}

function removeLastButton(){
    $("removeGif").on("click", function(){
    martialArts.pop();
    displayGifButtons();
      return false;
    });
}
// Displaying the gifs
function displayGifs(){
    var textBtn = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + textBtn + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
           
            var gifImage = $("<img>").attr("src", results[i].images.fixed_height_small_still.url).attr("data-still",results[i].images.fixed_height_small_still.url).attr("data-animate",results[i].images.fixed_height_small.url).attr("data-state", "still").addClass("image");
            gifDiv.append(gifImage);

            $("#gifsView").prepend(gifDiv);
        }
    });
}

displayGifButtons(); 
addNewButton();
removeLastButton();

$(document).on("click", ".textBtn", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
